import React from "react";
import render from "./render";
import { describe, it, expect, vi } from 'vitest';
import { DateInput, MonthInput, withDateInputFeature, withMonthInputFeature } from '../src';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

const CARET = {
	YEAR: 4,
	MONTH: 7,
	DATE: 10,
};

describe('DateInput_initial_input: Year Input', async () => {
	it('accepts only numeric input for the year segment', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2a0b2c');
		expect(input.value).toBe('202');
	});

	it('transitions to month input after entering 5 digits for the year', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '20231');
		expect(input.value).toBe('2023/01');
	});

	it('backspace deletes one digit at a time in the year segment', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;;
		await user.type(input, '2023');
		await user.type(input, '{Backspace}');
		expect(input.value).toBe('202');
		await user.type(input, '{Backspace}');
		expect(input.value).toBe('20');
		await user.type(input, '{Backspace}');
		expect(input.value).toBe('2');
		await user.type(input, '{Backspace}');
		expect(input.value).toBe('');
	});

	it('arrow keys do not move the cursor from the year segment if month input has not started', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;;
		await user.type(input, '2023');
		const selectionStartBefore = input.selectionStart;
		await user.type(input, '{ArrowLeft}');
		const selectionStartAfterLeft = input.selectionStart;
		await user.type(input, '{ArrowRight}');
		const selectionStartAfterRight = input.selectionStart;
		expect(selectionStartBefore).toBe(selectionStartAfterLeft);
		expect(selectionStartBefore).toBe(selectionStartAfterRight);
	});
});

describe('DateInput_initial_input: Month Input', async () => {
	it('ignores 0 as the first month digit', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023');
		await user.type(input, '0');
		expect(input.value).toBe('2023');
	});

	it('zero-pads and moves to day input when 3-9 is entered as first month digit', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2000');
		await user.type(input, '3');
		expect(input.value).toBe('2000/03');
	});

	it('zero-pads and waits for second digit when 1 is entered as first month digit', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022');
		await user.type(input, '1');
		// user.input(input, { target: { value: '2022/1' } });
		expect(input.value).toBe('2022/01');
	});

	it('inserts slash and moves to day input when 3-9 is entered as second digit after 1', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022');
		await user.type(input, '1');
		await user.type(input, '3');
		expect(input.value).toBe('2022/01/03');
	});

	it('finalizes month and moves to day input when 0, 1, or 2 is entered as second digit after 1', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022');
		await user.type(input, '1');
		expect(input.value).toBe('2022/01');
		await user.type(input, '0');
		expect(input.value).toBe('2022/10');
	});

	it('backspace deletes one digit at a time in month input', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '12');
		await user.type(input, '{Backspace}');
		expect(input.value).toBe('2022/01');
		await user.type(input, '{Backspace}');
		expect(input.value).toBe('2022');
	});

	it('left arrow moves cursor to year input', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '12');
		// cursor is at end of month (i.e. 7th)
		expect(input.selectionStart).toBe(CARET.MONTH);
		await user.type(input, '{ArrowLeft}');
		expect(input.selectionStart).toBe(CARET.YEAR);
	});

	it('right arrow moves cursor to day input if day has been entered', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '12' + '01');
		// cursor at end of date (i.e. 10th)
		expect(input.selectionStart).toBe(CARET.DATE);
		input.setSelectionRange(CARET.MONTH, CARET.MONTH); // cursor at end of month
		// expect(input.selectionStart).toBe(CARET.MONTH);

		expect(input.selectionStart).toBe(CARET.MONTH);
		await user.type(input, '{ArrowRight}');
		// Simulate moving cursor to date segment
		expect(input.selectionStart).toBe(CARET.DATE);
	});
});

describe('DateInput_initial_input: Date Input', async () => {
	it('ignores 0 as the first day digit', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '12');
		await user.type(input, '0');
		expect(input.value).toBe('2022/12');
	});

	it('zero-pads and sets day segment when 1-9 is entered as first day digit', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '12');
		await user.type(input, '1');
		expect(input.value).toBe('2022/12/01');
	});

	it('combines valid second digit as day value and transitions to edit mode', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '12' + '1');
		await user.type(input, '2');
		expect(input.value).toBe('2022/12/12');
	});

	it('overwrite if second digit that exceeds max days of the month ', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '2' + '3');
		await user.type(input, '4');
		expect(input.value).toBe('2022/02/04');
	});

	it("backspace resets the day value to '00'", async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '12' + '25');
		await user.type(input, '{Backspace}');
		expect(input.value).toBe('2022/12/00');
	});

	it('left arrow moves the cursor to month input', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2022' + '12' + '25');
		input.setSelectionRange(CARET.DATE, CARET.DATE); // cursor at end of day
		await user.type(input, '{ArrowLeft}');
		expect(input.selectionStart).toBe(CARET.MONTH);
	});
});