

const assertVerifiableCredentialType = vc => {
  let vcCursor = vc["verifiableCredential"] ? vc["verifiableCredential"] : vc;
  vcCursor = vcCursor["type"];
  if (!vcCursor) {
    throw new TypeError("Invalid VC format, no type value was found.");
  }
  let foundVCType = false;
  vcCursor.forEach(function (vcType) {
    console.log("vcType: " + vcType);
    if (vcType === "VerifiableCredential") {
      foundVCType = true;
    }
  });
  if (!foundVCType) {
    throw new TypeError(
      "Invalid VC format, no type value 'VerifiableCredential' was found.");
  }
}

const injectVerifiableCredential = vcJson => {
  const vc = JSON.parse(vcJson);
  assertVerifiableCredentialType(vc);
  if (!vc["verifiableCredential"]) {
    const wrapper = {"verifiableCredential": vc}
    console.log(wrapper);
    return wrapper;
  }
  return vcJson;
}

const loadVerifiableCredential = file => {
  const fileReader = new FileReader();
  fileReader.readAsBinaryString(file);
  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      resolve(injectVerifiableCredential(fileReader.result));
    };
    fileReader.onerror = err => {
      reject(err);
    };
  });
};

export {loadVerifiableCredential};
