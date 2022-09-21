
/**
 * Function to return a string representing a date from a formatted date object
 * 
 * @param {object} date 
 * @return {string}
 */
 export function formatMorganDate (date: any): string {
  if (typeof date === "string") {
    date = new Date(date)
  }
  
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

  const year = date.getFullYear(),
    month = months[date.getMonth()],
    day = date.getDate(),
    hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`,
    minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;

  return `${day} ${month} ${year} à ${hour}h${minutes}`
}


/**
 * Function to compare if two objects have the same content
 * 
 * @param {object} obj1
 * @param {object} obj2
 * @return boolean
 */

export const compareObjects = (obj1: any, obj2: any): boolean => {
  return Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every(p => obj1[p] === obj2[p]);
}  

/**
 * Function to compare if two array of objects have the same content
 * 
 * @param {object} obj1
 * @param {object} obj2
 * @return boolean
 */

 export const compareObjectsArray = (arr1: object[] | any, arr2: object[] | any): boolean => {
  let arr: boolean[] = [];
  console.log("arrs =>", arr1, arr2);
  
  arr1.forEach((item: any) => {
    console.log(typeof item);
    
    const isSame = Object.keys(item).length === Object.keys(arr2).length && Object.keys(item).every(i => item[i] === arr2[i]);

    arr.push(isSame);
  }) 
  console.log("isSame =>", arr);
  
  return  arr.every(item => item === true);
} 
