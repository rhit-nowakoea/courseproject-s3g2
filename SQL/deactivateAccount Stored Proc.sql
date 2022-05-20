USE SchedulingAssistant
Go
CREATE PROCEDURE deactivateAccount (
@Username varchar(10))
AS
DECLARE @ErrorResponse varchar(100)
SET @ErrorResponse = 'Success'
IF NOT EXISTS(SELECT Username FROM Student WHERE Username = @Username)
BEGIN
	SET @ErrorResponse = 'User does not exist'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
IF(@Username = NULL)
BEGIN
	SET @ErrorResponse = 'Username cannot be NULL'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
DELETE FROM Student WHERE Username = @Username
RETURN 0