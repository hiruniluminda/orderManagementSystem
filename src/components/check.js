import React, { useState, useEffect } from 'react';
import NavBarCom from './navbarcom';
import { Form, Button, Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkinputbox from './check_inputbox';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';

function Check() {
    const [checks, setChecks] = useState([]);

    useEffect(() => {
        fetchChecks();
    }, []);

    const fetchChecks = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, 'checks'));
            const checksData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setChecks(checksData);
        } catch (error) {
            console.error('Error fetching checks:', error);
        }
    };

    const handleDeleteCheck = async (checkId) => {
        try {
            await deleteDoc(doc(database, 'checks', checkId));
            fetchChecks();
        } catch (error) {
            console.error('Error deleting check:', error);
        }
    };

    const handleAddCheck = async (orderSnapshot, num) => {
        try {
            if (orderSnapshot.exists()) {
                const orderData = orderSnapshot.data();
                await addDoc(collection(database, 'checks'), { ...orderData, inv_id: num, received: true });
                fetchChecks();
                return `Check with ID ${num} added successfully.`;
            } else {
                return `Order with ID ${num} does not exist.`;
            }
        } catch (error) {
            console.error('Error adding check:', error);
            return 'An error occurred while processing your request.';
        }
    };

    return (
        <>
            <NavBarCom />
            <div className="dashb-body">
                <div className="searchingbar">
                    <div className="searching">
                        <Form.Control type="text" placeholder="Search" />
                    </div>
                    <div id="searching-btn">
                        <Button className='submitingbtn' type="submit">Search</Button>
                    </div>
                </div>

                <div className="dashing-section">
                    <Tabs variant="pills" defaultActiveKey="home" className="mb-3" fill>
                        <Tab eventKey="home" title="Received Check List">
                            <div className='inv-dashing'>
                                <Checkinputbox onAddCheck={handleAddCheck} onDeleteCheck={handleDeleteCheck} />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Check;
