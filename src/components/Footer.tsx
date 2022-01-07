import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "rgb(0, 99, 220)" : ""
                };
              }}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "rgb(0, 99, 220)" : ""
                };
              }}
              to="/products"
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
      <p>© 2022 Company, Inc</p>
    </footer>
  );
}
