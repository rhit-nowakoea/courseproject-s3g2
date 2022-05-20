package sodabase.services;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;

import javax.swing.JOptionPane;

public class RestaurantService {

	private DatabaseConnectionService dbService = null;
	
	public RestaurantService(DatabaseConnectionService dbService) {
		this.dbService = dbService;
	}
	
	public boolean addResturant(String restName, String addr, String contact) {
		//Done: Task 5
		try {
			CallableStatement cs = dbService.getConnection().prepareCall("{? = call AddRestaurant(?, ?, ?)}");
			cs.registerOutParameter(1, Types.INTEGER);
			cs.setString(2, restName);
			cs.setString(3, addr);
			cs.setString(4, contact);
			cs.execute();
			int returnValue = cs.getInt(1);
			
			if(returnValue == 1) {
				JOptionPane.showMessageDialog(null, "ERROR: Restaurant name cannot be null or empty");
			}
			if(returnValue == 2) {
				JOptionPane.showMessageDialog(null, "ERROR: Restaurant name already exists.");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	

	public ArrayList<String> getRestaurants() {	
		//Done: Task 2 
		ArrayList<String> rests = new ArrayList<String>();
		Connection conn = dbService.getConnection();
		String query = "select name from Rest";
		try(Statement stmt = conn.createStatement()){
			ResultSet rs = stmt.executeQuery(query);
			while(rs.next()) {
				rests.add(rs.getString("name"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return rests;
	}
}
