import formatDatePart from './formatDatePart';
import formatMonthPart from './formatMonthPart';
import formatYearPart from './formatYearPart';
import getLastDateOfMonth from '../util/date/getLastDateOfMonth';

export default function formatDateString(_input: string) {
	const input = _input.replace(/[^0-9/]/g, "");
	if (input.includes("/")) {
		return formatDateStringWithSlashes(input);
	}
	return formatDateStringFromNumeric(input);
}


/**
 * スラッシュがあるときのパース・フォーマット
 */
function formatDateStringWithSlashes(input: string) {
	const [_year, _month, _date] = input.split("/");
	const year = formatYearPart(_year);
	// "yyyy/mm/dd" になっている場合
	if (_date) {
		const month = formatMonthPart(_month, true);
		const dateWithSlash = formatDatePart(_date, getLastDateOfMonth(year, month));
		return `${year}/${month}${dateWithSlash}`;
	}
	const monthCandidate = parseInt(_month);
	// "yyyy/mm"でmmが 0　または 13 以上になっている場合
	if (_month && (monthCandidate > 12 || monthCandidate === 0)) {
		return formatDateStringFromNumeric(`${year}${_month}`);
	}
	// "yyyy/mm"でmmが1〜12になっている場合
	if (_month) {
		const month = formatMonthPart(_month);
		return `${year}/${month}`;
	}
	return year;
}
function formatDateStringFromNumeric(input: string) {
	// 年は先頭4文字
	const year = input.slice(0, 4);

	// 残りの文字列
	const rest = input.slice(4);
	let month = "";
	let date = "";

	// 月も日もあるときの処理
	if (rest.length >= 2) {
		const monthCandidate = parseInt(rest.slice(0, 2));
		// 月の桁数が1桁と2桁で場合わけ
		if (monthCandidate <= 12) {
			// 月が2桁のとき
			month = monthCandidate.toString();
			date = rest.slice(2);
		} else {
			// 月が1桁のとき
			month = rest.slice(0, 1);
			date = rest.slice(1);
		}
		if (parseInt(date || "0") === 0) {
			return `${year}/${month.padStart(2, "0")}`;
		}
	} else if (rest.length === 1) {
		// 月のみのときの処理
		month = rest.slice(0, 1);
		if (parseInt(month) === 0) {
			return `${year}`;
		}
		return `${year}/${month.padStart(2, "0")}`;
	} else {
		return year;
	}
	const dateWithSlash = formatDatePart(date, getLastDateOfMonth(year, month));

	return `${year}/${month.padStart(2, "0")}${dateWithSlash}`;
}

