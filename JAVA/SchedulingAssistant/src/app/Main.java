package app;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Main {
	
	private static DatabaseConnectionService dcs;

	private static UserService us;
	private static String currentusername;
	
	public static void main(String[] args) {
		dcs = new DatabaseConnectionService("titan.csse.rose-hulman.edu", "SchedulingAssistant");
		dcs.connect("clarken", "QW3rt13");
//		new Main();
		
		JFrame f = new JFrame();
		
		JButton login = new JButton("Log In");
		JButton register = new JButton("Register");
		JPanel panelt = new JPanel();
		JPanel panelb = new JPanel();
		JLabel username = new JLabel("Username: ");
		JLabel password = new JLabel("Password: ");
		JTextField userText = new JTextField(20);
		JTextField passText = new JTextField(20);
		UserService us = new UserService(dcs);
		
		f.setSize(350, 200);
		f.setTitle("Log In or Register");
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		login.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				String user = userText.getText();
				String password = passText.getText();
				boolean success = us.login(user, password);
				if(success) {
					JOptionPane.showMessageDialog(null, "LogIn Successful");
					currentusername = user;
					new Main();
					f.dispose();
				} else {
					JOptionPane.showMessageDialog(null, "LogIn not Possible");
				}
			}
			
		});
		panelb.add(login, BorderLayout.WEST);
		register.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				String user = userText.getText();
				String password = passText.getText();
				boolean success = us.register(user, password);
				if(success) {
					JOptionPane.showMessageDialog(null, "Register Successful");
					currentusername = user;
					new Main();
					f.dispose();
				} else {
					JOptionPane.showMessageDialog(null, "Register not Possible");
				}
			}
			
		});
		panelb.add(register, BorderLayout.EAST);
		panelt.add(username);
		panelt.add(userText);
		panelt.add(password);
		panelt.add(passText);
		f.add(panelt, BorderLayout.CENTER);
		f.add(panelb, BorderLayout.SOUTH);
		f.setVisible(true);
	}
	
	public Main() {
		AppFrame a = new AppFrame(dcs);
		a.setUpGUI(currentusername);
	}
	

}
