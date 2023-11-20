import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
export default function Settings() {
    const location = useLocation();
  
  return (
    <div>
      <nav>
            <Link to={location.pathname + '/userSettings'}>userSettings</Link>
      </nav>

        <Outlet />
    </div>
  )
}
