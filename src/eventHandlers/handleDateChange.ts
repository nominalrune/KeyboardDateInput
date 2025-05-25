import formatDateString from '../formatters/formatDateString';

/**
 * 入力フィールドの変更イベントハンドラー
 * 
 * 1. カーソルの位置を覚える
 * 2. 入力値をパースして整形する
 * 3. 整形した値をtarget.valueにセットする
 * 4. もとの値と整形値の文字数の差異に応じて、カーソルの位置を調整する
 * 
 * @TODO カーソルの位置調整を外だし
 */
const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const input = e.target.value;
	const caret = e.target.selectionStart ?? 0;
	const output = formatDateString(input);
	const diff =  output.length - input.length;
	
	e.target.value = output;
	e.target.setSelectionRange(caret + diff, caret + diff);
};

export default handleDateChange;