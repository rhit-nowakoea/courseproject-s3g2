CREATE TABLE isCorequisite(
	ClassID int,
CoReqID int,
CoReqMet int,
	PRIMARY KEY(ClassID, CoReqID),
	FOREIGN KEY(ClassID) REFERENCES Class(ID),
FOREIGN KEY(CoReqID) REFERENCES Class(ID)
)