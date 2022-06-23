import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AiOutlineBank, AiOutlineHome, AiOutlineSend } from "react-icons/ai"
import { HiOutlineLogout } from "react-icons/hi"
import { IoAddOutline } from "react-icons/io5"

import "./Dashboard.scss"
import { Button } from '../../components/button/button'
import { useAuth } from '../../context/auth'

const items = [
  {
    name: "Özet",
    icon: (props) => <AiOutlineHome size={25} {...props} />,
    to: "/summary",
  },
  {
    name: "Hesaplarım",
    icon: (props) => <AiOutlineBank size={25} {...props} />,
    to: "/accounts",
  },
  {
    name: "Hesap Ekle",
    icon: (props) => <IoAddOutline size={25} {...props} />,
    to: "/add-bank-account",
  },
  {
    name: "Transfer Yap",
    icon: (props) => <AiOutlineSend size={25} {...props} />,
    to: "/send",
  }
]
export const Dashboard = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <ul>
          {items.map(({ name, icon, to }, index) => (
            <li key={to} >
              {icon({ ...location.pathname === to ? { color: '#3273D4' } : { color: "#8A94A5" } })}
              <NavLink activeClassName="dashboard__sidebar--active" to={to}>{name}</NavLink>
            </li>
          ))}
          <Button onClick={logout} color="secondary" className="dashboard__button">
            <HiOutlineLogout size={25} color="white" />
            Çıkış Yap
          </Button>

        </ul>
      </div>
      <div className="dashboard__content">
        {children}
      </div>
    </div>
  )
}
