CREATE TABLE Requires(
	ClassID int,
DegreeID int,
	PRIMARY KEY(ClassID, DegreeID),
	FOREIGN KEY(ClassID) REFERENCES Class(ID),
	FOREIGN KEY(DegreeID) REFERENCES Degree(ID)
)