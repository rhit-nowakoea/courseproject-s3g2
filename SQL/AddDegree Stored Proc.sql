USE SchedulingAssistant
GO
CREATE PROCEDURE AddDegree(
@Username varchar(10),
@Name varchar(20))
AS
DECLARE @ErrorResponse varchar(100)
SET @ErrorResponse = 'Success'
IF EXISTS(SELECT DegreeID FROM HasDegree WHERE Username = @Username AND DegreeID = (SELECT ID FROM Degree WHERE Name = @Name))
BEGIN
	SET @ErrorResponse = 'Degree already exists for user'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
IF(@Username = NULL)
BEGIN
	SET @ErrorResponse = 'Username cannot be null'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
IF NOT EXISTS(SELECT ID FROM Name WHERE Name = @Name)
BEGIN
	SET @ErrorResponse = 'ClassID is NULL'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
INSERT INTO HasDegree(Username, DegreeID)
VALUES(@Username, (SELECT ID FROM Degree WHERE Name = @Name))
RETURN 0
USE SchedulingAssistant
GO
CREATE PROCEDURE getDegree(
@Username varchar(10))
AS
DECLARE @ErrorResponse varchar(100)
SET @ErrorResponse = 'Success'
IF NOT EXISTS(SELECT Username FROM Student WHERE Username = @Username)
BEGIN
	SET @ErrorResponse = 'Student does not exist'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
SELECT DegreeID, (SELECT Name FROM Degree WHERE ID = DegreeID) AS Name, (SELECT CreditsRequired FROM Degree WHERE ID = DegreeID) AS CreditsRequired FROM HasDegree WHERE Username = @Username
RETURN 0