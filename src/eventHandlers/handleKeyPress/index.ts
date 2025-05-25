import clearBlock from './clearBlock';
import moveCaret from './moveCaret';

/**
 * Handles key press events for a date input field.
 */
const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
	if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
		return moveCaret(e);
	}
	if (["Backspace", "Delete"].includes(e.key)) {
		return clearBlock(e);
	}
};
export default handleKeyPress;