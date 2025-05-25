/**
 * 各種caretの位置を取得する
 */
export default function getCaret(
	target: HTMLInputElement,
): ReturnType {
	const current = target.selectionStart ?? 0;
	const [_year, _month] = target.value.split("/");
	const year = _year.length;
	const month = (_month === undefined) ? year : year + 1 + _month.length; // +1 for "/"
	const date = target.value.length;

	return { current, year, month, date };
}

interface ReturnType {
	/** 現在のcaret位置 */
	current: number;
	/** 年の右端のcaret位置 */
	year: number;
	/** 月の右端のcaret位置 */
	month: number;
	/** 日の右端のcaret位置 */
	date: number;
}