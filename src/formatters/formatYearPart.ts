/**
 * 年部分をパース・フォーマットする。かならず4桁になる。
 * @param input 年部分の文字列
 * @returns 年部分の文字列
 * @example
* "23"   -> "0023"
* "2023" -> "2023"
* "20230"-> "0230"
* "0"    -> "0000"
* "0000" -> "0000"
* "abc"  -> "0000"	
* "-99"  -> "0000"
*/
export default function formatYearPart(input: string) {
   const yearNumber = parseInt(input);
   if (!yearNumber || yearNumber < 0) {
	   return "0000";
   }
   const year = yearNumber.toString().padStart(4, "0");
   return year.slice(year.length - 4, year.length);
}
