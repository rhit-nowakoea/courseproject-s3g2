package app;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class LogInFrame extends JFrame{
//	private int width;
//	private int height;
	private JButton login;
	private JButton register;
	private JPanel panelt;
	private JPanel panelb;
	private JLabel username;
	private JLabel password;
	private JTextField userText;
	private JTextField passText;
	
	private UserService us;
	
	public boolean s;
	
	public LogInFrame(DatabaseConnectionService connection) {
		login = new JButton("Log In");
		register = new JButton("Register");
		panelt = new JPanel();
		panelb = new JPanel();
		username = new JLabel("Username: ");
		password = new JLabel("Password: ");
		userText = new JTextField(20);
		passText = new JTextField(20);
		us = new UserService(connection);
		s = false;
	}
	
	public void setUpGUI() {
		setSize(350, 200);
		setTitle("Log In or Register");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		login.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				String user = userText.getText();
				String password = passText.getText();
				boolean success = us.login(user, password);
				if(success) {
					JOptionPane.showMessageDialog(null, "LogIn Successful");
					s = success;
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
					s = success;
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
		add(panelt, BorderLayout.CENTER);
		add(panelb, BorderLayout.SOUTH);
		setVisible(true);
	}

}
