import axios from '../config/rest/axiosConfig';
import {CredentialType} from "@/services/credentialFile";

function formatErrorMessage(file, response) {
  const message = [];
  message.push("The verification of file ");
  message.push(file.name);
  message.push(" failed");
  if (response.status) {
    message.push(" with status ");
    message.push(response.status);
  } else {
    message.push(" with reason ");
    message.push(response.toString());
  }
  if (response.data && response.data.message) {
    message.push("\r\nCause: ");
    message.push(response.data.message);
  }
  return message.join("");
}

function buildUri(credentialType) {
  const baseUri = 'services/verify';
  switch (credentialType) {
    case CredentialType.VerifiableCredential:
    case CredentialType.VerifiableCredentialWrapped:
      return baseUri + "/credentials";
    case CredentialType.VerifiablePresentation:
    case CredentialType.VerifiablePresentationWrapped:
      return baseUri + "/presentations";
  }
  throw new TypeError("Unknown credential type " + credentialType.toString());
}

function verifyCredential(vcObject) {
  return new Promise((resolve) => {
        axios.post(buildUri(vcObject.credentialType), vcObject.payload,
            {headers: {'content-type': 'application/json'}})
        .then(response => {
          if (response.status == 200) {
            resolve({
              name: vcObject.name,
              verified: true,
            });
          } else {
            resolve({
              name: vcObject.name,
              verified: false,
              message: formatErrorMessage(vcObject, response)
            });
          }
        })
        .catch(reason => {
          resolve({
            name: vcObject.name,
            verified: false,
            message: formatErrorMessage(vcObject, reason.response)
          });
        });
      }
  )
}

export {verifyCredential};
