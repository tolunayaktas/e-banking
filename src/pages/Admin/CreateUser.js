import React, {useState} from 'react'
import "./CreateUser.scss"
import {Button} from "../../components/button/button";
import {useAuth} from "../../context/auth";

export const CreateUser = () => {

const { addUser } = useAuth();
    const [values, setValues] = useState({
        email:'',
        password:'',
        name:''
    })

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
        id: "id" + Math.random().toString(16).slice(2),
        email: values.email,
        password: values.password,
        name: values.name,
        role: "user",
        createdDate: new Date(),
        accounts: []
    };
    addUser(user);
}
  return (
    <div className="add-user">
        <form className="form" onSubmit={handleSubmit}>
            <input onChange={onChange}  name="email" required className="form__item" type="email" placeholder="E-posta" id="email"/>
            <input onChange={onChange}  name="name" required className="form__item" type="text" placeholder="İsim"/>
            <input onChange={onChange}  name="password" required className="form__item" type="password" placeholder="Şifre"/>
            <Button className="form__button" type="submit">Kullanıcı Tanımla</Button>
        </form>
    </div>
  );
};
