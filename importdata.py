import json
import pyodbc
import math 
# Some other example server values are
# server = 'localhost\sqlexpress' # for a named instance
# server = 'myserver,port' # to specify an alternate port
server = 'titan.csse.rose-hulman.edu' 
database = 'SchedulingAssistant' 
username = 'clarken' 
password = 'QW3rt13' 
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()

  
# Opening JSON file
f = open('class.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the courses
for i in data(0):
    cursor.execute('''
                INSERT INTO Class (Credits, Prefix, Number, Name, OfferedQuarter)
                VALUES (?,?,?,?,?)
                ''',
                int(float(i["Credits"])), i["Abbrv"], i["Number"], i["Name"], i["Offered"])
    cnxn.commit()
    print(i)
  
# Closing file
f.close()