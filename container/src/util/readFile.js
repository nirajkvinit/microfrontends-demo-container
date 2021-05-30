export const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result);
    };

    reader.onerror = () => {
      reader.abort();
      reject('An error occurred while reading the file');
    };

    reader.readAsDataURL(file);
  });
};
