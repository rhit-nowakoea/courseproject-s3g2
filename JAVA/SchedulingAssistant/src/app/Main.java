package app;

public class Main {
	
	private static DatabaseConnectionService dcs;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		dcs = new DatabaseConnectionService("titan.csse.rose-hulman.edu", "SchedulingAssistant");
		dcs.connect("clarken", "QW3rt13");
		LogInFrame f = new LogInFrame(dcs);
		f.setUpGUI();
		
	}

}
