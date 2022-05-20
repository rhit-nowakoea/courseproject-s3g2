CREATE TABLE Class(
ID int IDENTITY PRIMARY KEY, --IDENTITY sets up auto id increment upon insertion--
Credits int,
Prefix varchar(7),
Number int,
Name varchar(30),
OfferedQuarter char(1) CHECK (OfferedQuarter IN (‘F’, ‘W’, ‘S’)),
)