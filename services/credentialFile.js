/**
 * This module loads & transforms various JSON verifiable credential formats to the Transmute specifications.
 */

const CredentialType = Object.freeze({
  Unknown: Symbol(0),
  VerifiableCredential: Symbol(1),
  VerifiableCredentialWrapped: Symbol(2),
  VerifiablePresentation: Symbol(3),
  VerifiablePresentationWrapped: Symbol(4)
});

const scanType = (vcCursor, wrapped) => {
  let foundVCType = CredentialType.Unknown;
  if (!Array.isArray(vcCursor)) {
    vcCursor = [vcCursor];
  }
  vcCursor.forEach(function (vcType) {
    if (vcType === "VerifiableCredential") {
      foundVCType = wrapped ? CredentialType.VerifiableCredentialWrapped
          : CredentialType.VerifiableCredential;
    } else if (vcType === "VerifiablePresentation") {
      foundVCType = wrapped ? CredentialType.VerifiablePresentationWrapped
          : CredentialType.VerifiablePresentation;
    }
  });
  return foundVCType;
}

const getVerifiableCredentialType = (vc) => {
  let vcCursor = vc["type"];
  if (vcCursor) {
    return scanType(vcCursor, false);
  }
  vcCursor = vc["verifiableCredential"];
  if (!vcCursor) {
    vcCursor = vc["verifiablePresentation"];
  }
  if (vcCursor) {
    vcCursor = vcCursor["type"];
  }
  if (vcCursor) {
    return scanType(vcCursor, true);
  } else {
    return CredentialType.Unknown;
  }
}

const extractChallengeValue = (vc) => {
  let vcCursor = vc["proof"];
  if (!vcCursor) {
    throw new TypeError("Invalid VC format, no proof section was found.");
  }
  vcCursor = vcCursor["challenge"];
  if (!vcCursor) {
    throw new TypeError("Invalid VC format, no proof/challenge value was found.");
  }
  return vcCursor;
}

const transformVerifiableCredential = vcJson => {
  const vc = JSON.parse(vcJson);
  const credentialType = getVerifiableCredentialType(vc);
  const vcObject = {
    credentialType
  };
  switch (credentialType) {
    case CredentialType.VerifiableCredential:
      vcObject["payload"] = {"verifiableCredential": vc};
      break;
    case CredentialType.VerifiablePresentation:
      vcObject["payload"] = {"verifiablePresentation": vc, "options": {"challenge": extractChallengeValue(vc)}};
      break;
    case CredentialType.Unknown:
      throw new TypeError(
          "Invalid VC format, only types VerifiableCredential & VerifiablePresentation are currently supported.");
    default:
      vcObject["payload"] = vcJson;
  }
  return vcObject;
}

const loadVerifiableCredential = file => {
  const fileReader = new FileReader();
  fileReader.readAsBinaryString(file);
  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      try {
        let vcObject = transformVerifiableCredential(fileReader.result);
        vcObject["name"] = file.name;
        resolve(vcObject);
      } catch (err) {
        reject(err);
      }
    };
    fileReader.onerror = err => {
      reject(err);
    };
  });
};

export {loadVerifiableCredential, CredentialType};
