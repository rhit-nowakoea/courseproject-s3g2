USE SchedulingAssistant
Go
CREATE PROCEDURE UpdateStudentData (
@Username varchar(10),
@Name varchar(30),
@StartYear int,
@ExpectedEnd int)
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
IF(@Name = NULL)
BEGIN
	IF(@ExpectedEnd = NULL)
	BEGIN
		IF(@ExpectedEnd = NULL)
		BEGIN
			SET @ErrorResponse = 'All fields cannot be NULL'
			RAISERROR(@ErrorResponse,1,1)
			RETURN -2
		END
		ELSE
		BEGIN
			UPDATE Student
			SET ExpectedEnd=@ExpectedEnd
			WHERE [Username] = @Username
		END
	END
	ELSE
	BEGIN
	IF(@ExpectedEnd = NULL)
		BEGIN
			UPDATE Student
			SET ExpectedEnd=@ExpectedEnd
			WHERE [Username] = @Username
		END
		ELSE
		BEGIN
			UPDATE Student
			SET ExpectedEnd=@ExpectedEnd
			WHERE [Username] = @Username
		END
	END
END
ELSE
BEGIN
	IF(@ExpectedEnd = NULL)
	BEGIN
			UPDATE Student
			SET [Name]=@Name, ExpectedEnd=@ExpectedEnd
			WHERE [Username] = @Username
	END
	ELSE
	BEGIN
	IF(@ExpectedEnd = NULL)
		BEGIN
			UPDATE Student
			SET [Name]=@Name, ExpectedEnd=@ExpectedEnd
			WHERE [Username] = @Username
		END
		ELSE
		BEGIN
			UPDATE Student
			SET [Name]=@Name, ExpectedEnd=@ExpectedEnd
			WHERE [Username] = @Username
		END
	END
END
RETURN 0