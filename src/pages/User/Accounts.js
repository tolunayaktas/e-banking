import React from 'react'
import "./Accounts.scss"
import { Card } from '../../components/card/Card'
import { useAuth } from '../../context/auth'
import NumberFormat from 'react-currency-format'
import { MdContentCopy } from "react-icons/md"
import { HiSwitchHorizontal } from "react-icons/hi"
import CopyToClipboard from 'react-copy-to-clipboard'
export const Accounts = () => {
    const { user, switchAccount } = useAuth()

    const copy = () => {
        alert("IBAN Kopyalandı")
    }
    return (
        <div className="accounts">
            {user.accounts.length > 0 ? (
                <Card className="accounts__card">
                    <table className="accounts-table">
                        <thead>
                            <tr>
                                <th>Oluşturulma Tarihi</th>
                                <th>IBAN</th>
                                <th>Hesap İsmi</th>
                                <th>Hesap Bakiyesi</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="accounts-table__spacing-body">
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                        <tbody className="accounts-table__body">
                            {user.accounts.map(item => (
                                <tr key={item?.createdDate}>
                                    <td>{new Date(item?.createdDate)?.toLocaleString()}</td>
                                    <td>
                                        {item?.IBAN}
                                        <CopyToClipboard onCopy={copy} text={item?.IBAN}>
                                            <MdContentCopy className="accounts-table__copy-icon" color="#3273D4" />
                                        </CopyToClipboard>
                                    </td>
                                    <td>{item?.accountName}</td>
                                    <td><NumberFormat value={item?.amount} displayType={'text'} thousandSeparator suffix={'TL'} /></td>
                                    <td>{user?.accounts?.find(item => item?.IBAN !== user?.selectedAccount?.IBAN) ? <HiSwitchHorizontal size={32} color="#3273D4" onClick={() => {
                                        alert("Hesap Değiştirildi")
                                        switchAccount(item?.IBAN)
                                    }}>Değiştir</HiSwitchHorizontal> : <div />}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </Card>
            ) : <div></div>}
        </div>
    )
}
