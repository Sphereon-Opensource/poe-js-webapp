const bytesFromFile = file => {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = err => {
      reject(err);
    };
  });
};

export {bytesFromFile};
