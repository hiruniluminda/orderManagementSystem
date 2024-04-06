import React, { useEffect, useState, useRef } from 'react';
import NavBarCom from './navbarcom';
import { Col, Row, Form, Button, Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import MyVerticallyCenteredModal from './show';
import { collection, getDocs, deleteDoc, doc, addDoc, getDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';
import { useReactToPrint } from 'react-to-print';

function Order() {
    const [modalShow, setModalShow] = useState(false);
    const [users, setUsers] = useState([]);
    const componentPDF = useRef();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const usersCollection = collection(database, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUsers(usersData);
    };
    
    const handleDeleteUser = async (userId) => {
        const userDocRef = doc(database, 'users', userId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            await addDoc(collection(database, 'trash'), userData);
            await deleteDoc(userDocRef);
            fetchUsers();
        }
    };

    const handleAcceptUser = async (userId) => {
        const userDocRef = doc(database, 'users', userId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            await addDoc(collection(database, 'orders'), userData);
            await deleteDoc(userDocRef);
            fetchUsers();
        }
    };
    
    const generatePDF = useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Price List"
    });

    const MyTable = () => (
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            <div ref={componentPDF} style={{width:'100%'}}>
            <Table striped bordered hover variant="dark">
                <thead style={{ position: "sticky", top: "0", backgroundColor: "#22f0f0" }}>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>invoice_id</th>
                        <th>Data Handling Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                        <tr className='tablerow' key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.inv_id}</td>
                            <td id='orderBtnview'>
                                <Button className='addingmarginmore' variant="primary" onClick={() => setModalShow(user.inv_id)}>More</Button>
                                <br/>
                                <Link to={`/user/${user.id}/edit`} className='addingmargin' style={{ marginRight: "5px" }}>Edit</Link>
                                <br/>
                                <button className='addingmarginy' onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                <br/>
                                <button className='addingmarginz' onClick={() => handleAcceptUser(user.id)}>Accept</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} inv_id={modalShow} />
        </div>
    );

    return (
        <>
            <NavBarCom />
            <div className="dashb-body">
                <div className="searchingbar">
                    <div className="searching">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                    <div id="searching-btn">
                        <Button className='submitingbtn' type="submit">Search</Button>
                    </div>
                </div>

                <div className="dashing-section">
                    <Tabs variant="pills" defaultActiveKey="home" className="mb-3" fill>
                        <Tab eventKey="home" title="Pending Invoices">
                            <div className='inv-dashing'>
                                <MyTable />
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}><Link to="user/create" id='createbutton'>Create User</Link></Col>
                                <Col xs={5}></Col>
                                <Col xs={1}>
                                    <Button className='printbtn' onClick={generatePDF}><LocalPrintshopIcon />&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Order;
