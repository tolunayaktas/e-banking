import React from 'react';
import {useAuth} from "../../context/auth";
import {Redirect, Route} from "react-router-dom";

export const RestrictedRoute = ({ children, ...props }) => {
    const { user } = useAuth()
    return <Route {...props}
                  render={_ => {
                      if (user)
                          return <Redirect to='/' />;
                      return children;
                  }} />;
}
