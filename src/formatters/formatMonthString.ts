import formatMonthPart from './formatMonthPart';
import formatYearPart from './formatYearPart';

export default function formatMonthString(_input: string) {
	const input = _input.replace(/[^0-9/]/g, "");
	const [_year, _month] = input.split("/");
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

