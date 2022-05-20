package app;

import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;

import javax.swing.*;
import javax.swing.event.TableModelEvent;
import javax.swing.event.TableModelListener;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableModel;

public class AppFrame extends JFrame {

	JLabel screen;
	JPanel classes;
	JLabel prefix;
	JComboBox<String> prefixes;
	JLabel num;
	JTextField numbers;
	JButton add;
	JButton dele;
	JPanel panel1;
	JPanel panel2;
	JTable classtab;

	JMenuBar menuBar;
	JMenu c;
	JMenu d;

	JPanel degrees;
	JLabel dname;
	JComboBox<String> degnames;
	JButton dadd;
	JButton ddele;
	JTable degtab;

	ClassService cs;
	DegreeService ds;
	
	JScrollPane scrollPane;
	
	TableModel classtm;

	Object[][] rowData = {{"None", "None", "None", "None"}};
	Object[] columnNames = { "Prefix", "Number", "Name", "Credits" };
	String[] optionsToChoose = { "CSSE", "BIO", "ME" };
	Object[][] drowData = {{"None", "None"}};
	Object[] dcolumnNames = { "Name", "Credits" };
	String[] doptionsToChoose = { "Computer Science", "Biology", "Electrical Engineering" };

	public AppFrame(DatabaseConnectionService connection) {

		cs = new ClassService(connection);
//		rowData = cs.getClasses(currentusername);
		ds = new DegreeService(connection);
//		drowData = ds.getDegrees();

//		screen = new JLabel();
		classes = new JPanel();
		prefix = new JLabel("Prefix");
		prefixes = new JComboBox<>(optionsToChoose);
		num = new JLabel("Number");
		numbers = new JTextField(6);
		add = new JButton("Add Class");
		dele = new JButton("Delete Class");
		panel1 = new JPanel();
		classtm = new DefaultTableModel(columnNames, 0);
		classtab = new JTable(classtm);

		menuBar = new JMenuBar();
		c = new JMenu("Classes");
		d = new JMenu("Degrees");

		degrees = new JPanel();
		dname = new JLabel("Name");
		degnames = new JComboBox<>(doptionsToChoose);
		dadd = new JButton("Add Degree");
		ddele = new JButton("Delete Degree");
		panel2 = new JPanel();
		degtab = new JTable(drowData, dcolumnNames);
		scrollPane = new JScrollPane(classtab);
	}

	public void setUpGUI(String currentUsername) {
		
		showdata(cs.getClasses(currentUsername));
		
		Toolkit toolkit = getToolkit();
		Dimension size = toolkit.getScreenSize();
		setSize(930, 530);
		setLocation(size.width / 2 - getWidth() / 2, size.height / 2 - getHeight() / 2);
		setTitle("Scheduling Assistant");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		panel1.add(prefix);
		panel1.add(prefixes);
		panel1.add(num);
		panel1.add(numbers);
		panel1.add(dele);
		panel1.add(add);
		add.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				String pre = (String) prefixes.getSelectedItem();
				String n = numbers.getText();
//				System.out.println(cs.getClasses(currentUsername).toString());
				boolean success = cs.addClass(currentUsername, pre, n);
				DefaultTableModel model = (DefaultTableModel) classtab.getModel();
				model.setRowCount(0);
				ArrayList<ArrayList<Object>> rD = cs.getClasses(currentUsername);
				showdata(rD);
//				rowData = cs.getClasses(currentUsername);
//				classtab = new JTable(rowData, columnNames);
//				scrollPane = new JScrollPane(classtab);
//				classtab.setFillsViewportHeight(true);
			}

		});
		dele.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				String pre = (String) prefixes.getSelectedItem();
				String n = numbers.getText();
				boolean success = cs.deleteClass(currentUsername, pre, n);
				DefaultTableModel model = (DefaultTableModel) classtab.getModel();
				model.setRowCount(0);
				ArrayList<ArrayList<Object>> rD = cs.getClasses(currentUsername);
				showdata(rD);
//				rowData = cs.getClasses(currentUsername);
//				classtab = new JTable(rowData, columnNames);
//				scrollPane = new JScrollPane(classtab);
//				classtab.setFillsViewportHeight(true);
			}

		});
//		classtab.getModel().addTableModelListener(new TableModelListener() {
//
//			@Override
//			public void tableChanged(TableModelEvent e) {
//				int row = e.getFirstRow();
//		        int column = e.getColumn();
//		        TableModel model = (TableModel)e.getSource();
//		        String columnName = model.getColumnName(column);
//		        Object data = model.getValueAt(row, column);
//			}
//			
//		});
//		add(screen, BorderLayout.NORTH);
		classes.add(panel1, BorderLayout.NORTH);
		classtab.setFillsViewportHeight(true);
//		panel2.setLayout(new BorderLayout());
//		panel2.add(classtab.getTableHeader(), BorderLayout.PAGE_START);
//		panel2.add(classtab);
//		add(panel2);
//		classes.add(panel2, BorderLayout.SOUTH);
		add(classes, BorderLayout.NORTH);
		add(scrollPane);
//		menuBar.add(c);
//		menuBar.add(d);
//		setJMenuBar(menuBar);
		setVisible(true);
	}
	
	public void showdata(ArrayList<ArrayList<Object>> inp) {
		System.out.println(inp.toString());
		DefaultTableModel model = (DefaultTableModel) classtab.getModel();
		Object[] row = new Object[4];
		for(int i = 0; i<inp.size(); i++) {
			row[0]=inp.get(i).get(0);
			row[1]=inp.get(i).get(1);
			row[2]=inp.get(i).get(2);
			row[3]=inp.get(i).get(3);
			model.addRow(row);
		}
	}

}
