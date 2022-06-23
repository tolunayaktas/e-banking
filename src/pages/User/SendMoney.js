import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Card } from '../../components/card/Card'
import { BsBoxArrowInLeft, BsBoxArrowInRight } from "react-icons/bs"
import { FaMoneyBillWave } from "react-icons/fa"
import { AiOutlineSend } from "react-icons/ai"
import NumberFormat from 'react-currency-format'
import "./SendMoney.scss"
import { useAuth } from '../../context/auth'
import { Select } from '../../components/select/Select'
import { Button } from "../../components/button/button";
export const SendMoney = () => {
    const { user, users, sendMoney } = useAuth()
    const [from, setFrom] = useState(user.selectedAccount?.IBAN)
    const [IBAN, setIBAN] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState()
    const [sendAccount, setSendAccount] = useState([])
    const [accountName, setAccountName] = useState("")
    const fromAccount = users.filter(item => item.accounts.find(value => value.IBAN === from))

    //useEffect(() => {

    //    //kendi hesabıma göndermemek için
    //    const foundAccount = users.filter(item => item.accounts.find(value => value.IBAN === IBAN) && item.email !== user.email)
    //    console.log(foundAccount)
    //    setSendAccount(foundAccount)


    //}, [IBAN])

    useEffect(() => {
        if (sendAccount.length > 0) {
            setAccountName(sendAccount[0].accounts.find(item => item.IBAN === IBAN).accountName)
        }
        else {
            setAccountName("")
        }
    }, [sendAccount])


    const send = (e) => {
        e.preventDefault()
        //gönderen, gönderilen miktar, açıklama, alıcı
        sendMoney(from, amount, description, IBAN)
    }
    return (
        <div className="send-money">
            {user.accounts.length > 0 ? (
                <div className="send-money__left-section">
                    <Card className="send-money__card">
                        <NumberFormat className="send-money__text send-money__money" value={user.selectedAccount.amount} displayType={'text'} thousandSeparator suffix={'TL'} />

                        <div className="send-money__content">
                            <AiOutlineSend size={25} color="#3273D4" />
                            <h1 className="send-money__title">Para Gönder</h1>
                        </div>

                    </Card>
                    <form className="send-money__form" onSubmit={send}>
                        <Card className="send-money__card">
                            <div className="send-money__card-title">
                                <BsBoxArrowInLeft color="#3273D4" size={25} />
                                <p>Gönderen </p>
                                <span> - </span>
                                <BsBoxArrowInRight color="#00B8DA" size={25} />
                                <p> Alıcı</p>
                            </div>
                            <div className="send-money__selects">
                                <Select value={from} onChange={(e) => setFrom(e.target.value)}>
                                    {user.accounts.map(item => (
                                        <option key={item.IBAN} value={item.IBAN}>{item.accountName}</option>
                                    ))}
                                </Select>
                                <input value={IBAN} onChange={(e) => setIBAN(e.target.value)} className="send-money__field" placeholder="IBAN giriniz" />
                            </div>
                            {sendAccount.length > 0 && accountName && (<div className="send-money__send-info"><p>Gönderilecek Hesap - {sendAccount[0].name} - {accountName}</p></div>)}
                        </Card>
                        <Card className="send-money__card send-money__input-card">
                            <div className="send-money__card-title">
                                <FaMoneyBillWave size={25} color="#0052CC" />
                                <p>Değer Giriniz</p>
                            </div>
                            <div className="send-money__inputs">
                                <input value={description} type="text" onChange={(e) => setDescription(e.target.value)} className="send-money__field send-money__amount-field" placeholder="Açıklama Girebilirsiniz" />
                                <CurrencyFormat value={amount} placeholder="Gönderilecek Tutar" thousandSeparator={true} suffix={"TL"} onValueChange={(values) => {
                                    if (parseInt(fromAccount[0].amount) > parseInt(values.value)) {
                                        alert("Daha düşük bir sayı giriniz")
                                    }
                                    else{
                                        setAmount(values.value)
                                    }
                                    

                                }} className="send-money__field send-money__amount-field" />
                            </div>

                        </Card>
                        <Button className="send-money__button" color="secondary" rounded type="submit">Gönder</Button>
                    </form>
                </div>
            ) : <p className="send-money__title">Para Transferi Yapabileceğiniz Bir Hesabınız Bulunmuyor</p>}
        </div>
    )
}
