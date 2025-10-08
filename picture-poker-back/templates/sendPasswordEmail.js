const resetLink = `${process.env.BASE_URL}/auth/reset-password/${token}`;

const mjmlSendPasswordTemplate = `
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