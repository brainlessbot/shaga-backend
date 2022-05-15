import mongoose from 'mongoose';
import twilioApi from '../utils/twilio-api';
import sendGripApi from '../utils/sendgrip-api';

const {
  CONTACT_ALERTS_SERVICE = '',
  NEW_MESSAGE_RECEIVED_TEMPLATE = '',
  OWNER_PHONE,
  OWNER_EMAIL,
} = process.env;

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 64,
    required: true,
  },
  phone: {
    type: String,
    minlength: 8,
    maxlength: 16,
    required: true,
  },
  content: {
    type: String,
    maxLength: 4096,
  },
}, {
  timestamps: true,
});

messageSchema.post('save', (data) => {
  if (OWNER_PHONE) {
    twilioApi.messages.create({
      to: OWNER_PHONE,
      body: (
        `התקבלה הודעה חדשה מלקוח. שם: ${data.name}. טלפון: ${data.phone}. `
        + `${data.content ? 'הלקוח ציין פרטים נוספים שנשלחו אלייך במייל.' : ''}`
      ),
      messagingServiceSid: CONTACT_ALERTS_SERVICE,
    });
  }

  if (OWNER_EMAIL) {
    sendGripApi.send({
      to: OWNER_EMAIL,
      from: 'noreply@shaga.co.il',
      templateId: NEW_MESSAGE_RECEIVED_TEMPLATE,
      dynamicTemplateData: {
        name: data.name,
        phone: data.phone,
        content: data.content,
      },
    });
  }
});

export default mongoose.model('Message', messageSchema);
