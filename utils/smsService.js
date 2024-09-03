const twilio = require('twilio');
const PhoneNumber = require('libphonenumber-js');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_SMS_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const sendSMS = async (phoneNumber, body) => {
  try {
    const parsedPhoneNumber = PhoneNumber.parsePhoneNumberFromString(phoneNumber, 'IN');
    if (!parsedPhoneNumber) {
      throw new Error('Invalid phone number');
    }
    const formattedPhoneNumber = parsedPhoneNumber.formatInternational();
    console.log(`Sending SMS to ${formattedPhoneNumber}: ${body}`);
    
    const message = await client.messages.create({
      body,
      to: formattedPhoneNumber,
      from: '+17623376897'  // Ensure this number is a Twilio verified number
    });
    
    console.log(`SMS sent to ${formattedPhoneNumber}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}: ${error.message}`);
    throw error;
  }
};

module.exports = sendSMS;
