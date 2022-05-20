CREATE TABLE OfferedQuarters(
	Prefix varchar(8),
	Number int,
	ClassID int,
	OfferedQuarter char(1),
	FOREIGN KEY(ClassID) REFERENCES Class(ID)
)