module.exports = function (context) {
  'use strict';
  var config = context.config;
  var crypto = require('crypto');

  var generateToken = function (email) {
    var salt = new Buffer(crypto.randomBytes(32)).toString('hex');

    var unsignedToken =
      "v1;"+
      email + ";" +
      salt;

    var sig = calcSignature(unsignedToken);

    var signedToken = unsignedToken + ":" + sig;

    return signedToken;
  };


  var verifyToken = function (token) {

    if(typeof(token) !== 'string' || token === "" || token.indexOf(':') === -1) {
      console.error('verifyToken failed precheck');
      return null;
    }

    var bits = token.split(':');

    var unsignedToken = bits[0];
    var sig = bits[1];

    var expectedSig = calcSignature(unsignedToken);

    if(expectedSig === sig) {
      return  unsignedToken.split(';')[1];
    } else {
      console.log("Token invalid");
      return null;
    }
  };

  var calcSignature = function (unsignedToken) {
    var hash = crypto.createHmac('sha1', config.secret).update(unsignedToken).digest('hex');
    return hash;
  };

  return {
    generateToken: generateToken,
    verifyToken: verifyToken
  };
};
