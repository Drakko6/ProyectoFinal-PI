import React, { useEffect, useState } from "react";
import "./Confirmation.scss";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CONFIRM_USER } from "../../gql/user";
import { useHistory } from "react-router-dom";

export default function Confirmation() {
  const { token } = useParams();

  const history = useHistory();

  const [confirmUser] = useMutation(CONFIRM_USER);

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    async function confirmar() {
      try {
        await confirmUser({
          variables: {
            token,
          },
        });
        setConfirm(true);
      } catch (error) {
        console.error(error);
      }
    }
    confirmar();
  }, []);

  if (!confirm) return null;

  const goToHome = () => {
    history.push("/");
    window.location.reload(true);
  };

  return (
    <div className="confirmation">
      <p>Tu cuenta se ha confirmado</p>
      <p onClick={() => goToHome()}>Ir a iniciar sesión</p>
    </div>
  );
}
