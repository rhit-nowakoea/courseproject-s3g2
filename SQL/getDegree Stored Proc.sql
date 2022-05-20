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