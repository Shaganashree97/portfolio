const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Fix CORS: Allow requests from Vercel frontend
const corsOptions = {
  origin: "https://shaganashree-portfolio.vercel.app/contact", // ⬅️ Replace with your Vercel frontend URL
  methods: "GET,POST",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection with Error Handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit if failed to connect to MongoDB
});

// Define a schema for messages
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

// Nodemailer Configuration with Error Handling
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

// Root Route (Check if Backend is Running)
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running!");
});

// Route to handle form submissions
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save the message to the database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send an email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: process.env.EMAIL_TO, // Recipient email
      subject: 'New Message from Portfolio Contact Form', // Email subject
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h1>New Message from Portfolio Contact Form</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    
/*    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
*/
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});