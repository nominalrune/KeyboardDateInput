/**
* 日付部分をパース・フォーマットする。0以外の場合、先頭に"/"がつくことに注意
* 月の最終日より大きい場合の処理はexample参照
* @param date 日付部分の文字列
* @param lastDateOfMonth 月の最終日
* @returns 日付部分の文字列
* @example
* "1"   -> "/01"
* "01"  -> "/01"
* "010" -> "/10"
* "31"  -> "/31"
* "32"  -> "/03"
* "321" -> "/21"
* "339" -> "/09"
* "0"   -> ""
* "00"  -> ""
*/
export default function formatDatePart(date: string, lastDateOfMonth: number) {
	const dateNumber = parseInt(date.slice(date.length - 2, date.length));
	// 日付がNaN or 0なら""にする
	if (!dateNumber || dateNumber === 0) {
		return "";
	} else if (dateNumber > lastDateOfMonth) {
		return "/0" + date.at(-1);
	} else {
		return "/" + dateNumber.toString().slice(0, 2).padStart(2, "0");
	}
}