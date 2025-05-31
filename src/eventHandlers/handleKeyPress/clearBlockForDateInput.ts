import getCaret from '../../util/caret/getCaret';

/**
 *  バックスペースをおした時、年・月・日ごとに削除
 * "yyyy/mm/dd"の形式で入力されているときのみこの削除を行う
 */
const clearBlockForDateInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
	const target = e.target as HTMLInputElement;
	const input = target.value;
	if (!/^\d*\/\d*\/\d*$/.test(input)) {
		// yyyy/mm/ddの形式を満たさないときは何もしない
		return;
	}
	e.preventDefault();
	const [year, month, date] = input.split("/");
	const caret = getCaret(target);

	if (caret.current === caret.year) {
		target.value = `0000/${month}/${date}`;
		target.setSelectionRange(caret.year, caret.year);
	} else if (caret.current === caret.month) {
		target.value = `${year}/00/${date}`;
		target.setSelectionRange(caret.month, caret.month);
	} else if (date) {
		target.value = `${year}/${month}/00`;
		target.setSelectionRange(caret.date, caret.date);
	}
};
export default clearBlockForDateInput;