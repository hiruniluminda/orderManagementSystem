import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

export default function Notification(props) {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        if (Array.isArray(props.inv_id)) {
            props.inv_id.forEach((invId) => {
                getReminders(invId);
            });
        } else {
            getReminders(props.inv_id);
        }
    }, [props.inv_id]);
    

    function getReminders(inv_id) {
        axios.get(`http://localhost/api/notcheckToCheck/notification?inv_id=${props.inv_id}`)
        .then(response => {
                console.log("Response data:", response.data); // Check response data in console
                if (Array.isArray(response.data)) {
                    setReminders(response.data); // Only set reminders if response data is an array
                } else {
                    console.error('Invalid response data:', response.data);
                    setReminders([]); // Set reminders to an empty array on invalid data
                }
            })
            .catch(error => {
                console.error('Error fetching reminders:', error);
                setReminders([]); // Set reminders to an empty array on error
            });
    }

    console.log("Reminders:", reminders); // Log reminders state

    return (
        <div>
            {/* Loop through reminders and display each item */}
            {reminders.length > 0 ? (
                reminders.map((reminder, index) => (
                    <div key={index}>
                        <p>Invoice Number: {reminder.inv_id}</p>
                        <p>Remaining Days: {reminder.remaining_days}</p>
                    </div>
                ))
            ) : (
                <p>No reminders to display</p>
            )}
        </div>
    );
}
