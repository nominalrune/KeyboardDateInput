import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DateInput, MonthInput, handleDateChange, handleMonthChange, handleKeyPress } from '../src';
import '@testing-library/jest-dom/vitest';

// 1. api test

describe('DateInput', () => {
	it('renders correctly without props', () => {
		const { getByRole } = render(<DateInput />);
		expect(getByRole('textbox')).toBeInTheDocument();
	});

	it('accepts and displays value prop correctly', () => {
		const { getByDisplayValue } = render(<DateInput value="2023/05/15" />);
		expect(getByDisplayValue('2023/05/15')).toBeInTheDocument();
	});

	it('calls onChange prop when value changes', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(<DateInput onChange={handleChange} />);
		const input = getByRole('textbox');
		fireEvent.change(input, { target: { value: '2023/05/16' } });
		expect(handleChange).toHaveBeenCalled();
	});
});

describe('MonthInput', () => {
	it('renders correctly without props', () => {
		const { getByRole } = render(<MonthInput />);
		expect(getByRole('textbox')).toBeInTheDocument();
	});

	it('accepts and displays value prop correctly', () => {
		const { getByDisplayValue } = render(<MonthInput value="2023/05" />);
		expect(getByDisplayValue('2023/05')).toBeInTheDocument();
	});

	it('calls onChange prop when value changes', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(<MonthInput onChange={handleChange} />);
		const input = getByRole('textbox');
		fireEvent.change(input, { target: { value: '2023/06' } });
		expect(handleChange).toHaveBeenCalled();
	});
});

describe('handleDateChange', () => {
	it('returns undefined', () => {
		const mockSetSelectionRange = vi.fn();
		const mockEvent = {
			target: {
				value: '2023/05/15',
				setSelectionRange: mockSetSelectionRange,
			},
			preventDefault: vi.fn(),
		};
		expect(handleDateChange(mockEvent as any)).toBeUndefined();
	});
});

describe('handleMonthChange', () => {
	it('returns undefined', () => {
		const mockSetSelectionRange = vi.fn();
		const mockEvent = {
			target: {
				value: '2023/05',
				setSelectionRange: mockSetSelectionRange,
			},
			preventDefault: vi.fn(),
		};
		expect(handleMonthChange(mockEvent as any)).toBeUndefined();
	});
});

describe('handleKeyPress', () => {
	it('returns undefined', () => {
		const mockEvent = { key: '1', preventDefault: vi.fn() };
		expect(handleKeyPress(mockEvent as any)).toBeUndefined();
	});
});