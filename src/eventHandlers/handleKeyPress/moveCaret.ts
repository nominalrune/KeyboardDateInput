import getCaret from '../../util/caret/getCaret';

/**
 * 右矢印や左矢印キーが押されたとき、年月日の区切りごとに移動するようにする
 */
const moveCaret = (e: React.KeyboardEvent<HTMLInputElement>) => {
	e.preventDefault();
	const target = e.target as HTMLInputElement;
	const caret = getCaret(target);
		if (e.key === "ArrowRight") {
		if (caret.current < caret.year) {
			return target.setSelectionRange(caret.year, caret.year);
		} else if (caret.current < caret.month) {
			return target.setSelectionRange(caret.month, caret.month);
		} else {
			return target.setSelectionRange(caret.date, caret.date);
		}
	}
	if (e.key === "ArrowLeft") {
		if (caret.current <= caret.month) {
			return target.setSelectionRange(caret.year, caret.year);
		} else {
			return target.setSelectionRange(caret.month, caret.month);
		}
	}
};
export default moveCaret;