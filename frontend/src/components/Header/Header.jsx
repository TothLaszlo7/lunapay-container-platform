import logo from "../../assets/images/logo/lunapay-logo-no-bg.png";
import styles from "./Header.module.css";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import { logout } from "../../services/authService";

function Header({ title }) {
  const navigate = useNavigate();

  async function handleLogout() {
  try {
    await logout();

    navigate("/login");
  } catch (error) {
    console.error(
      "Logout failed:",
      error
    );
  }
}

  return (
    <header className={styles["lp-header"]}>
      <div className={styles["lp-header__inner"]}>
        
        <Link
          className={styles["lp-brand"]}
          to="/dashboard"
        >
          <img
            className={styles["lp-brand__logo"]}
            src={logo}
            alt="LunaPay logo"
          />

          <span className={styles["lp-brand__name"]}>
            {title}
          </span>
        </Link>

        <nav className={styles["lp-nav"]}>
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/setup">
            Setup
          </NavLink>
        </nav>

        <div className={styles["lp-header__right"]}>
          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;