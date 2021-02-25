const helpers = require('../test-helper');
const sendMessage = require('../functions/sms/reply.protected').handler;
const Twilio = require('twilio');

const context = {
  MY_PHONE_NUMBER: process.env.SEND_SMS_FROM
};
const event = {
  body: {
    DestPhoneNumber: "+48532390966",
    Message: 'Remember about dinner'
  }
};

beforeAll(() => {
  helpers.setup(context);
});

afterAll(() => {
  helpers.teardown();
});

describe('Messages sending', () => {
  it('should return a JSON with correct body and 201', done => {
    const callback = (err, result) => {
      expect(result.statusCode === 201).toBe(true)
      done();
    };

    sendMessage(context, event, callback);
  });
});