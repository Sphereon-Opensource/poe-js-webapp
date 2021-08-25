const ContentRequest = require('./SphereonSDKBlockchainProof/model/ContentRequest');
const RegistrationApi = require('./SphereonSDKBlockchainProof/api/RegistrationApi')
const VerificationApi = require('./SphereonSDKBlockchainProof/api/VerificationApi')
const CryptoJS = require('crypto-js')


export class BcProofService {

  constructor() {
    this.registrationApi = new RegistrationApi()
    this.verificationApi = new VerificationApi()
    this.registrationApi.apiClient.basePath = location.protocol + "//" + process.env.API_PROXY_SUBDOMAIN + "." + location.host + "/blockchain/proof/0.10";
  }

  registerFile = (fields, file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        try {
          const existence = this.buildExistence(fileReader);
          this.registrationApi.registerUsingContent(process.env.BLOCKCHAIN_PROOF_CONFIG_NAME, existence, {requestId: file.name}, (error, data) => {
            if (error) return reject(error);
            console.log("RegistrationState: " + data.perHashProofChain.registrationState)
            resolve(data);
          })
        } catch (err) {
          reject(err);
        }
      };
      fileReader.onerror = err => {
        reject(err);
      };
    });
  };

  verifyFile = (fields, file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        try {
          const existence = this.buildExistence(fileReader);
          this.verificationApi.verifyUsingContent(process.env.BLOCKCHAIN_PROOF_CONFIG_NAME, existence, {requestId: file.name}, (error, data) => {
            if (error) return reject(error);
            resolve(data);
          })
        } catch (err) {
          reject(err);
        }
      };
      fileReader.onerror = err => {
        reject(err);
      };
    });
  };

  buildExistence = (fileReader) => {
    const existence = new ContentRequest()
    existence.hashProvider = "CLIENT";
    const hash = CryptoJS.SHA256(this.arrayBufferToWordArray(fileReader.result));
    existence.content = hash.toString(CryptoJS.enc.Hex)
    return existence;
  }

  arrayBufferToWordArray = (ab) => {
    var i8a = new Uint8Array(ab);
    var a = [];
    for (var i = 0; i < i8a.length; i += 4) {
      a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
  };

}
