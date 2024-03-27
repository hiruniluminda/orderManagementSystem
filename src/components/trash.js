import { useEffect, useState } from 'react';
import NavBarCom from './navbarcom';
import { Col, Button, Row, Form } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import MyVerticallyCenteredModal from './show';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { database } from './firebaseConfig';

function Trash() {
    const [modalShow, setModalShow] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersCollection = collection(database, 'trash');
            const usersSnapshot = await getDocs(usersCollection);
            const usersData = usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const userDocRef = doc(database, 'trash', userId);
            await deleteDoc(userDocRef);
            fetchUsers(); // Refresh
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const MyTable = () => (
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            <Table striped bordered hover variant="dark">
                <thead style={{ position: "sticky", top: "0", backgroundColor: "#22f0f0" }}>
                    <tr>
                        <th className="table-header-bg">Id</th>
                        <th className="table-header-bg">Name</th>
                        <th className="table-header-bg">Email</th>
                        <th className="table-header-bg">Mobile</th>
                        <th className="table-header-bg">Invoice ID</th>
                        <th className="table-header-bg">Data Handling Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((row) => (
                        <tr className='tablerow' key={row.id}>
                            <td>{row.inv_id}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.mobile}</td>
                            <td>{row.inv_id}</td>
                            <td>
                                <Button className='addingmarginmore' variant="primary" onClick={() => setModalShow(row.inv_id)}>More</Button>
                                <button className='addingmarginxy' onClick={() => handleDelete(row.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
                        <Tab eventKey="home" title="Trashed Invoices">
                            <div className='inv-dashing'>
                                <MyTable />
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}><Button className='printbtnx'><AddBoxIcon />&nbsp;&nbsp;Add</Button></Col>
                                <Col xs={5}></Col>
                                <Col xs={1}>
                                    <Button className='printbtn'><LocalPrintshopIcon />&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Trash;
