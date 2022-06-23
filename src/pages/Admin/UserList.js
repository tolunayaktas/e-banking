import React from 'react'
import "./UserList.scss"
import { useAuth } from "../../context/auth";
import Delete from "../../assets/icons/Delete"
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const substractMinutes = (date, minutes) => {
    return new Date(date.setMinutes(date.getMinutes() - minutes))
}

const lessThanOneHourAgo = (date) => {
    const HOUR = 1000 * 60 * 60;
    const anHourAgo = Date.now() - HOUR;
    return Date.parse(date) > anHourAgo
}


export const UserList = () => {

    const { users, deleteUser } = useAuth();

    const options = {
        responsive: true,
        maintainAspecRatio: false,
        scales: {
            y: {
                min: 0,
                max: 30,
                stepSize: 2
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Son 1 saat içinde oluşturulan kullanıcı sayısı',
            },
        }
    };

    const data = {
        //son 1 saat içinde oluşturulan kullanıcı sayısı
        labels: [...Array(2)].map((_, index) => substractMinutes(new Date(), index * 60).toLocaleTimeString()).reverse(),
        datasets: [
            {
                data: [0, users.filter(item => lessThanOneHourAgo(item.createdDate)).length],
                label: 'Dataset 1',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (

        <div className="user-list">

            <div className="user-list__chart">
                <Line options={options} data={data} />
            </div>
            {
                users.length > 0 ? (

                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Oluşturulma Tarihi</th>
                                <th>İsim</th>
                                <th>E-mail</th>
                                <th>Şifre</th>
                               
                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{new Date(user.createdDate).toLocaleString()}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    
                                    <td><Delete onClick={() => deleteUser(index)} className="user-table__delete" color="red" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                ) : <p className="user-list__text">
                    Tanımlı herhangi bir kullanıcı bulunmuyor.
                </p>
            }
        </div>
    );
};
