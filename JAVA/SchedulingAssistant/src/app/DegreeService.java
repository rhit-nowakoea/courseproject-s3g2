package app;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

public class DegreeService {
	
private DatabaseConnectionService dbService = null;
	
	public DegreeService(DatabaseConnectionService dbService) {
		this.dbService = dbService;
	}

	public boolean addDegree(String currentUser, String prefix, String number) {
		try {
			CallableStatement cs = dbService.getConnection().prepareCall("{? = call AddDegree(?, ?, ?)}");
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
	
	public boolean deleteDegree(String currentUser, String prefix, String number) {
		try {
			CallableStatement cs = dbService.getConnection().prepareCall("{?= call DeleteDegree(?, ?, ?)}");
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
	
	public Object[][] getDegrees(String currentUser) {
		ArrayList<ArrayList<Object>> classes = new ArrayList<>();
		try{
			CallableStatement cs = dbService.getConnection().prepareCall("{? = call getDegree(?)}");
			cs.registerOutParameter(1, Types.INTEGER);
			cs.setString(2, currentUser);
			cs.execute();
			ResultSet rs = cs.getResultSet();
			if(rs == null) {
				return classes.stream().map(u -> u.toArray(new String[0])).toArray(String[][]::new);
			}
			while(rs.next()) {
				ArrayList<Object> subclass = new ArrayList<>();
//				subclass.add(rs.getInt("ClassID"));
				subclass.add(rs.getString("Name"));
				subclass.add(rs.getInt("CreditsRequired"));
				classes.add(subclass);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return classes.stream().map(u -> u.toArray(new String[0])).toArray(String[][]::new);
	}


}
