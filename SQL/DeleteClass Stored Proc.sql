USE SchedulingAssistant
GO
CREATE PROCEDURE DeleteClass(
@Username varchar(10),
@Prefix varchar(8),
@Number int)
AS
DECLARE @ErrorResponse varchar(100)
SET @ErrorResponse = 'Success'
IF NOT EXISTS(SELECT ClassID FROM Takes WHERE Username = @Username AND ClassID = (SELECT ID FROM Class WHERE Prefix = @Prefix AND Number = @Number))
BEGIN
	SET @ErrorResponse = 'Class does not exist for user'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
IF(@Username = NULL)
BEGIN
	SET @ErrorResponse = 'Username cannot be null'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
IF NOT EXISTS(SELECT ID FROM Class WHERE Prefix = @Prefix AND Number = @Number)
BEGIN
	SET @ErrorResponse = 'ClassID is NULL'
	RAISERROR(@ErrorResponse,1,1)
	RETURN -1
END
DELETE FROM Takes WHERE Username = @Username AND ClassID = (SELECT ID FROM Class WHERE Prefix = @Prefix AND Number = @Number)
RETURN 0