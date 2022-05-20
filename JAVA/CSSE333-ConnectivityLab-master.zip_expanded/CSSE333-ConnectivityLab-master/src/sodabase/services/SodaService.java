package sodabase.services;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;

import javax.swing.JOptionPane;

public class SodaService {

	private DatabaseConnectionService dbService = null;
	
	public SodaService(DatabaseConnectionService dbService) {
		this.dbService = dbService;
	}

	public boolean addSoda(String sodaName, String manf) {
		try {
			CallableStatement cs = dbService.getConnection().prepareCall("{? = call AddSoda(?, ?)}");
			cs.registerOutParameter(1, Types.INTEGER);
			cs.setString(2, sodaName);
			cs.setString(3, manf);
			cs.execute();
			int returnValue = cs.getInt(1);
			
			if(returnValue == 1) {
				JOptionPane.showMessageDialog(null, "ERROR: Soda name cannot be null or empty");
			}
			if(returnValue == 2) {
				JOptionPane.showMessageDialog(null, "ERROR: Soda name already exists.");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	public ArrayList<String> getSodas() {
		//Done: Task 2
		ArrayList<String> rests = new ArrayList<String>();
		Connection conn = dbService.getConnection();
		String query = "select name from Soda";
		try(Statement stmt = conn.createStatement()){
			ResultSet rs = stmt.executeQuery(query);
			while(rs.next()) {
				rests.add(rs.getString("name"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return rests;
	}
}
