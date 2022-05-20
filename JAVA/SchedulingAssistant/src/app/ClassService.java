package app;

import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Types;

import javax.swing.JOptionPane;

public class ClassService {
	
private DatabaseConnectionService dbService = null;
	
	public ClassService(DatabaseConnectionService dbService) {
		this.dbService = dbService;
	}

	public boolean addClass(String currentUser, String prefix, String number) {
		try {
			System.out.println(currentUser);
			System.out.println(prefix);
			System.out.println(number);
			CallableStatement cs = dbService.getConnection().prepareCall("{? = call AddClass(?, ?, ?)}");
			cs.registerOutParameter(1, Types.INTEGER);
			cs.setString(2, currentUser);
			cs.setString(3, prefix);
			cs.setInt(4, Integer.parseInt(number));
			cs.execute();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	
	public boolean deleteClass(String currentUser, String prefix, String number) {
		try {
			CallableStatement cs = dbService.getConnection().prepareCall("{?= call DeleteClass(?, ?, ?)}");
			cs.registerOutParameter(1, Types.INTEGER);
			cs.setString(2, currentUser);
			cs.setString(3, prefix);
			cs.setInt(4, Integer.parseInt(number));
			cs.execute();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	
	public ArrayList<ArrayList<Object>> getClasses(String currentUser) {
		ArrayList<ArrayList<Object>> classes = new ArrayList<>();
		try{
			System.out.println("Inside Username: "+currentUser);
			CallableStatement cs = dbService.getConnection().prepareCall("{? = call getClasses(?)}");
			cs.registerOutParameter(1, Types.INTEGER);
			cs.setString(2, currentUser);
			cs.execute();
			ResultSet rs = cs.getResultSet();
			System.out.println("Inside Data: "+rs.toString());
			if(rs == null) {
				return classes;
			}
			while(rs.next()) {
				ArrayList<Object> subclass = new ArrayList<>();
				subclass.add(rs.getString("Prefix"));
				subclass.add(rs.getInt("Number"));
				subclass.add(rs.getString("Name"));
				subclass.add(rs.getInt("Credits"));
				classes.add(subclass);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return classes;
	}

}
