import formatMonthString from '../formatters/formatMonthString';

/**
 * 入力フィールドの変更イベントハンドラー
 * 
 * 1. カーソルの位置を覚える
 * 2. 入力値をパースして整形する
 * 3. 整形した値をtarget.valueにセットする
 * 4. もとの値と整形値の文字数の差異に応じて、カーソルの位置を調整する
 * 
 * @returns {Date} パース結果の日付
 * 
 * @TODO カーソルの位置調整を外だし
 */
const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const input = e.target.value;
	const caret = e.target.selectionStart ?? 0;
	const output = formatMonthString(input);
	const diff =  output.length - input.length;
	
	e.target.value = output;
	e.target.setSelectionRange(caret + diff, caret + diff);
	return new Date(output.replace(/\//g, "-"));
};

export default handleMonthChange;