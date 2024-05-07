import { createTransport } from 'nodemailer'

const sendEmail = async ({ to, subject, text }) => {
    // const transporter = mailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     auth: {
    //         user: process.env.SMTP_MAIL,
    //         pass: process.env.SMTP_PASSWORD,
    //     },
    //     service: process.env.SMTP_SERVICE,
    // })
    const transporter = createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER, //webdevformailing
            pass: process.env.MAILTRAP_PASSWORD // webdev@mailing6
        },
    })
    await transporter.sendMail({ from: process.env.SMTP_MAIL, to, text, subject })
}

export default sendEmail