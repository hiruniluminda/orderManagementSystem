import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [remindersOver, setOverReminders] = useState([]);


    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        checkReminders();
    }, [notifications]);

    function getUsers() {
        axios.get('http://localhost/api/order.php/')
            .then(response => {
                console.log(response.data);
                setNotifications(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    function checkReminders() {
        const currentDate = new Date();
        const remindersArray = [];
        const remindersoverArray = [];


        notifications.forEach(user => {
            const createdAtDate = new Date(user.created_at);
            const timeDiff = currentDate.getTime() - createdAtDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (daysDiff >= 25 && daysDiff < 30) {
                remindersArray.push({
                    inv_id: user.inv_id,
                    daysRemaining: 30 - daysDiff
                });
            }else if(daysDiff>=30){
                remindersoverArray.push({
                    inv_id: user.inv_id,
                });
            }
        });
    

        setReminders(remindersArray);
        setOverReminders(remindersoverArray);

    }

    return (
    <div className="notifications">
        <h5>Please get checks for invoices</h5>
        <ul>
            {reminders.map((reminder, index) => (
            <li key={index}>Invoice {reminder.inv_id} needs attention. {reminder.daysRemaining} days remaining.</li>
            ))}
            {remindersOver.map((reminder, index) => (
            <li key={index}>Invoice {reminder.inv_id} needs attention. Over.</li>
            ))}
        </ul>
    </div>
    );
}

export default Notification;
