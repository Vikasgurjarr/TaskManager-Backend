const twilio = require('twilio');
const PhoneNumber = require('libphonenumber-js');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.SMS_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendSMS = async (phoneNumber, body) => {
  try {
    const formattedPhoneNumber = PhoneNumber.parsePhoneNumberFromString(phoneNumber, 'IN').formatInternational();
    console.log(`Sending SMS to ${formattedPhoneNumber}: ${body}`);
    
    const message = await client.messages.create({
      body,
      to: formattedPhoneNumber,
      from: '+17623376897'
    });
    
    console.log(`SMS sent to ${formattedPhoneNumber}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}: ${error.message}`);
    throw error;
  }
};

module.exports = sendSMS;
