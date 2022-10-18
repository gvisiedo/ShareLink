import { useState } from "react";
import { useRecoverNewPass } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";

const RecoverNewPass = () => {
  const [recover_code, setRecover_code] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [status, response, sendData] = useRecoverNewPass();

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData({ recover_code, newPassword });
  };

  return (
    <div className="bg">
      <form onSubmit={handleSubmit}>
        <p>Se te ha enviado un código a tu correo</p>
        <input
          value={recover_code}
          onChange={(e) => setRecover_code(e.target.value)}
          placeholder="Pega aquí tu código"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Introduce tu nueva contraseña"
        />
        <button>Recuperar</button>
        {status === "success" && (
          <MessageStatus
            titel="¡Felicidaes!"
            message="Tu contraseña ha sido actualizada
        correctamente, ya te puedes logear"
            navigate="/login"
          />
        )}
        {response?.code === 400 && (
          <p className="error">
            Debes completar todos los campos. Recuerda poner una contraseña
            entre 6-20 caracteres sin espacios
          </p>
        )}
        {response?.code === 404 && (
          <p className="error">Tu código no es válido</p>
        )}
      </form>
    </div>
  );
};

export default RecoverNewPass;
