/**
 * generate list year in intervall
 * @param begin 
 * @param end 
 */

export const generateListYear = (
  begin: number,
  end: number
) => {
  const years = [];
  for(let i = begin; i <= end; i++){
    years.push(i)
  }

  return years
}