import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import routes from "../routes/routes";
import { logout } from "../services/authenticate.service";
import clsx from "clsx";
import logo from "../images/logo-web.png";
import { BiLogOut } from "react-icons/bi";

export default function Layout() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };
  const [toggle, setToggle] = useState(false);

  const responsiveBreakpoint = 991;
  const toggleMenu = () => {
    if (window.innerWidth <= responsiveBreakpoint) {
      setToggle(!toggle);
    }
    setToggle(!toggle);
  };

  return (
    <div className={clsx("page-wrapper", toggle && "nav-closed")}>
      <header className="header">
        <div className="header-logo">
          <svg
            className="site-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M512 256a15 15 0 00-7.1-12.8l-52-32 52-32.5a15 15 0 000-25.4L264 2.3c-4.8-3-11-3-15.9 0L7 153.3a15 15 0 000 25.4L58.9 211 7.1 243.3a15 15 0 000 25.4L58.8 301 7.1 333.3a15 15 0 000 25.4l241 151a15 15 0 0015.9 0l241-151a15 15 0 00-.1-25.5l-52-32 52-32.5A15 15 0 00512 256zM43.3 166L256 32.7 468.7 166 256 298.3 43.3 166zM468.6 346L256 479.3 43.3 346l43.9-27.4L248 418.7a15 15 0 0015.8 0L424.4 319l44.2 27.2zM256 388.3L43.3 256l43.9-27.4L248 328.7a15 15 0 0015.8 0L424.4 229l44.1 27.2L256 388.3z" />
          </svg>
          <span className="site-title">Stock Manager</span>
        </div>
        <div className="header-search">
          <button className="button-menu" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 385 385">
              <path d="M12 120.3h361a12 12 0 000-24H12a12 12 0 000 24zM373 180.5H12a12 12 0 000 24h361a12 12 0 000-24zM373 264.7H132.2a12 12 0 000 24H373a12 12 0 000-24z" />
            </svg>
          </button>
          <input type="search" placeholder="Search....." />
        </div>
      </header>
      <section className="main">
        <nav className="sidebar">
          {/* business log */}
          <div className="business-logo">
            <img src={logo} alt="" />
          </div>
          <ul>
            {routes.map(({ path, name, icon }) => {
              return (
                <li key={name}>
                  <Link to={path}>
                    <span className="icon mx-2">{icon}</span>
                    {name}
                  </Link>
                </li>
              );
            })}
            <li className="">
              <button onClick={handleClick} className="btn btn-default">
               <span className="icon mx-2"><BiLogOut /></span>
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className="page-content">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
