export default function getLastDateOfMonth(year: string, month: string) {
	return new Date(parseInt(year), parseInt(month), 0).getDate();
}