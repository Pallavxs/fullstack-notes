import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        type : 'OAuth2',
        user : process.env.GOOGLE_USER,
        clientId : process.env.GOOGLE_CLIENT,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        refreshToken : process.env.GOOGLE_REFRESH_TOKEN
    }
});

transporter.verify((err) => {
    if(err) {
        console.error('error connecting to email server',err);
    } else console.log('Email server is ready to connect with server')
})

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.GOOGLE_USER,
            to,
            subject,
            text,
            html 
        });

        console.log(`Message sent: %s ${info.messageId}`);
        console.log(`Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`);
    } catch (err) {
        console.error("Error sending email: ", err)
    }
}
export default sendEmail;