import getCaret from '../../util/caret/getCaret';

/**
 *  バックスペースをおした時、年・月ごとに削除
 * "yyyy/mm"の形式で入力されているときのみこの削除を行う
 */
const clearBlockForMonthInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
	const target = e.target as HTMLInputElement;
	const input = target.value;
	const [_, month] = input.split("/");
	if (!/^\d*\/\d*$/.test(input)) {
		// yyyy/mmの形式を満たさない（yyyyのみの）ときは何もしない
		return;
	}
	const caret = getCaret(target);

	if (caret.current === caret.year) {
		e.preventDefault();
		
		target.value = `0000/${month}`;
		target.setSelectionRange(caret.year, caret.year);
	}
};
export default clearBlockForMonthInput;