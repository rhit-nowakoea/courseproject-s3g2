package app;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.sql.*;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.Base64;
import java.util.Random;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.swing.JOptionPane;

public class UserService {
	private static final Random RANDOM = new SecureRandom();
	private static final Base64.Encoder enc = Base64.getEncoder();
	private static final Base64.Decoder dec = Base64.getDecoder();
	private DatabaseConnectionService dbService = null;

	public UserService(DatabaseConnectionService dbService) {
		this.dbService = dbService;
	}

	public boolean useApplicationLogins() {
		return true;
	}
	
	public boolean login(String username, String password) {
		//TODO: Complete this method.
		try {
			
			Statement stmt = null;
			String query = "SELECT * FROM [dbo].[Student];";
			stmt = dbService.getConnection().createStatement();
			ResultSet rs = stmt.executeQuery(query);
			String saltString = null;
			String hash = null;
			while(rs.next()) {
					if(rs.getString("Username").equals(username)) {
						saltString = rs.getString("PasswordSalt");
						hash = rs.getString("PasswordHash");
					}
			}
			if(saltString == null || hash == null) {
				return false;
			}
			String hashPassword = hashPassword(dec.decode(saltString), password);
			if(!hashPassword.equals(hash)) {
				return false;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}

	public boolean register(String username, String password) {
		//TODO: Task 6
		byte[] userSalt = getNewSalt();
		String userHash = hashPassword(userSalt, password);
		try {
			CallableStatement cs = dbService.getConnection().prepareCall("{? = call Register(?, ?, ?)}");
			cs.registerOutParameter(1, Types.INTEGER);
			cs.setString(2, username);
			cs.setString(3, getStringFromBytes(userSalt));
			cs.setString(4, userHash);
			cs.execute();
			int returnValue = cs.getInt(1);
			
			if(returnValue == 1 || returnValue == 2 || returnValue == 3 || returnValue == 4) {
				return false;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	
	public byte[] getNewSalt() {
		byte[] salt = new byte[16];
		RANDOM.nextBytes(salt);
		return salt;
	}
	
	public String getStringFromBytes(byte[] data) {
		return enc.encodeToString(data);
	}

	public String hashPassword(byte[] salt, String password) {

		KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
		SecretKeyFactory f;
		byte[] hash = null;
		try {
			f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			hash = f.generateSecret(spec).getEncoded();
		} catch (NoSuchAlgorithmException e) {
			JOptionPane.showMessageDialog(null, "An error occurred during password hashing. See stack trace.");
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			JOptionPane.showMessageDialog(null, "An error occurred during password hashing. See stack trace.");
			e.printStackTrace();
		}
		return getStringFromBytes(hash);
	}

}

