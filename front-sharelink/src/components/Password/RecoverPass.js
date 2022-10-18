import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useRecoverPass } from "../api";

const RecoverPass = () => {
  const [email, setEmail] = useState();

  const [status, , sendData] = useRecoverPass();

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData({ email });
  };
  console.log(status);
  // console.log(response);

  return (
    <div className="bg">
      <h2>
        <Link to={"/"}>X</Link>
      </h2>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Introduce tu email para recuperar la contraseña</p>
          <input
            name="name"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button>Enviar</button>
      </form>
      {status === "success" && <Navigate to="recover_newpassword" />}

      {status === "error" && (
        <p>Recuerda que todos los campos son obligatorios</p>
      )}
    </div>
  );
};

export default RecoverPass;
