CREATE TABLE Student(
Username varchar(10) PRIMARY KEY,
Name varchar(30),
StartYear int,
ExpectedEnd int,
PasswordSalt varchar(50),
PasswordHash varchar(50),
)