USE SchedulingAssistant
GO
CREATE PROCEDURE getClasses(
@Username varchar(10))
AS
DECLARE @ErrorResponse varchar(100)
SET @ErrorResponse = 'Success'
IF NOT EXISTS(SELECT Username FROM Student WHERE Username = @Username)
BEGIN
	SET @ErrorResponse = 'Student does not exist'
	RAISERROR(@ErrorResponse,1,1)
END
SELECT ClassID, c.Prefix, c.Number, c.[Name], c.Credits  
FROM Takes t
JOIN Class c ON t.ClassID = c.ID
WHERE Username = @Username
RETURN;