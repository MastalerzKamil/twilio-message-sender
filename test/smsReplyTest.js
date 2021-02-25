const helpers = require('../test-helper');
const sendMessage = require('../functions/reply.protected').handler;
const Twilio = require('twilio');

const context = {
  MY_PHONE_NUMBER: process.env.SEND_SMS_FROM
};
const event = {
  Body: {
      Message: 'Remember about dinner',
      DestPhoneNumber: "+48532390966"
  }
};

beforeAll(() => {
  helpers.setup(context);
});

afterAll(() => {
  helpers.teardown();
});

test('returns a MessagingResponse', done => {
  const callback = (err, result) => {
    expect(result).toBeInstanceOf(Twilio.twiml.MessagingResponse);
    done();
  };

  sendMessage(context, event, callback);
});

test('forwards the message to the number from the context', done => {
  const callback = (err, result) => {
    expect(result.toString()).toMatch('to="' + context.MY_PHONE_NUMBER + '"');
    done();
  };

  sendMessage(context, event, callback);
});

test('includes the original From number and Body', done => {
  const callback = (err, result) => {
    expect(result.toString()).toMatch(
      '>From: ' + event.From + '. Body: ' + event.Body + '<'
    );
    done();
  };

  sendMessage(context, event, callback);
});