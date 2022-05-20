USE SchedulingAssistant
GO
CREATE PROCEDURE getClassId(
	@ClassPrefix varchar(8),
	@ClassNumber int)
AS
SELECT c.ID
FROM Class c
WHERE c.Prefix =@ClassPrefix AND c.Number = @ClassNumber;