USE SchedulingAssistant
GO
CREATE PROCEDURE DeleteDegree(
@Username varchar(10),
@Name varchar(20))
AS
DECLARE @ErrorResponse varchar(100)
SET @ErrorResponse = 'Success'
IF NOT EXISTS(SELECT DegreeID FROM HasDegree WHERE Username = @Username AND DegreeID = (SELECT ID FROM Degree WHERE Name = @Name))
BEGIN
	SET @ErrorResponse = 'Degree does not exist for user'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
IF(@Username = NULL)
BEGIN
	SET @ErrorResponse = 'Username cannot be null'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
IF NOT EXISTS(SELECT ID FROM Degree WHERE Name = @Name)
BEGIN
	SET @ErrorResponse = 'DegreeID is NULL'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
DELETE FROM HasDegree WHERE Username = @Username AND DegreeID = (SELECT ID FROM Degree WHERE Name = @Name)
RETURN 0