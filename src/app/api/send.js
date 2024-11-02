// pages/api/send.js

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;

    // Configure transporter with your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aswincs37@gmail.com", // Replace with your email
        pass: "your-app-password",    // Replace with an app-specific password
      },
    });

    const mailOptions = {
      from: email,
      to: "aswincs37@gmail.com",       // The email you want to send messages to
      subject: `New message from ${email}: ${subject}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
