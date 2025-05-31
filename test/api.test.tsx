import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DateInput, MonthInput, withDateInputFeature, withMonthInputFeature } from '../src';
import '@testing-library/jest-dom/vitest';

// 1. api test

describe('DateInput API', () => {
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

describe('MonthInput API', () => {
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

describe('withDateInputFeature API', () => {
	const TestComponent = withDateInputFeature((params) => (
		<input {...params} />
	));
	it('renders input element', () => {
		const { getByRole } = render(<TestComponent />);
		expect(getByRole('textbox')).toBeInTheDocument();

	});

	it('calls handleDateChange on input change', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(<TestComponent onChange={handleChange} />);
		const input = getByRole('textbox');
		fireEvent.change(input, { target: { value: '2023/07/20' } });
		expect(handleChange).toHaveBeenCalled();
	});

	it('calls handleKeyPress on key press', () => {
		const handleKeyPress = vi.fn();
		const { getByRole } = render(<TestComponent onKeyDown={handleKeyPress} />);
		const input = getByRole('textbox');
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
		expect(handleKeyPress).toHaveBeenCalled();
	});
});
describe('withMonthInputFeature API', () => {
	const TestComponent = withMonthInputFeature((params) => (
		<input {...params} />
	));
	it('renders input element', () => {
		const { getByRole } = render(<TestComponent />);
		expect(getByRole('textbox')).toBeInTheDocument();

	});

	it('calls handleDateChange on input change', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(<TestComponent onChange={handleChange} />);
		const input = getByRole('textbox');
		fireEvent.change(input, { target: { value: '2023/07/20' } });
		expect(handleChange).toHaveBeenCalled();
	});

	it('calls handleKeyPress on key press', () => {
		const handleKeyPress = vi.fn();
		const { getByRole } = render(<TestComponent onKeyDown={handleKeyPress} />);
		const input = getByRole('textbox');
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', target: { value: '2023/07/20' } });
		expect(handleKeyPress).toHaveBeenCalled();
	});
});