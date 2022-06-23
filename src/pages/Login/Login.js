import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import "./Login.scss"

export const Login = () => {

    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const { login, error, removeError} = useAuth()
    const handleSubmit = (e) => {
        e.preventDefault();
        login(values.email, values.password)

    }

    useEffect(() => {
        return () => {
            removeError()
        }
    },[])
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    return (
        <div className="login">
            <div className="login__container">
            <p className="login__title">Hoşgeldiniz!</p>
            <p className="login__text">Giriş yapmak için bilgilerinizi giriniz.</p>
            <form className="form" onSubmit={handleSubmit}>
                <input onChange={onChange} name="email" required className="form__item" type="email" placeholder="E-posta" autoComplete="on" id="email"/>
                <input onChange={onChange} name="password" required className="form__item" type="password" placeholder="Şifre"/>
                <button className="form__button" type="submit">Giriş Yap</button>
                {error && <p className="form__error">Lütfen Bilgilerinizi Kontrol Ediniz</p>}
            </form>
            </div>
        </div>
    )
}
