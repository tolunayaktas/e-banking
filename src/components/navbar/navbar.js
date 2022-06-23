import React from 'react'
import { NavLink } from 'react-router-dom';
import "./navbar.scss";
import { useAuth } from "../../context/auth";

export const Navbar = () => {

  const { user } = useAuth();
  return (
    <nav className="navbar">
      <NavLink to={user ? user.role === "admin" ? '/admin' : '/summary' : '/login'}>{user ? user.role === "admin" ? 'Admin Panel' : 'İşlemler' : 'Giriş Yap'}</NavLink>

    </nav>
  )
}
