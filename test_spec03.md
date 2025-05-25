Write Tests with Vitest and React Testing Library

2. Date Input
	1. Edit Mode
		1. Year Edit
			1. Numeric Input Shifts Digits
				1. Test that inputting a number in year edit mode shifts digits left and appends the new digit.
					- Render the DateInput component with value "2023/05/15" and cursor at year segment.
					- Simulate typing '4'.
					- Assert that the year segment is now "0234".
					- Simulate typing '9'.
					- Assert that the year segment is now "2349".
			3. Backspace Resets Year
				1. Test that pressing backspace in year edit mode resets the year to "0000".
					- Render the DateInput component with value "2023/05/15" and cursor at year segment.
					- Simulate pressing backspace.
					- Assert that the year segment is now "0000".
			4. Cursor Movement
				1. Test that pressing the right arrow key in year edit mode moves the cursor to the month segment.
					- Render the DateInput component with value "2023/05/15" and cursor at year segment.
					- Simulate pressing the right arrow key.
					- Assert that the cursor is now at the month segment.
		2. Month Edit
			1. Numeric Input Behavior
				1. Test that inputting '0' when month is "01" changes it to "10"; otherwise, input is ignored.
					- Render the DateInput component with value "2023/01/15" and cursor at month segment.
					- Simulate typing '0'.
					- Assert that the month segment is now "10".
					- Render the DateInput component with value "2023/02/15" and cursor at month segment.
					- Simulate typing '0'.
					- Assert that the month segment remains "02".
				2. Test that inputting '1' changes month to "01" unless it is already "01" or "11", in which case it becomes "11".
					- Render the DateInput component with value "2023/02/15" and cursor at month segment.
					- Simulate typing '1'.
					- Assert that the month segment is now "01".
					- Render the DateInput component with value "2023/01/15" and cursor at month segment.
					- Simulate typing '1'.
					- Assert that the month segment is now "11".
				3. Test that inputting '2' changes month to "02" unless it is already "01" or "11", in which case it becomes "12".
					- Render the DateInput component with value "2023/03/15" and cursor at month segment.
					- Simulate typing '2'.
					- Assert that the month segment is now "02".
					- Render the DateInput component with value "2023/01/15" and cursor at month segment.
					- Simulate typing '2'.
					- Assert that the month segment is now "12".
				4. Test that inputting '3' to '9' sets the month to the zero-padded value.
					- Render the DateInput component with value "2023/05/15" and cursor at month segment.
					- Simulate typing '7'.
					- Assert that the month segment is now "07".
					- Simulate typing '9'.
					- Assert that the month segment is now "09".
			2. Backspace Resets Month
				1. Test that pressing backspace in month edit mode resets the month to "00".
					- Render the DateInput component with value "2023/05/15" and cursor at month segment.
					- Simulate pressing backspace.
					- Assert that the month segment is now "00".
			3. Cursor Movement
				1. Test that pressing the left arrow key in month edit mode moves the cursor to the year segment.
					- Render the DateInput component with value "2023/05/15" and cursor at month segment.
					- Simulate pressing the left arrow key.
					- Assert that the cursor is now at the year segment.
				2. Test that pressing the right arrow key in month edit mode moves the cursor to the day segment.
					- Render the DateInput component with value "2023/05/15" and cursor at month segment.
					- Simulate pressing the right arrow key.
					- Assert that the cursor is now at the day segment.
		3. Date Edit
			1. Numeric Input Behavior
				1. Test that inputting a number combines with the first digit of the current day and updates the day if valid, or ignores if it exceeds the month's max day.
					- Render the DateInput component with value "2023/05/12" and cursor at day segment.
					- Simulate typing '3'.
					- Assert that the day segment is now "23" (since 1 + 3 = 13, but 12 + 3 = 23 is valid for May).
					- Render the DateInput component with value "2023/02/28" and cursor at day segment.
					- Simulate typing '9'.
					- Assert that the day segment remains "28" (since 29 is invalid for February in a non-leap year).
					- Render the DateInput component with value "2023/01/01" and cursor at day segment.
					- Simulate typing '0'.
					- Assert that the day segment is now "01".
					- Render the DateInput component with value "2023/01/10" and cursor at day segment.
					- Simulate typing '3'.
					- Assert that the day segment is now "03".
					- Render the DateInput component with value "2023/01/31" and cursor at day segment.
					- Simulate typing '9'.
					- Assert that the day segment is now "09".
			2. Backspace Resets Day
				1. Test that pressing backspace in date edit mode resets the day to "00".
					- Render the DateInput component with value "2023/05/15" and cursor at day segment.
					- Simulate pressing backspace.
					- Assert that the day segment is now "00".
			3. Cursor Movement
				1. Test that pressing the left arrow key in date edit mode moves the cursor to the month segment.
					- Render the DateInput component with value "2023/05/15" and cursor at day segment.
					- Simulate pressing the left arrow key.
					- Assert that the cursor is now at the month segment.
				2. Test that pressing the right arrow key in date edit mode moves the cursor to the year segment (if applicable).
					- Render the DateInput component with value "2023/05/15" and cursor at day segment.
					- Simulate pressing the right arrow key.
					- Assert that the cursor is now at the year segment or cycles as per component behavior.