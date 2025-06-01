import formatMonthPart from './formatMonthPart';
import formatYearPart from './formatYearPart';

/**
 * 年月入力をパース・フォーマットする
 * - "yyyy/mm" または "yyyy/mm/dd" の形式で入力された場合、Edit Modeとして年月部分をフォーマットする
 * - それ以外の形式の場合、Input Modeとして年月部分をフォーマットする
 * @param input 年月部分の文字列
 * @returns 年月部分の文字列
 * @example
 * formatMonthString("2023/5")  // "2023/05"
 * formatMonthString("202305")    // "2023/05"
 * formatMonthString("2023/11/15") // "2023/11"
 * formatMonthString("20231115")   // "2023/11"
 * formatMonthString("2023")       // "2023"
 * formatMonthString("2023/0")     // "2023"
 * formatMonthString("2023/00")    // "2023"
 * formatMonthString("2023/13")    // "2023/03"
 */
export default function formatMonthString(input: string) {
	const strippedInput = input.replace(/[^0-9/]/g, "");
	const [_year, _month] = strippedInput.split("/");
	// "yyyy/mm"の場合
	if (_month && _month!=="0") {
		const year = formatYearPart(_year);
		const month = formatMonthPart(_month);
		return `${year}/${month}`;
	}
	// "yyyy"の場合
	return formatMonthStringFromNumeric(_year);
}

function formatMonthStringFromNumeric(input: string) {
	// 年は先頭4文字
	const year = input.slice(0, 4);

	// 残りの文字列
	const rest = input.slice(4);
	if (rest.length === 0) {
		return year;
	}
	const month = formatMonthPart(rest);

	return `${year}/${month}`;
}

