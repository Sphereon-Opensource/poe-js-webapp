/* eslint-disable */
/**
 * Blockchain Proof
 * With the Blockchain Proof API it is easy to prove or disprove existence of data at a certain point in time. Behind the scenes it stores entries using the Factom (bitcoin), Multichain or Ethereum blockchain by means of our generic blockchain API.    The flow is generally as follows:  1. Make sure a configuration is present  2. Register content by uploading a file, some content, or providing a Stream Location from the Storage API. When you upload content you have to tell the API whether the data has already been hashed or not. If not, or when uploading a file or stream location, the API will take care of the hashing  3. Verify content by uploading a file, some content, or providing a Stream Location from the Storage API. When you upload content you have to tell the API whether the data has already been hashed or not. If not, or when uploading a file or stream location, the API will take care of the hashing. You will get back whether the content has been registered previously or not    Full API Documentation: https://docs.sphereon.com/api/blockchain-proof/0.10/html  Interactive testing: A web based test console is available in the Sphereon API Store at https://store.sphereon.com
 *
 * OpenAPI spec version: 0.10
 * Contact: dev@sphereon.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/CommittedEntry'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CommittedEntry'));
  } else {
    // Browser globals (root is window)
    if (!root.BlockchainProof) {
      root.BlockchainProof = {};
    }
    root.BlockchainProof.VerifyContentResponse = factory(root.BlockchainProof.ApiClient, root.BlockchainProof.CommittedEntry);
  }
}(this, function(ApiClient, CommittedEntry) {
  'use strict';




  /**
   * The VerifyContentResponse model module.
   * @module ../model/VerifyContentResponse
   * @version 0.10
   */

  /**
   * Constructs a new <code>VerifyContentResponse</code>.
   * Verify Content response
   * @alias module:../model/VerifyContentResponse
   * @class
   * @param contextName {String}
   * @param contentRegistrationChainTypes {Array.<module:../model/VerifyContentResponse.ContentRegistrationChainTypesEnum>} A set of content registration targets
   * @param signatureType {module:../model/VerifyContentResponse.SignatureTypeEnum} The signature type from the request or the default from the settings
   * @param base64Signature {String} The calculated signature in base64 form
   * @param hash {String} The hash in base64 format that you supplied or that was calculated. This is the actual hash for the content
   * @param hexSignature {String} The calculated signature in hex form
   */
  var exports = function(contextName, contentRegistrationChainTypes, signatureType, base64Signature, hash, hexSignature) {
    var _this = this;


    _this['contextName'] = contextName;

    _this['contentRegistrationChainTypes'] = contentRegistrationChainTypes;
    _this['signatureType'] = signatureType;


    _this['base64Signature'] = base64Signature;


    _this['hash'] = hash;

    _this['hexSignature'] = hexSignature;
  };

  /**
   * Constructs a <code>VerifyContentResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:../model/VerifyContentResponse} obj Optional instance to populate.
   * @return {module:../model/VerifyContentResponse} The populated <code>VerifyContentResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('registrationTime')) {
        obj['registrationTime'] = ApiClient.convertToType(data['registrationTime'], 'Date');
      }
      if (data.hasOwnProperty('contextName')) {
        obj['contextName'] = ApiClient.convertToType(data['contextName'], 'String');
      }
      if (data.hasOwnProperty('singleProofChain')) {
        obj['singleProofChain'] = CommittedEntry.constructFromObject(data['singleProofChain']);
      }
      if (data.hasOwnProperty('contentRegistrationChainTypes')) {
        obj['contentRegistrationChainTypes'] = ApiClient.convertToType(data['contentRegistrationChainTypes'], ['String']);
      }
      if (data.hasOwnProperty('signatureType')) {
        obj['signatureType'] = ApiClient.convertToType(data['signatureType'], 'String');
      }
      if (data.hasOwnProperty('perHashProofChain')) {
        obj['perHashProofChain'] = CommittedEntry.constructFromObject(data['perHashProofChain']);
      }
      if (data.hasOwnProperty('requestId')) {
        obj['requestId'] = ApiClient.convertToType(data['requestId'], 'String');
      }
      if (data.hasOwnProperty('base64Signature')) {
        obj['base64Signature'] = ApiClient.convertToType(data['base64Signature'], 'String');
      }
      if (data.hasOwnProperty('registrationState')) {
        obj['registrationState'] = ApiClient.convertToType(data['registrationState'], 'String');
      }
      if (data.hasOwnProperty('signatureState')) {
        obj['signatureState'] = ApiClient.convertToType(data['signatureState'], 'String');
      }
      if (data.hasOwnProperty('hash')) {
        obj['hash'] = ApiClient.convertToType(data['hash'], 'String');
      }
      if (data.hasOwnProperty('signatureStateMessage')) {
        obj['signatureStateMessage'] = ApiClient.convertToType(data['signatureStateMessage'], 'String');
      }
      if (data.hasOwnProperty('hexSignature')) {
        obj['hexSignature'] = ApiClient.convertToType(data['hexSignature'], 'String');
      }
    }
    return obj;
  }

  /**
   * This is the first registration time from the singleProofChain or the perHashProofChain
   * @member {Date} registrationTime
   */
  exports.prototype['registrationTime'] = undefined;
  /**
   * @member {String} contextName
   */
  exports.prototype['contextName'] = undefined;
  /**
   * This is the single proof chain where all hashes are stored in a single chain (if configured)
   * @member {module:../model/CommittedEntry} singleProofChain
   */
  exports.prototype['singleProofChain'] = undefined;
  /**
   * A set of content registration targets
   * @member {Array.<module:../model/VerifyContentResponse.ContentRegistrationChainTypesEnum>} contentRegistrationChainTypes
   */
  exports.prototype['contentRegistrationChainTypes'] = undefined;
  /**
   * The signature type from the request or the default from the settings
   * @member {module:../model/VerifyContentResponse.SignatureTypeEnum} signatureType
   */
  exports.prototype['signatureType'] = undefined;
  /**
   * This is the proof chain specific for the current hash, so a chain per hash (if configured)
   * @member {module:../model/CommittedEntry} perHashProofChain
   */
  exports.prototype['perHashProofChain'] = undefined;
  /**
   * @member {String} requestId
   */
  exports.prototype['requestId'] = undefined;
  /**
   * The calculated signature in base64 form
   * @member {String} base64Signature
   */
  exports.prototype['base64Signature'] = undefined;
  /**
   * This is the registration state from the singleProofChain or the perHashProofChain. If one of the chains has a registration this will return REGISTERED
   * @member {module:../model/VerifyContentResponse.RegistrationStateEnum} registrationState
   */
  exports.prototype['registrationState'] = undefined;
  /**
   * This is the signature state.
   * @member {module:../model/VerifyContentResponse.SignatureStateEnum} signatureState
   */
  exports.prototype['signatureState'] = undefined;
  /**
   * The hash in base64 format that you supplied or that was calculated. This is the actual hash for the content
   * @member {String} hash
   */
  exports.prototype['hash'] = undefined;
  /**
   * This is a message describing the signature state.
   * @member {String} signatureStateMessage
   */
  exports.prototype['signatureStateMessage'] = undefined;
  /**
   * The calculated signature in hex form
   * @member {String} hexSignature
   */
  exports.prototype['hexSignature'] = undefined;


  /**
   * Allowed values for the <code>contentRegistrationChainTypes</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ContentRegistrationChainTypesEnum = {
    /**
     * value: "PER_HASH_PROOF_CHAIN"
     * @const
     */
    "PER_HASH_PROOF_CHAIN": "PER_HASH_PROOF_CHAIN",
    /**
     * value: "SINGLE_PROOF_CHAIN"
     * @const
     */
    "SINGLE_PROOF_CHAIN": "SINGLE_PROOF_CHAIN"  };

  /**
   * Allowed values for the <code>signatureType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.SignatureTypeEnum = {
    /**
     * value: "KEY_ID"
     * @const
     */
    "KEY_ID": "KEY_ID",
    /**
     * value: "SUPPLIED"
     * @const
     */
    "SUPPLIED": "SUPPLIED",
    /**
     * value: "SECRET"
     * @const
     */
    "SECRET": "SECRET",
    /**
     * value: "NONE"
     * @const
     */
    "NONE": "NONE"  };

  /**
   * Allowed values for the <code>registrationState</code> property.
   * @enum {String}
   * @readonly
   */
  exports.RegistrationStateEnum = {
    /**
     * value: "NOT_REGISTERED"
     * @const
     */
    "NOT_REGISTERED": "NOT_REGISTERED",
    /**
     * value: "PENDING"
     * @const
     */
    "PENDING": "PENDING",
    /**
     * value: "REGISTERED"
     * @const
     */
    "REGISTERED": "REGISTERED"  };

  /**
   * Allowed values for the <code>signatureState</code> property.
   * @enum {String}
   * @readonly
   */
  exports.SignatureStateEnum = {
    /**
     * value: "NOT_FOUND"
     * @const
     */
    "NOT_FOUND": "NOT_FOUND",
    /**
     * value: "UNSIGNED"
     * @const
     */
    "UNSIGNED": "UNSIGNED",
    /**
     * value: "INVALID"
     * @const
     */
    "INVALID": "INVALID",
    /**
     * value: "VERIFIED"
     * @const
     */
    "VERIFIED": "VERIFIED"  };


  return exports;
}));


