require('dotenv').config();
const { auth } = require('express-oauth2-jwt-bearer');
var request = require("request");

const { AUTH0_AUDIENCE, AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env

const jwtCheck = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

var getManagementApiJwt = () => {
  return new Promise(function (resolve, reject) {
    var options = {
      method: 'POST',
      url: `https://${AUTH0_DOMAIN}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: `{"client_id":"${AUTH0_CLIENT_ID}","client_secret":"${AUTH0_CLIENT_SECRET}","audience":"${AUTH0_AUDIENCE}","grant_type":"client_credentials"}`
    };

    request(options, function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        resolve(JSON.parse(body))
      }
    })
  })
}

module.exports = {
  jwtCheck,
  getManagementApiJwt
};
