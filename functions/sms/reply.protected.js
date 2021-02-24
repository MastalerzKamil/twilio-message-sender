const request = require('request-promise-native')

exports.handler = function(context, event, callback) {
  const { ACCOUNT_SID, AUTH_TOKEN, SEND_SMS_FROM, SEND_SMS_TO } = process.env;

  const twiml = new Twilio.twiml.MessagingResponse();
  // twiml.message(`Source number: ${SEND_SMS_FROM}`);

  request.post({
    url: `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
    json: true,
    'auth': {
      'user': ACCOUNT_SID,
      'pass': AUTH_TOKEN
    },
    form: {
      From: SEND_SMS_FROM,
      To: SEND_SMS_TO,
      Body: `Remember about dinner`
    }
  })
  .then((data) => {
    console.log(`Message successfully sent to ${SEND_SMS_TO}`);
    callback(null, true);
  })
  .catch((err) => {
    console.log(err);
    return callback(err);
  });

  callback(null, twiml);
};
