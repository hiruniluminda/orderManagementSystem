import { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import MyVerticallyCenteredModal from './show';


/*dashboard section*/
function Dashboard() {
    const [modalShow, setModalShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);


    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getUsers1();
    }, []);

    /* get users data from order.php file */
    function getUsers() {
        axios.get('http://localhost/api/order.php/').then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }
    /* delete users data from order.php file using id */
    const deleteUser = (id) => {
        axios.delete(`http://localhost/api/order.php/${id}/delete`).then(response =>{
            console.log(response.data);
            getUsers();
        });
    }
    /* get users data from check_received_display.php file */
    function getUsers1() {
        axios.get('http://localhost/api/notcheckToCheck/check_received_display.php/').then(response => {
                console.log(response.data);
                setUsers1(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }
    /* delete users data from check_received_display.php file using id */
    const deleteUser1 = (id) => {
        axios.delete(`http://localhost/api/notcheckToCheck/check_received_display.php/${id}/delete`).then(response =>{
            console.log(response.data);
            getUsers();
        });
    };
    /*delete and transfer notcheck to trash */
    const handleDeleteNotCheck = async (orderId) => {
        try {
          const response = await fetch('http://localhost/api/delete/deleteNotCheck.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              accept_button: 'true',
              order_id: orderId,
            }),
          });            getUsers();
        } catch (error) {
        }
      };

    /*delete and transfer check to trash */
      const handleDeleteCheck = async (orderId) => {
        try {
          const response = await fetch('http://localhost/api/delete/deleteCheck.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              accept_button: 'true',
              order_id: orderId,
            }),
          });            getUsers();
        } catch (error) {
        }
      };
    
    
/*create table and put data into the table in not_check_received section */
    const MyTable = () => (
        <div style={{maxHeight: "350px", overflowY: "auto"}}> 
            
            <Table striped bordered hover responsive variant="dark" > 
                <thead style={{position: "sticky", top: "0", backgroundColor: "#22f0f0" }}> 
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
                            <td>
                                <Button  className='addingmarginmore' variant="primary" onClick={() => setModalShow(user.inv_id)}>More</Button>
                                <Link to={`/check_received/${user.id}/edit`} className='addingmargin' style={{marginRight: "10px"}}>Edit</Link>
                                <button className='addingmarginxy' onClick={() => handleDeleteNotCheck(user.inv_id)}>Delete</button>

                            </td>
                        </tr>
                    )}
                </tbody>

            </Table> 
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} inv_id={modalShow} />

        </div> 
    );

/*create table and put data into the table in check_received section */
    const MyTable2 = () => (
        <div style={{maxHeight: "350px", overflowY: "auto"}}> 
            
            <Table striped bordered hover responsive variant="dark" > 
                <thead style={{position: "sticky", top: "0", backgroundColor: "#22f0f0" }}> 
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
                    {users1.map((user, key) =>
                        <tr className='tablerow' key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.inv_id}</td>
                            <td>
                                <Button className='addingmarginmore' variant="primary" onClick={() => setModalShow(user.inv_id)}>More</Button>
                                <Link to={`/check_received/${user.id}/edit`} className='addingmargin' style={{marginRight: "10px"}}>Edit</Link>
                                <button className='addingmarginxy' onClick={() => handleDeleteCheck(user.inv_id)}>Delete</button>

                            </td>
                        </tr>
                    )}
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
                        {/*tab1 section */}
                    <Tabs variant="pills" defaultActiveKey="profile" className="mb-3" fill>
                        <Tab eventKey="home" title="Check Received">
                            <div className='inv-dashing'>
                                <MyTable2 />{/* call MyTable2 function */}
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}>Total : </Col>
                                <Col xs={5}>01</Col>
                                <Col xs={1}>
                                    <Button className='printbtn'><LocalPrintshopIcon />&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                       
                        {/*tab2 section */}
                        <Tab eventKey="profile" title="Not Check Received">
                        <div className='inv-dashing'>
                                <MyTable />{/* call MyTable function */}
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}>Total : </Col>
                                <Col xs={5}>01</Col>
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

export default Dashboard;
