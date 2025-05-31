import type { ReactNode } from 'react';
import handleMonthChange from './eventHandlers/handleMonthChange'
import handleMonthKeyPress from './eventHandlers/handleMonthKeyPress'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const WithMonthInputFeature = <T extends Props>(Input: (params:T)=>ReactNode) => ((params:T)=> {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleMonthChange(e);
		if (params.onChange) {
			return params.onChange(e);
		}
	}
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		handleMonthKeyPress(e);
		if (params.onKeyDown) {
			return params.onKeyDown(e);
		}
	}
	return <>
	<Input
		{...params}
		onChange={handleChange}
		onKeyDown={handleKeyPress}
		/>
	</>
})

export default WithMonthInputFeature;