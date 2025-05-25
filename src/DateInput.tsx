import { forwardRef } from "react";
import handleDateChange from './eventHandlers/handleDateChange';
import handleKeyPress from './eventHandlers/handleKeyPress';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const DateInput = forwardRef<HTMLInputElement>(({ onChange, ...otherProps }:Props, ref) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleDateChange(e);
		if (onChange) {
			return onChange(e);
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

DateInput.displayName = "DateInput";
export default DateInput;
export type { Props as DateInputProps };
