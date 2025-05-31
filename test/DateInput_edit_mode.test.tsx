import React from "react";
import render from "./render";
import { describe, it, expect } from 'vitest';
import { DateInput } from '../src';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

const CARET = {
	YEAR: 4,
	MONTH: 7,
	DATE: 10,
};

describe('DateInput_edit_mode: Year Edit', async () => {
	it('numeric input shifts digits left and appends new digit', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
		input.setSelectionRange(CARET.YEAR, CARET.YEAR); // cursor at end of year
		await user.type(input, '4', { skipClick: true });
		expect(input.value).toBe('0234/05/15'); // 2023 -> 0234
		await user.type(input, '9', { skipClick: true });
		expect(input.value).toBe('2349/05/15'); // 0234 -> 2349
	});

	it('backspace in year edit mode resets the year to 0000', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
		input.setSelectionRange(CARET.YEAR, CARET.YEAR); // cursor at end of year
		await user.type(input, '{Backspace}', { skipClick: true });
		expect(input.value).toBe('0000/05/15'); // resets year to 0000
	});

	it('right arrow in year edit mode moves cursor to month segment', async () => {
		const { getByRole, user } = render(<DateInput />);
		const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
		input.setSelectionRange(CARET.YEAR, CARET.YEAR); // cursor at end of year
		await user.type(input, '{ArrowRight}', { skipClick: true });
		expect(input.selectionStart).toBe(CARET.MONTH);
	});
});

describe('DateInput_edit_mode: Month Edit', async () => {
    it("inputting '0' when month is '01' changes it to '10'; otherwise, input is ignored", async () => {
        const { getByRole, user, unmount } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023/01/15');
        input.setSelectionRange(CARET.MONTH, CARET.MONTH); // cursor at month segment
        await user.type(input, '0', { skipClick: true });
        expect(input.value).toBe('2023/10/15');
		unmount();

        const { getByRole: getByRole2, user: user2, unmount: unmount2 } = render(<DateInput />);
        const input2 = getByRole2('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '2' + '15');
        input2.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user2.type(input2, '0', { skipClick: true });
        expect(input2.value).toBe('2023/02/15');
		unmount2();
    });

    it("inputting '1' changes month to '01' unless it is already '01' or '11', in which case it becomes '11'", async () => {
        const { getByRole, user, unmount } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '2' + '15');
        input.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user.type(input, '1', { skipClick: true });
        expect(input.value).toBe('2023/01/15');
		unmount();

        const { getByRole: getByRole2, user: user2, unmount:unmount2 } = render(<DateInput />);
        const input2 = getByRole2('textbox') as HTMLInputElement;
		await user.type(input2, '20231115{ArrowLeft}{Backspace}1');
        expect(input2.value).toBe('2023/01/15');
        input2.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user2.type(input2, '1', { skipClick: true });
        expect(input2.value).toBe('2023/11/15');
		unmount2();
    });

    it("inputting '2' changes month to '02' unless it is already '01' or '11', in which case it becomes '12'", async () => {
        const { getByRole, user, unmount } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '3' + '15');
        input.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user.type(input, '2', { skipClick: true });
        expect(input.value.slice(5, 7)).toBe('02');
		unmount();

        const { getByRole: getByRole2, user: user2, unmount: unmount2 } = render(<DateInput />);
        const input2 = getByRole2('textbox') as HTMLInputElement;
		await user.type(input2, '2023' + '1' + '15');
        input2.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user2.type(input2, '2', { skipClick: true });
        expect(input2.value.slice(5, 7)).toBe('12');
		unmount2();
    });

    it("inputting '3'-'9' sets the month to the zero-padded value", async () => {
        const { getByRole, user } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
        input.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user.type(input, '7', { skipClick: true });
        expect(input.value.slice(5, 7)).toBe('07');
        await user.type(input, '9', { skipClick: true });
        expect(input.value.slice(5, 7)).toBe('09');
    });

    it('backspace in month edit mode resets the month to 00', async () => {
        const { getByRole, user } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
        input.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user.type(input, '{Backspace}', { skipClick: true });
        expect(input.value.slice(5, 7)).toBe('00');
    });

    it('left arrow in month edit mode moves cursor to year segment', async () => {
        const { getByRole, user } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
        input.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user.type(input, '{ArrowLeft}', { skipClick: true });
        expect(input.selectionStart).toBe(CARET.YEAR);
    });

    it('right arrow in month edit mode moves cursor to day segment', async () => {
        const { getByRole, user } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
        input.setSelectionRange(CARET.MONTH, CARET.MONTH);
        await user.type(input, '{ArrowRight}', { skipClick: true });
        expect(input.selectionStart).toBe(CARET.DATE);
    });
});

