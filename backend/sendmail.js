import nodemailer from 'nodemailer';

const sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anandkumarch2003@gmail.com',
      pass: 'vflygthaahwxrkfl', 
    },
  });

  const mailOptions = {
    from: 'anandkumarch2003@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Email sent:");
    }
  });
};

export default sendEmail;