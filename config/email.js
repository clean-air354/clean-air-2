// config/email.js

import sgMail from '@sendgrid/mail';

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text content.
 * @param {string} html - HTML content.
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL, // Your verified SendGrid sender email
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending error:', error.response ? error.response.body : error.message);
  }
};

export default sendEmail;
