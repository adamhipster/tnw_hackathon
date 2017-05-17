
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();

app.use(bodyParser());

app.get('/agreement', function(req, res) {
  getAgreement();
});

function getAgreement(){
  var getAgreementId = function(next) {
    var options = {
      url: 'https://api.toonapi.com/toon/api/v1/agreements',
      headers: {
        'Authorization': 'Bearer 1e703bc6-2e6c-3775-9f43-d5f5bd8a242f'
      }
    };

    request(options, function (error, response, body) {

      if(error) {
        console.log('Getting Agreement failed.');
        console.log('error:', error); // Print the error if one occurred
        return next(error);
      }

      // Fetch the answer
      var getAgreementJSON = JSON.parse(response.body);

      var agreementId = getAgreementJSON[0].agreementId;

      agreementIdJSON = {
        'agreementId': agreementId
      }

      console.log(agreementIdJSON);

      next(error, agreementIdJSON)
      // return JSON.stringify(agreementIdJSON);

    });
  };

  // Call the TOON API for posting the agreement

  var postAgreementId = function(agreementIdJSON) {
    var options = {
      url: 'https://api.toonapi.com/toon/api/v1/agreements',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 1e703bc6-2e6c-3775-9f43-d5f5bd8a242f',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agreementIdJSON)
    }

    request(options, function (error, response, body) {

      if(error) {
        console.log('Posting Agreement failed.');
        console.log('error:', error); // Print the error if one occurred
        return next(error);
      }

      console.log('response: ' + JSON.stringify(response));
      console.log('body: ' + body);

      // var postAgreement = response;
    });
  };

  // Call the TOON API for getting an agreement
  getAgreementId((err, agreementIdJSON) => {
    // Call the TOON API to validate the agreementId on their side
    postAgreementId(agreementIdJSON);
  });
}

app.get('/devices', function(req, res) {

  var req = req;

  var getAllDevices = function() {
    var options = {
      url: 'https://api.toonapi.com/toon/api/v1/devices',
      headers: {
        method: 'GET',
        'Authorization': 'Bearer 1e703bc6-2e6c-3775-9f43-d5f5bd8a242f',
        'Content-Type': 'application/json'
      }
    }

    request(options, function(error, response, body) {
      if(error) {
        console.log('Posting Agreement failed.');
        console.log('error:', error); // Print the error if one occurred
        return error;
      }

      console.log('response: ' + response);
      console.log('body: ' + body);
    })
  }

  getAllDevices();

  console.log(getAllDevices());

});

app.get('/setLightOn', function(req, res) {

  // get the agreement here!

  var req = req;

  var postLight = function() {
    var options = {
      url: 'https://api.toonapi.com/toon/api/v1/devices/7ef160f9-3cea-4c0a-83dd-879790f9f99f',
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer 1e703bc6-2e6c-3775-9f43-d5f5bd8a242f',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
            "uuid": "7ef160f9-3cea-4c0a-83dd-879790f9f99f",
            "zwuuid": "368198df-d3c2-4e09-9b32-8f96f611fbe3",
            "deviceType": "hue_light-LCT001",
            "name": "Hue Lamp 3",
            "position": 2,
            "inSwitchAll": true,
            "inSwitchSchedule": false,
            "usageCapable": false,
            "currentState": 1,
            "rgbColor": "BE8537"
        }
      )
    }

    request(options, function(error, response, body) {
      if(error) {
        console.log('Posting Agreement failed.');
        console.log('error:', error); // Print the error if one occurred
        return error;
      }

      console.log('response: ' + response);
      console.log('body: ' + body);
    })
  };

  postLight();
});

app.get('/setLightOff', function(req, res) {

  // get the agreement here!

  var req = req;

  var postLight = function() {
    var options = {
      url: 'https://api.toonapi.com/toon/api/v1/devices/7ef160f9-3cea-4c0a-83dd-879790f9f99f',
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer 1e703bc6-2e6c-3775-9f43-d5f5bd8a242f',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
            "uuid": "7ef160f9-3cea-4c0a-83dd-879790f9f99f",
            "zwuuid": "368198df-d3c2-4e09-9b32-8f96f611fbe3",
            "deviceType": "hue_light-LCT001",
            "name": "Hue Lamp 3",
            "position": 2,
            "inSwitchAll": true,
            "inSwitchSchedule": false,
            "usageCapable": false,
            "currentState": 0,
            "rgbColor": "BE8537"
        }
      )
    }

    request(options, function(error, response, body) {
      if(error) {
        console.log('Posting Agreement failed.');
        console.log('error:', error); // Print the error if one occurred
        return error;
      }

      console.log('response: ' + response);
      console.log('body: ' + body);
    })
  };

  postLight();
});

// This is what we want to have in the end

// {
//   "topic": "sound_level",
//   "payload": {
//     "value": 46.6,
//     "unit": "dB"
//   },
//   "createdAt": "2017-05-17T11:24:17Z"
// }


app.listen(3000, function () {
  getAgreement();
  console.log('running!');
});
