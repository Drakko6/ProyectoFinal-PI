import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";

import logo from "../../assets/png/instaclone.png";
import "./Auth.scss";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container fluid className="auth">
      <Image src={logo} className="logo-inicio" />

      <div className="container-form">
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>

      <div className="change-form">
        <p>
          {showLogin ? (
            <>
              ¿No tienes una cuenta?
              <span onClick={() => setShowLogin(!showLogin)}> Regístrate</span>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?
              <br />
              <span onClick={() => setShowLogin(!showLogin)}>
                Iniciar Sesión
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
};

export default Auth;