describe('DateInput_edit_mode: Date Edit', async () => {
    it("inputting a number combines with the first digit of the current day and updates the day if valid, or ignores if it exceeds the month's max day", async () => {
        // 12 -> 23 (valid for May)
        const { getByRole, user, unmount } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '12');
        input.setSelectionRange(CARET.DATE, CARET.DATE);
        await user.type(input, '3', { skipClick: true });
        expect(input.value).toBe('2023/05/23');
		unmount();

        // 28 -> 09 (invalid 29 for Feb)
        const { getByRole: getByRole2, user: user2, unmount: unmount2 } = render(<DateInput />);
        const input2 = getByRole2('textbox') as HTMLInputElement;
		await user.type(input2, '2023' + '2' + '28');
        input2.setSelectionRange(CARET.DATE, CARET.DATE);
        await user2.type(input2, '9', { skipClick: true });
        expect(input2.value).toBe('2023/02/09');
		unmount2();

        // 10 -> 10 (input 0)
        const { getByRole: getByRole3, user: user3, unmount: unmount3 } = render(<DateInput />);
        const input3 = getByRole3('textbox') as HTMLInputElement;
		
		await user.type(input3, '2023' + '9' + '10');
        expect(input3.value).toBe('2023/09/10');
        // input3.setSelectionRange(CARET.DATE, CARET.DATE);
        await user3.type(input3, '0', { skipClick: true });
        expect(input3.value).toBe('2023/09/10');
		unmount3();

        // 10 -> 03
        const { getByRole: getByRole4, user: user4, unmount: unmount4 } = render(<DateInput />);
        const input4 = getByRole4('textbox') as HTMLInputElement;
		await user.type(input4, '2023' + '11' + '10');
        input4.setSelectionRange(CARET.DATE, CARET.DATE);
        await user4.type(input4, '3', { skipClick: true });
        expect(input4.value).toBe('2023/11/03');
		unmount4();

        // 31 -> 09
        const { getByRole: getByRole5, user: user5 } = render(<DateInput/>);
        const input5 = getByRole5('textbox') as HTMLInputElement;
		await user.type(input5, '2023' + '11' + '31');
        input5.setSelectionRange(CARET.DATE, CARET.DATE);
        await user5.type(input5, '9', { skipClick: true });
        expect(input5.value).toBe('2023/11/09');
    });

    it('backspace in date edit mode resets the day to 00', async () => {
        const { getByRole, user } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
        input.setSelectionRange(CARET.DATE, CARET.DATE);
        await user.type(input, '{Backspace}', { skipClick: true });
        expect(input.value).toBe('2023/05/00');
    });

    it('left arrow in date edit mode moves cursor to month segment', async () => {
        const { getByRole, user } = render(<DateInput />);
        const input = getByRole('textbox') as HTMLInputElement;
		await user.type(input, '2023' + '5' + '15');
        input.setSelectionRange(CARET.DATE, CARET.DATE);
        await user.type(input, '{ArrowLeft}', { skipClick: true });
        expect(input.selectionStart).toBe(CARET.MONTH);
    });
});