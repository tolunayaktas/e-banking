import React from 'react'
import "./layout.scss"
import AddUser from "../../assets/icons/AddUser";
import {Link} from "react-router-dom";
import Users from "../../assets/icons/Users";
import Logout from "../../assets/icons/Logout";
import { useAuth } from '../../context/auth';
export const AdminLayout = ({children}) => {

    const {logout} = useAuth()
    return (
        <div className="admin-layout">
         <div className="sidebar">
             <ul>
                <div>
                <li>
                     <Users color="#9FA2B4"/>
                     <Link to="/admin">Kullanıcı Listesi</Link>
                 </li>
                 <li>
                     <AddUser color="#9FA2B4"/>
                     <Link to="/admin/create-user">Kullanıcı Tanımla</Link>
                 </li>
                </div>
                 <li>
                     <Logout color="#9FA2B4"/>
                     <Link to="/#" onClick={logout}>Çıkış Yap</Link>
                 </li>
             </ul>
         </div>
            <div className="admin-layout__content">
                {children}
            </div>
        </div>
    );
};
