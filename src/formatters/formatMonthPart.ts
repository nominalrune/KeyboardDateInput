/**
 * 月部分をパース・フォーマットする
 * @param month 月部分の文字列
 * @param preserveZero 月が0のときに"00"を返すかどうか
 * @returns 月部分の文字列
 * @example
* "1"   -> "01"
* "01"  -> "01"
* "12"  -> "12"
* "13"  -> "03"
* "93"  -> "03"
* "930" -> "03"
* "100" -> "00"
* "110" -> "10"
* "120" -> "02"
* "130" -> "03"
* "112" -> "12"
* "113" -> "11"
* "0"   -> ""
* "00"  -> ""
* "abc" -> ""
* 小数点、マイナスは未定義動作を引き起こす
* 
@TODO 検証
*/
export default function formatMonthPart(month: string, preserveZero = false) {
	const monthNumber = parseInt(month);
	console.log("formatMonth, monthNumber", monthNumber);
	if (!monthNumber) {
		return preserveZero ? "00" : "";
	}
	if (monthNumber <= 12) {
		return monthNumber.toString().padStart(2, "0");
	}
	const lastTwoDigit = parseInt(month.slice(month.length - 2, month.length));
	console.log({ lastTwoDigit });
	if (lastTwoDigit <= 12) {
		return lastTwoDigit.toString().padStart(2, "0");
	}

	return (month.replace(/0/g, "").at(-1) ?? "").padStart(2, "0");
}