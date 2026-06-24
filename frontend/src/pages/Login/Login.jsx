import "./Login.css";
import logo from "../../assets/images/logo/lunapay-logo-no-bg.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <img src={logo} alt="LunaPay logo" className="login-logo" />

      <button className="login-button" onClick={() => navigate("/login/email")}>
        Sign in with e-mail
      </button>

      <button className="login-button" disabled>
        Sign in with Apple (soon)
      </button>

      <button className="login-button" disabled>
        Sign in with Google (soon)
      </button>

      <button className="login-button" disabled>
        Sign up (soon)
      </button>
    </div>
  );
}