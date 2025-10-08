import nodemailer from "nodemailer";
import mjml2html from "mjml";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
});

export const sendVerificationEmail = async (user, token) => {
    const { html } = mjml2html(mjmlVerifyTemplate);

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: "Vérification de votre email - Picture Poker",
        html,
    });
};

export const sendPasswordResetEmail = async (user, token) => {
    const { html } = mjml2html(mjmlSendPasswordTemplate);

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: "Réinitialisation de votre mot de passe - Picture Poker",
        html,
    });
};