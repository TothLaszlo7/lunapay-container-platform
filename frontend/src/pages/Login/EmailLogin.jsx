import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService.js";
import "./Login.css";
import logo from "../../assets/images/logo/lunapay-logo-no-bg.png";

export default function EmailLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleEmailLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Give me your e-mail and your password!");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Log in failed");
    }
  }

  return (
    <div className="login-container">
      <img src={logo} alt="LunaPay logo" className="login-logo" />

      <form onSubmit={handleEmailLogin} className="login-form">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button className="login-button" type="submit">
          Sign in with e-mail
        </button>

        {error && <p className="login-error">{error}</p>}
      </form>

      <button className="login-button" onClick={() => navigate("/login")}>
        Back
      </button>
    </div>
  );
}