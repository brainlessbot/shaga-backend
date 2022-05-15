import twilio from 'twilio';

const { TWILIO_SID = '', TWILIO_TOKEN = '' } = process.env;

export default twilio(TWILIO_SID, TWILIO_TOKEN);
