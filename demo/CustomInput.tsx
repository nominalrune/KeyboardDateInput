import { useState } from "react";
import "./custom_input.css";

export default function CustomInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
	const [error, setError] = useState<string | null>(null);
	const [value, setValue] = useState<string>("");
	const [rawValue, setRawValue] = useState<string>("");
	function clear(){
		setValue("");
	}
	return (<div className='custom-input'>
		<label htmlFor="input">My Input Element:</label>
		<div className="flex">
		<input
			id="input"
			{...props}
			value={value}
			onChange={(e) => {
				setRawValue(e.target.value);
				props.onChange?.(e);
				const value = e.target.value;
				setValue(value);
				const [y, m, d] = value.split("/").map(part => parseInt(part.trim()));
				if (y && y > 2000) {
					setError("Please enter a year less than 2000");
				} else if (m && (m < 1 || m > 12)) {
					setError("Please enter a month between 1 and 12");
				} else if (d && (d < 1 || d > 31)) {
					setError("Please enter a day between 1 and 31");
				} else {
					setError(null);
				}
			}}
			placeholder="Enter date or month"
		/>
		<button className="clear-button"
			onClick={clear}
			type="button">×</button>
		</div>
		{error && <div className="error"> {error} </div>}
		<label htmlFor="raw">raw input:</label>
		<input id="raw" value={rawValue} disabled/>
	</div>
	);
}