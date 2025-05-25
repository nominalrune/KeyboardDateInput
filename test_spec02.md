Write Tests with Vitest and React Testing Library

2. date input
	1. Initial Input Mode
		1. Year Input
			1. Test that only numeric input is accepted for the year segment.
				- Render the DateInput component.
				- Simulate typing non-numeric characters in the year segment (e.g., "2a0b2c").
				- Assert that only numeric characters are present in the year segment.
			2. Test that after entering 5 digits for the year, input automatically transitions to month input.
				- Render the DateInput component.
				- Simulate typing 5 digits for the year (e.g., "20231").
				- Assert that the cursor is now at the month segment and a slash is present.("2023/01")
			3. Test backspace behavior in the year segment.
				- Render the DateInput component.
				- Simulate typing 4 digits for the year (e.g., "2023").
				- Simulate pressing backspace.
				- Assert that the last digit is deleted and the cursor remains in the year segment if month input hasn't started.
				- Repeat until all digits are deleted, assert that the year segment is empty.
			5. Test that arrow keys do not move the cursor from the year segment if month input has not started.
				- Render the DateInput component.
				- Simulate typing 4 digits for the year (e.g., "2023").
				- Simulate pressing left or right arrow keys.
				- Assert that the cursor remains in the year segment if month input has not started.
		2. Month Input
			1. Test that inputting 0 as the first digit is ignored.
				- Render the DateInput component and enter a valid year.
				- Simulate typing 0 as the first month digit.
				- Assert that the month segment remains empty.
			2. Test that inputting 3-9 as the first digit zero-pads and moves to day input.
				- Render the DateInput component and enter a valid year("2000").
				- Simulate typing 3 as the first month digit.
				- Assert that the month segment is '03', a slash is not inserted. If you additionally input "1", then you'll get "2000/03/01".
			3. Test that inputting 1 as the first digit zero-pads and waits for the second digit.
				- Render the DateInput component and enter a valid year.
				- Simulate typing 1 as the first month digit.
				- Assert that the month segment is '01' and input remains in month segment.
			4. Test that inputting 3-9 as the second digit after 1 starts day input and inserts slash.
				- Render the DateInput component and enter a valid year, then 1 as first month digit.
				- Simulate typing 3 as the second month digit.
				- Assert that the month segment is '01', a slash is inserted, and input moves to day segment with '3' as first day digit.
			5. Test that inputting 0, 1, or 2 as the second digit after 1 finalizes month and moves to day input.
				- Render the DateInput component and enter a valid year, then 1 as first month digit.
				- Simulate typing 0 as the second month digit.
				- Assert that the month segment is '10' and input moves to day segment.
			6. Test backspace deletes one digit at a time in month input.
				- Render the DateInput component and enter a valid year and two month digits.
				- Simulate pressing backspace.
				- Assert that the second digit is deleted, leaving only the first digit.
				- Simulate pressing backspace again.
				- Assert that the month segment is empty and input returns to year segment.
			7. Test that left arrow moves cursor to year input.
				- Render the DateInput component and enter a valid year and month.
				- Simulate pressing left arrow key in month segment.
				- Assert that the cursor moves to year segment.
			8. Test that right arrow moves cursor to day input if day has been entered.
				- Render the DateInput component and enter a valid year, month, and day.
				- Simulate pressing right arrow key in month segment.
				- Assert that the cursor moves to day segment.
		3. Date Input
			1. Test that inputting 0 as the first digit is ignored.
				- Render the DateInput component and enter a valid year and month.
				- Simulate typing 0 as the first day digit.
				- Assert that the day segment remains empty.
			2. Test that inputting 1-9 as the first digit zero-pads and inserts slash if needed.
				- Render the DateInput component and enter a valid year and month.
				- Simulate typing 1 as the first day digit.
				- Assert that the day segment is '01'.
			3. Test that inputting a valid second digit combines as day value and transitions to edit mode.
				- Render the DateInput component and enter a valid year, month, and first day digit.
				- Simulate typing a valid second digit (e.g., '2' after '1' for '12').
				- Assert that the day segment is '12' and input transitions to edit mode.
			4. Test that inputting a second digit that exceeds the max days of the month is ignored.
				- Render the DateInput component and enter a valid year, month, and first day digit.
				- Simulate typing a second digit that would make the day invalid (e.g., '4' after '3' in February).
				- Assert that the day segment does not update to an invalid value.
			5. Test backspace resets the day value to '00'.
				- Render the DateInput component and enter a valid year, month, and day.
				- Simulate pressing backspace in the day segment.
				- Assert that the day segment is reset to '00'.
			6. Test that left arrow moves the cursor to month input.
				- Render the DateInput component and enter a valid year, month, and day.
				- Simulate pressing left arrow key in the day segment.
				- Assert that the cursor moves to the month segment.