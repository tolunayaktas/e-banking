import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [error, setError] = useState(null)
    let history = useHistory()

    useEffect(() => {

        localStorage.setItem("users", JSON.stringify(users))
    }, [users])

    useEffect(() => {
        if (user) {
            setUsers(prevState => {
                return prevState.map(item => {
                    if (item.id === user.id) {
                        return user
                    }
                    return item;
                })
            }

            )
            localStorage.setItem("user", JSON.stringify(user))
        }
    }, [user])
    useEffect(() => {
        if (user?.selectedAccount) {
            switchAccount(user.selectedAccount.IBAN)
        }
    }, [user?.accounts])
    const login = (email, password) => {

        const isAdmin = checkAdmin(email)
        if (isAdmin) {
            history.push("/admin")
            return;
        }
        const user = users.find(user => user.email === email && user.password === password)
        if (user) {
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))
            history.push("/")
        }
        else {
            setError(true)
        }
    }

    const checkAdmin = (email) => {
        if (email === "admin@gmail.com") {
            const admin = {
                email: "admin@gmail.com",
                password: "admin",
                role: "admin"
            }
            setUser(admin)
            localStorage.setItem("user", JSON.stringify(admin))
            return true;
        }

        return false;
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }
    const addUser = (user) => {
        setUsers([...users, user])

        history.push("/admin")
    }

    const deleteUser = (deletedIndex) => {
        const arr = users.filter((user, index) => index !== deletedIndex)
        setUsers(arr)

    }

    const addBankAccount = (name, amount) => {
        const newValues = {
            IBAN: generateIBAN(),
            accountName: name,
            amount,
            createdDate: new Date(),
            transactions: []
        }

        setUser(prevState => {

            const newUser = {
                ...prevState,
                accounts: [...prevState.accounts, newValues],
                ...prevState.accounts.length <= 0 && { selectedAccount: newValues }
            }
            localStorage.setItem("user", JSON.stringify(newUser))
            return newUser
        })


        history.push("/accounts")
    }

    const switchAccount = (iban) => {
        setUser(prevState => ({
            ...prevState,
            selectedAccount: user.accounts.find(item => item?.IBAN === iban)
        })
        )
    }
    const generateIBAN = () => {
        let arr = []
        Array.from(Array(24).keys()).map(() => {
            arr.push(Math.floor((Math.random() * 10)))
        })
        return `TR${arr.join("")}`
    }


    const sendMoney = (from, amount, desc, to) => {
        setUser(prevState => ({
            ...prevState,

            accounts: user.accounts.map(item => {
                if (item.IBAN === from) {
                    return {
                        ...item,
                        amount: parseInt(item.amount) - parseInt(amount),
                        transactions: [...item.transactions, {
                            toAccount: to,
                            amount,
                            desc,
                            transactionDate: new Date()

                        }]
                    }
                }
                return item;
            }),

        })
        )

        switchAccount(user.selectedAccount.IBAN)
        setUsers(prevState => {
            return prevState.map(item => {
                return {
                    ...item,
                    accounts: item.accounts.map(value => {

                        if (value.IBAN === to) {
                            return {
                                ...value,
                                amount: parseInt(value.amount) + parseInt(amount),
                                transactions: [...value.transactions, {
                                    fromAccount: from,
                                    amount,
                                    desc,
                                    transactionDate: new Date()
                                }]
                            }
                        }

                        return value;
                    })
                }
            })
        })

        history.push("/summary")

    }
    const removeError = () => {
        setError(false)
    }

    return (
        <AuthContext.Provider value={{ users, login, user, addUser, logout, deleteUser, error, removeError, addBankAccount, switchAccount, sendMoney }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}