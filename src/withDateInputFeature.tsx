import type { ReactNode } from 'react';
import handleDateChange from './eventHandlers/handleDateChange'
import handleDateKeyPress from './eventHandlers/handleDateKeyPress'
import type { Props } from './type/Props';

const withDateInputFeature = <T extends Props>(Input: (params:T)=>ReactNode) => ((params:T)=> {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleDateChange(e);
		if (params.onChange) {
			return params.onChange(e);
		}
	}
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		handleDateKeyPress(e);
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

export default withDateInputFeature;