import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT ? Number(process.env.GMAIL_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
};

const buildUpdateMessage = (event) => {
  const dateStr = event.date ? new Date(event.date).toLocaleString() : 'TBD';
  const location = event.location || 'TBD';
  const subject = `Update: ${event.name} — new date/time or location`;
  const text = `The event "${event.name}" has been updated.\n\nNew date/time: ${dateStr}\nLocation: ${location}\n\nPlease check the event page for details.`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111;">
      <p>The event <strong>${event.name}</strong> has been updated.</p>
      <p><strong>Date &amp; time:</strong> ${dateStr}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p style="margin-top:18px; color:#555;">Please check the event page for details.</p>
    </div>
  `;

  return { subject, text, html };
};

export const sendEventUpdateEmails = async (event, participantUsers = []) => {
  if (!participantUsers || participantUsers.length === 0) return { sent: 0, total: 0 };

  const transporter = createTransporter();
  const { subject, text, html } = buildUpdateMessage(event);

  const sendPromises = participantUsers.map((u) => {
    if (!u || !u.email) return Promise.resolve(null);
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: u.email,
      subject,
      text,
      html,
    };
    return transporter.sendMail(mailOptions).catch((err) => {
      console.error('Error sending update email to', u.email, err && err.message);
      return null;
    });
  });

  const results = await Promise.all(sendPromises);
  const sent = results.filter(Boolean).length;
  return { sent, total: participantUsers.length };
};
