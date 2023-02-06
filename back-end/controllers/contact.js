const nodemailer = require('nodemailer');
// Benny Rempel
// benny9@ethereal.email
// 1UXqrrjgbWkfuEcrC8

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'benny9@ethereal.email',
        pass: '1UXqrrjgbWkfuEcrC8'
    }
});

const controller = {
    sendEmail: async(req, res) => {
        const { to, from, subject, text } = req.body;
        try {
          await transporter.sendMail({
            from,
            to,
            subject,
            text
          });
          res.sendStatus(200);
        } catch (error) {
          console.error(error);
          res.sendStatus(500);
        }

    }
}

module.exports = controller;