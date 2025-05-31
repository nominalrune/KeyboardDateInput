import { forwardRef } from "react";
import handleMonthChange from './eventHandlers/handleMonthChange';
import handleKeyPress from './eventHandlers/handleMonthKeyPress';
import type { Props } from './type/Props';

const MonthInput = forwardRef<HTMLInputElement, Props>(({ onChange, ...otherProps }: Props, ref) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleMonthChange(e);
		if (onChange) {
			onChange(e);
		}
	};

	return <input
		{...otherProps}
		ref={ref}
		type="text"
		inputMode="decimal"
		onChange={handleChange}
		onKeyDown={handleKeyPress}
	/>;
});

MonthInput.displayName = "MonthInput";
export default MonthInput;
export type { Props as MonthInputProps };