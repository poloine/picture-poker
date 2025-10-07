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
    const verifyLink = `${process.env.BASE_URL}/auth/verify-email/${token}`;

    const mjmlTemplate = `
  <mjml>
    <mj-body background-color="#f5f5f5">
      <mj-section>
        <mj-column>
          <mj-text font-size="20px" align="center" color="#333">
            🎴 Bienvenue sur Picture Poker !
          </mj-text>
          <mj-text align="center" color="#555">
            Bonjour ${user.username},<br/>
            Merci de vous être inscrit ! Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail :
          </mj-text>
          <mj-button background-color="#007bff" color="white" href="${verifyLink}">
            Vérifier mon email
          </mj-button>
          <mj-text align="center" color="#999" font-size="12px">
            Si vous n'avez pas créé de compte, ignorez simplement cet email.
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `;

    const { html } = mjml2html(mjmlTemplate);

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: "Vérification de votre email - Picture Poker",
        html,
    });
};

export const sendPasswordResetEmail = async (user, token) => {
    const resetLink = `${process.env.BASE_URL}/auth/reset-password/${token}`;

    const mjmlTemplate = `
  <mjml>
    <mj-body background-color="#f5f5f5">
      <mj-section>
        <mj-column>
          <mj-text font-size="20px" align="center">🔑 Réinitialisation du mot de passe</mj-text>
          <mj-text align="center" color="#555">
            Bonjour ${user.username},<br/>
            Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :
          </mj-text>
          <mj-button background-color="#28a745" color="white" href="${resetLink}">
            Réinitialiser mon mot de passe
          </mj-button>
          <mj-text align="center" color="#999" font-size="12px">
            Ce lien expire dans 1 heure.
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `;

    const { html } = mjml2html(mjmlTemplate);

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: "Réinitialisation de votre mot de passe - Picture Poker",
        html,
    });
};