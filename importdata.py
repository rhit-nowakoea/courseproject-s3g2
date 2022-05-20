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
print()

#iterating through degrees
for i in data[1]:
    cursor.execute('''
                INSERT INTO Degree (ID, Name, CreditsRequired)
                VALUES (?,?,?)
                ''',
                i["ID"], i["Name"], int(float(i["Credits"])))
    cnxn.commit()
    print(i)
print()

#adding data to majors
for i in data[1]:
    if i["Credits"] > 100:
        cursor.execute('''
                INSERT INTO Majors (ID)
                Values(?) 
                ''',
                i["ID"])
        cnxn.commit()
        print(i)
print()

# adding data to minors
for i in data[1]:
    if i["Credits"] < 100:
        cursor.execute('''
                INSERT INTO Majors (ID)
                Values(?) 
                ''',
                i["ID"])
        cnxn.commit()
        print(i)
print()

# adding data to requires
for i in data[2]:
    if i["ClassPrefix"] == "FREE":
        cursor.execute('''
                INSERT INTO Requires (DegreeID, ClassID)
                SELECT TOP 1 ?, c.ID
                FROM Class c
                LEFT JOIN (SELECT DegreeID, ClassID FROM Requires r WHERE r.DegreeID = ?) x
                ON c.ID = x.ClassID
                WHERE x.DegreeID is NULL
                ''',
                i["MajorID"], i["MajorID"])
        cnxn.commit()
        print(i)
    elif i["ClassPrefix"] == "TECH":
        cursor.execute('''
                INSERT INTO Requires (DegreeID, ClassID)
                SELECT TOP 1 ?, c.ID
                FROM Class c
                LEFT JOIN (SELECT DegreeID, ClassID FROM Requires r WHERE r.DegreeID = ?) x
                ON c.ID = x.ClassID
                WHERE x.DegreeID is NULL AND c.Number>200
                ''',
                i["MajorID"], i["MajorID"])
        cnxn.commit()
        print(i)
    elif len(i) == 2:
        if i["ClassPrefix"] == "HSSA":
            cursor.execute('''
                INSERT INTO Requires (DegreeID, ClassID)
                SELECT TOP 1 ?, ID
                FROM Class c
                LEFT JOIN (SELECT DegreeID, ClassID FROM Requires r WHERE r.DegreeID = ?) x
                ON c.ID = x.ClassID
                WHERE x.DegreeID is NULL AND (c.Prefix = 'GERL' OR c.Prefix ='JAPNL' OR c.Prefix ='ANTHS' OR c.Prefix ='ARTSH' OR c.Prefix ='ECONS' OR c.Prefix ='ENGLH' OR c.Prefix ='GEOGS' OR c.Prefix ='HISTH' OR c.Prefix ='HUMH' OR c.Prefix ='MUSIH' OR c.Prefix ='PHILH' OR c.Prefix ='POLSS' OR c.Prefix ='RELGH')
                ''',
                i["MajorID"], i["MajorID"])
            cnxn.commit()
            print(i)
        else:
            cursor.execute('''
                    INSERT INTO Requires (DegreeID, ClassID)
                    SELECT TOP 1 ?, c.ID
                    FROM Class c
                    LEFT JOIN (SELECT DegreeID, ClassID FROM Requires r WHERE r.DegreeID = ?) x
                    ON c.ID = x.ClassID
                    WHERE x.DegreeID is NULL AND c.Prefix = ?
                    ''',
                    i["MajorID"], i["MajorID"], i["ClassPrefix"])
            cnxn.commit()
            print(i)
    else:
        cursor.execute('''
                    INSERT INTO Requires (DegreeID, ClassID)
                    SELECT ?, c.ID
                    FROM Class c
                    WHERE c.Prefix = ? AND c.Number = ?
                    ''',
                    i["MajorID"], i["ClassPrefix"], i["ClassNum"])
        cnxn.commit()
        print(i)
print()


# adding data to requires for minors
for i in data[3]:
    if len(i) == 2:
        cursor.execute('''
                    INSERT INTO Requires (DegreeID, ClassID)
                    SELECT TOP 1 ?, c.ID
                    FROM Class c
                    LEFT JOIN (SELECT DegreeID, ClassID FROM Requires r WHERE r.DegreeID = ?) x
                    ON c.ID = x.ClassID
                    WHERE x.DegreeID is NULL AND c.Prefix = ?
                    ''',
                    i["MinorID"]+22, i["MinorID"]+22, i["ClassPrefix"])
        cnxn.commit()
        print(i)
    else:
        cursor.execute('''
                    INSERT INTO Requires (DegreeID, ClassID)
                    SELECT ?, c.ID
                    FROM Class c
                    WHERE c.Prefix = ? AND c.Number = ?
                    ''',
                    i["MinorID"]+22, i["ClassPrefix"], i["ClassNum"])
        cnxn.commit()
        print(i)


# adding data to prerequisits
for i in data[4]:
    cursor.execute('''
                    INSERT INTO isPrerequisite (ClassID, PreReqID, PreReqMet)
                    SELECT c1.ID, c2.ID, NULL
                    FROM (SELECT * FROM Class c WHERE c.Prefix = ? AND c.Number = ?) c1
                    FULL JOIN (SELECT * FROM Class c WHERE c.Prefix = ? AND c.Number = ?) c2
                    ON c1.ID = c2.ID
                    WHERE c1.ID IS NOT NULL AND c2.ID IS NOT NULL
                    ''',
                    i["CourseAbbrv"], i["CourseNum"], i["PreReqAbbrv"], i["PreReqNum"])
    cnxn.commit()
    print(i)

for i in data[5]:
    cursor.execute('''
        INSERT INTO OfferedQuarters (Prefix, Number, ClassID, OfferedQuarter)
        SELECT ?,?,c.ID,?
        FROM Class as c
        WHERE c.Prefix = ? AND c.Number = ?
        ''',
        i["Abbrv"], int(float(i["Number"])), i["Offered"],i["Abbrv"],int(float(i["Number"])))
    cnxn.commit()
    print(i)

# Closing file
f.close()