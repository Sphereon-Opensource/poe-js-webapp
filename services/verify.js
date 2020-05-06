import axios from '../config/rest/axiosConfig';

function formatErrorMessage(file, response) {
  const message = [];
  message.push("The verification of file ");
  message.push(file.name);
  message.push("failed with status ");
  message.push(response.status);
  if (response["data"] && response["data"]["message"]) {
    message.push("Reason: ");
    message.push(response["data"]["message"]);
  }
  return message.join("");
}

function verifyJsonCredential(file) {
  return new Promise((resolve, reject) => {
      axios.post('services/verify/credentials', file.vcObject,
        {headers: {'content-type': 'application/json'}})
      .then(response => {
        if (response.status == 200) {
          resolve({
            name: file.name,
            verified: true,
          });
        } else {
          reject({
            name: file.name,
            verified: false,
            message: formatErrorMessage(file, response)
          });
        }
      });
    }
  )
}

export {verifyJsonCredential};
