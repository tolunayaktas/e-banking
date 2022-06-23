import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Button } from '../../components/button/button'
import { Card } from '../../components/card/Card'
import { useAuth } from '../../context/auth'
import "./AddBankAccount.scss"
export const AddBankAccount = () => {
    const { addBankAccount } = useAuth()

    const [values, setValues] = useState({
        accountName: '',
    })
    const [amount, setAmount] = useState()
    const submit = (e) => {
        e.preventDefault()
        addBankAccount(values.accountName, amount)
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <div className="add-bank-account">
            <Card >
                <form onSubmit={submit}>
                    <input name="accountName" onChange={onChange} className="add-bank-account__field" placeholder="Hesap İsmi Giriniz" />
                    <CurrencyFormat value={amount} placeholder="Başlangıç Bakiye Değeri" thousandSeparator={true} suffix={"TL"} onValueChange={(values) => {
                        setAmount(values.value)
                    }} className="add-bank-account__field" />
                    <Button type="submit" className="add-bank-account__button" color="secondary" rounded>Hesap Ekle</Button>
                </form>
            </Card>
        </div>
    )
}
