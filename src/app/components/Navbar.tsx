import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../moduls/auth/AuthContext";

const NAV_LINKS = [
  { to: "/chat", label: "Chat" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const agentsActive = pathname.startsWith("/agents");

  // close when clicking outside
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // close after navigating
  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <span className="navbar-brand mb-0 h1">Smart Invoice Reader</span>

      <ul className="navbar-nav me-auto">
        {NAV_LINKS.map((link) => (
          <li className="nav-item" key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active fw-semibold" : "")
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}

        <li className="nav-item dropdown position-relative" ref={dropdownRef}>
          <a
            href="#"
            role="button"
            className={
              "nav-link dropdown-toggle" +
              (agentsActive ? " active fw-semibold" : "")
            }
            aria-expanded={open}
            onClick={(e) => {
              e.preventDefault();
              setOpen((o) => !o);
            }}
          >
            Agents
          </a>

          <ul
            className={"dropdown-menu" + (open ? " show" : "")}
            style={{ position: "absolute", top: "100%", left: 0 }}
          >
            <li>
              <NavLink end className="dropdown-item" to="/agents">
                All agents
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/agents/new">
                New agent
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>

      <button className="btn btn-outline-light btn-sm" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
