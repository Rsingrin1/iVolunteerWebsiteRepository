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
      from: `iVolunteer <${process.env.GMAIL_USER}>`,
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

const buildCancellationMessage = (event) => {
  const dateStr = event.date ? new Date(event.date).toLocaleString() : 'TBD';
  const location = event.location || 'TBD';
  const subject = `Cancellation: ${event.name} has been cancelled`;
  const text = `The event "${event.name}" scheduled for ${dateStr} at ${location} has been cancelled.\n\n`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111;">
      <p>The event <strong>${event.name}</strong> scheduled for <strong>${dateStr}</strong> at <strong>${location}</strong> has been <strong>cancelled</strong>.</p>
      <p style="margin-top:12px; color:#555;">We apologize for the inconvenience. Please contact the organizer if you have questions.</p>
    </div>
  `;

  return { subject, text, html };
};

export const sendEventCancellationEmails = async (event, participantUsers = []) => {
  if (!participantUsers || participantUsers.length === 0) return { sent: 0, total: 0 };

  const transporter = createTransporter();
  const { subject, text, html } = buildCancellationMessage(event);

  const sendPromises = participantUsers.map((u) => {
    if (!u || !u.email) return Promise.resolve(null);
    const mailOptions = {
      from: `iVolunteer <${process.env.GMAIL_USER}>`,
      to: u.email,
      subject,
      text,
      html,
    };
    return transporter.sendMail(mailOptions).catch((err) => {
      console.error('Error sending cancellation email to', u.email, err && err.message);
      return null;
    });
  });

  const results = await Promise.all(sendPromises);
  const sent = results.filter(Boolean).length;
  return { sent, total: participantUsers.length };
};

export const sendCustomMessageEmails = async (event, participantUsers = [], message = '') => {
  if (!participantUsers || participantUsers.length === 0) return { sent: 0, total: 0 };

  const transporter = createTransporter();
  const subject = `Important Update: ${event.name}`;
  const text = message || `Important update regarding ${event.name}.`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111;">
      <p>${message ? message.replace(/\n/g, '<br/>') : `Important update regarding <strong>${event.name}</strong>.`}</p>
    </div>
  `;

  const sendPromises = participantUsers.map((u) => {
    if (!u || !u.email) return Promise.resolve(null);
    const mailOptions = {
      from: `iVolunteer <${process.env.GMAIL_USER}>`,
      to: u.email,
      subject,
      text,
      html,
    };
    return transporter.sendMail(mailOptions).catch((err) => {
      console.error('Error sending custom email to', u.email, err && err.message);
      return null;
    });
  });

  const results = await Promise.all(sendPromises);
  const sent = results.filter(Boolean).length;
  return { sent, total: participantUsers.length };
};
