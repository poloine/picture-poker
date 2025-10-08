const verifyLink = `${process.env.BASE_URL}/auth/verify-email/${token}`;

const mjmlVerifyTemplate = `
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