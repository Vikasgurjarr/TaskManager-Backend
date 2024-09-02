const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure:true,
  port:465,
  auth: {
    user: process.env.USER_EMAIL,  
    pass: process.env.EMAIL_PASSWORD,   
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'vikasdogne3@gmail.com',  // Your Gmail address
    to,
    subject,
    text,
  };

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};

module.exports = { sendEmail };
