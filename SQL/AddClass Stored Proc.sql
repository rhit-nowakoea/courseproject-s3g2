USE SchedulingAssistant
GO
CREATE PROCEDURE AddClass(
@Username varchar(10),
@Prefix varchar(8),
@Number int)
AS
DECLARE @ErrorResponse varchar(100)
SET @ErrorResponse = 'Success'
IF EXISTS(SELECT ClassID FROM Takes WHERE Username = @Username AND ClassID = (SELECT ID FROM Class WHERE Prefix = @Prefix AND Number = @Number))
BEGIN
	SET @ErrorResponse = 'Class already completed for user'
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
INSERT INTO Takes(Username, ClassID, isCompleted)
VALUES(@Username, (SELECT ID FROM Class WHERE Prefix = @Prefix AND Number = @Number), 0)
RETURN 0