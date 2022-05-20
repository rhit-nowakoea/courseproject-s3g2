CREATE TABLE HasDegree(
	Username varchar(10),
DegreeID int,
	PRIMARY KEY(Username, DegreeID),
	FOREIGN KEY(Username) REFERENCES Student(Username),
	FOREIGN KEY(DegreeID) REFERENCES Degree(ID)
)