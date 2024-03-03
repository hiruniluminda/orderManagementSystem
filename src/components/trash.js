import { useEffect, useState } from 'react';
import NavBarCom from './navbarcom';
import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import "./dashboard.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import RestoreIcon from '@mui/icons-material/Restore';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import MyVerticallyCenteredModal from './show';

function Trash() {
    const [modalShow, setModalShow] = useState(false);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers();
    }, []);

    /* get users data from order.php file */
    function getUsers() {
        axios.get('http://localhost/api/trash/trash.php').then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }
    /* delete users data from order.php file using id */
    const deleteUser = (id) => {
        axios.delete(`http://localhost/api/trash/trash.php/${id}/delete`).then(response =>{
            console.log(response.data);
            getUsers();
        });
    }

    const MyTable = () => (
        <div style={{ maxHeight: "350px", overflowY: "auto" }}> 
            
            <Table striped bordered hover> 
                <thead style={{position: "sticky", top: "0", backgroundColor: "#22f0f0" }}> 
                    <tr> 
                        <th className="table-header-bg">Invoice ID</th> 
                        <th className="table-header-bg">Name</th> 
                        <th className="table-header-bg">Email</th>
                        <th className="table-header-bg">Mobile</th>
                        <th className="table-header-bg">Launch</th>
                        <th className="table-header-bg">Edit</th>
                        <th className="table-header-bg">Delete</th>
                        
                    </tr> 
                </thead> 
                <tbody> 
                   
                    {users.map((row) => ( 
                        <tr key={row.id}> 
                            <td>{row.inv_id}</td> 
                            <td>{row.name}</td> 
                            <td>{row.email}</td>
                            <td>{row.mobile}</td> 
                            <td>
                                <Button variant="primary" onClick={() => setModalShow(row.inv_id)}>Launch modal with grid</Button>
                                <Link to={`/check_received/${row.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button onClick={() => deleteUser(row.id)}>Delete</button>

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
                                <Col xs={4}><Button className='printbtnx'><AddBoxIcon/>&nbsp;&nbsp;Add</Button></Col>
                                <Col xs={5}></Col>
                                <Col xs={1}>
                                <Button className='printbtn'><LocalPrintshopIcon/>&nbsp;&nbsp;Print</Button>
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