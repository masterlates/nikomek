const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.94545e001@smtp-brevo.com

,
    pass: process.env.mLD9WACy5UO7NGc8,
  },
});

app.post('/sendAcceptanceEmail', async (req, res) => {
  const { email, studentName, masterName } = req.body;

  if (!email || !studentName || !masterName) {
    return res.status(400).send({ message: "Missing parameters" });
  }

  try {
    await transporter.sendMail({
      from: `"Master FSSSG" <${process.env.BREVO_USER}>`,
      to: email,
      subject: "نتيجة قبول الماجستير",
      html: `
        <p>مرحبًا ${studentName},</p>
        <p>تهانينا! تم قبولك في الماجستير: <b>${masterName}</b>.</p>
        <p>لأي استفسار يمكنك الرد على هذا البريد.</p>
        <p>مع تحيات فريق master-fsssg</p>
      `,
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
