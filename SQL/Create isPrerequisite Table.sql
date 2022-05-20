CREATE TABLE isPrerequisite(
	ClassID int,
PreReqID int,
PreReqMet int,
	PRIMARY KEY(ClassID, PreReqID),
	FOREIGN KEY(ClassID) REFERENCES Class(ID),
	FOREIGN KEY(PreReqID) REFERENCES Class(ID)
)