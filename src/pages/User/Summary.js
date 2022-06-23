import React, { useState } from 'react'
import "./Summary.scss"
import { useAuth } from '../../context/auth'
import { Card } from "../../components/card/Card"
import { BsBank } from "react-icons/bs"
import NumberFormat from 'react-currency-format'
import CopyToClipboard from 'react-copy-to-clipboard'
import { MdContentCopy } from "react-icons/md"
import { Select } from '../../components/select/Select'

export const Summary = () => {

  const { user, switchAccount } = useAuth()
  const [value, setValue] = useState(user.selectedAccount?.IBAN)


  return (
    <div className="summary">
      <h1 className="summary__title">Hoş geldin, {user.name}</h1>
      <p className="summary__text">Bu arayüzü kullanarak gerekli işlemleri yapabilirsin</p>
      {user.selectedAccount ? (
        <div className="summary__container">
          <div className="summary__card-container">
            <Card className="summary__card">
              <p className="summary__text">Mevcut Bakiye</p>
              <div className="summary__card-inner">
                <BsBank size={32} color="#3273D4" />
                <h1><NumberFormat value={user.selectedAccount.amount} displayType={'text'} thousandSeparator suffix={'TL'} /></h1>
              </div>
              <div className="summary__card-inner">
                <span className="summary__text">IBAN: {user.selectedAccount.IBAN}</span>
                <CopyToClipboard onCopy={() => alert("Kopyalandı")} text={user.selectedAccount.IBAN}>
                  <MdContentCopy size={18} className="summary__copy-icon" color="#3273D4" />
                </CopyToClipboard>
              </div>
              <div className="summary__card-inner">
                <span className="summary__text">Hesap İsmi: {user.selectedAccount.accountName}</span>
              </div>
            </Card>
            <Card className="summary__card">
              <p className="summary__text">Hesap Değiştir</p>
              <Select className="summary__select" value={value} onChange={(event) => {
                setValue(event.target.value)
                switchAccount(event.target.value)
              }}>

                {user?.accounts?.map(item => <option key={item?.IBAN} value={item?.IBAN}>{item?.accountName}</option>)}

              </Select>
            </Card>
          </div>

          <div>
            <Card className="table-card">
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>IBAN</th>
                    <th>Açıklama</th>
                    <th>İşlem Tarihi</th>
                    <th>Miktar</th>
                  </tr>
                </thead>
                <tbody className="summary-table__body">
                  {user.selectedAccount.transactions.map((item, index) => (
                    <tr key={index} >
                      <td>{item.fromAccount ? item.fromAccount : item.toAccount}</td>
                      <td>{item.desc}</td>
                      <td>{new Date(item.transactionDate)?.toLocaleString()}</td>
                      <td style={{ color: item.toAccount ? "red" : "green" }}>{item.toAccount ? "-" : "+"} <NumberFormat value={item.amount} displayType={'text'} thousandSeparator suffix={'TL'} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      ) : <p className="summary__text">Tanımlı Bir Hesabınız Bulunmuyor</p>}
    </div>
  )
}
