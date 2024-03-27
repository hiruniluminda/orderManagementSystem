import React, { useEffect, useState } from 'react';
import NavBarCom from './navbarcom';
import { Col, Row, Form, Button, Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import MyVerticallyCenteredModal from './show';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { database } from './firebaseConfig';
import { Link } from 'react-router-dom';
import { addDoc, getDoc } from 'firebase/firestore';
import Checkinputbox from './check_inputbox';

function Dashboard() {
    const [modalShow, setModalShow] = useState(false);
    const [orders, setOrders] = useState([]);
    const [checks, setChecks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filteredChecks, setFilteredChecks] = useState([]);

    useEffect(() => {
        fetchOrders();
        fetchChecks();
    }, []);

    const fetchOrders = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, 'orders'));
            const ordersData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setOrders(ordersData);
            setFilteredOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchChecks = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, 'checks'));
            const checksData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setChecks(checksData);
            setFilteredChecks(checksData);
        } catch (error) {
            console.error('Error fetching checks:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        const userDocRef = doc(database, 'orders', orderId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            await addDoc(collection(database, 'trash'), userData);
            await deleteDoc(userDocRef);
            fetchOrders();
        }
    };

    const handleDeleteCheck = async (checkId) => {
        const userDocRef = doc(database, 'checks', checkId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            await addDoc(collection(database, 'trash'), userData);
            await deleteDoc(userDocRef);
            fetchChecks();
        }
    };

    const handleSearch = () => {
        // Filter orders based on search query
        const filteredOrders = orders.filter(order =>
            (order.name && order.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (order.email && order.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (order.mobile && order.mobile.includes(searchQuery))
        );
    
        // Filter checks based on search query
        const filteredChecks = checks.filter(check =>
            // Assuming you have similar fields in your check data
            (check.some_field && check.some_field.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    
        setFilteredOrders(filteredOrders);
        setFilteredChecks(filteredChecks);
    };
    

    const MyTable = ({ data, handleDelete }) => (
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Invoice ID</th>
                        <th>Data Handling Options</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td>{item.inv_id}</td>
                            <td>
                                <Button variant="primary" onClick={() => setModalShow(item.inv_id)}>More</Button>
                                <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} inv_id={modalShow} />
        </div>
    );

    return (
        <>
            <NavBarCom />
            <div className="dashb-body">
                <div className="searchingbar">
                    <div className="searching">
                        <Form.Control type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                    </div>
                    <div id="searching-btn">
                        <Button className='submitingbtn' type="submit" onClick={handleSearch}>Search</Button>
                    </div>
                </div>

                <div className="dashing-section">
                    <Tabs variant="pills" defaultActiveKey="home" className="mb-3" fill>
                        <Tab eventKey="home" title="Check Received">
                            <div className='inv-dashing'>
                                <MyTable data={filteredChecks} handleDelete={handleDeleteCheck} />
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Not Check Received">
                            <div className='inv-dashing'>
                                <MyTable data={filteredOrders} handleDelete={handleDeleteOrder} />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
