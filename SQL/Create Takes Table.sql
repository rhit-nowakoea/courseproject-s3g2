CREATE TABLE Takes(
	Username varchar(10),
	ClassID int,
	isCompleted int,
	PRIMARY KEY(Username, ClassID),
	FOREIGN KEY(Username) REFERENCES Student(Username),
	FOREIGN KEY(ClassID) REFERENCES Class(ID)
)