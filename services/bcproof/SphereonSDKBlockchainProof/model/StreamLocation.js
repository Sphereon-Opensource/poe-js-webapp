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
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.BlockchainProof) {
      root.BlockchainProof = {};
    }
    root.BlockchainProof.StreamLocation = factory(root.BlockchainProof.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The StreamLocation model module.
   * @module ../model/StreamLocation
   * @version 0.10
   */

  /**
   * Constructs a new <code>StreamLocation</code>.
   * Location record of data stream
   * @alias module:../model/StreamLocation
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>StreamLocation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:../model/StreamLocation} obj Optional instance to populate.
   * @return {module:../model/StreamLocation} The populated <code>StreamLocation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('folderPath')) {
        obj['folderPath'] = ApiClient.convertToType(data['folderPath'], 'String');
      }
      if (data.hasOwnProperty('filename')) {
        obj['filename'] = ApiClient.convertToType(data['filename'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('containerId')) {
        obj['containerId'] = ApiClient.convertToType(data['containerId'], 'String');
      }
      if (data.hasOwnProperty('originalFilename')) {
        obj['originalFilename'] = ApiClient.convertToType(data['originalFilename'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} folderPath
   */
  exports.prototype['folderPath'] = undefined;
  /**
   * @member {String} filename
   */
  exports.prototype['filename'] = undefined;
  /**
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {String} containerId
   */
  exports.prototype['containerId'] = undefined;
  /**
   * @member {String} originalFilename
   */
  exports.prototype['originalFilename'] = undefined;



  return exports;
}));


