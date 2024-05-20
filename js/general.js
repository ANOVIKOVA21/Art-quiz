export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getArrOfRandomUniqueNumbers(arrLength, maxNumber) {
  const arr = [...Array(arrLength)];
  arr.forEach((item, index, arr) => {
    let num = getRandomIntInclusive(0, maxNumber);
    while (arr.includes(num)) {
      num = getRandomIntInclusive(0, maxNumber);
    }
    arr[index] = num;
  });
  return arr;
}
export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
