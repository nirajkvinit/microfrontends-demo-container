export const mapAsync = async (arr, func) =>
  Promise.all(arr.map((item) => func(item)));
