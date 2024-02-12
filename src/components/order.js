import { useState } from 'react';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Order() {
    const rows = [ 
        { invoiceid: 1, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>}, 
        { invoiceid: 2, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 3, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 4, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 5, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 6, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 7, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 8, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 9, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 10, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 11, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
        { invoiceid: 12, dued: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>, accept: <CheckCircleIcon/>},
         

    ];

    const MyTable = () => (
        <div style={{ maxHeight: "350px", overflowY: "auto" }}> 
            
            <Table striped bordered hover> 
                <thead style={{position: "sticky", top: "0", backgroundColor: "#22f0f0" }}> 
                    <tr> 
                        <th className="table-header-bg">Invoice ID</th> 
                        <th className="table-header-bg">Due Date</th> 
                        <th className="table-header-bg">Amount(Rs.)</th>
                        <th className="table-header-bg">Current Date</th>
                        <th className="table-header-bg">Delivery Date</th>
                        <th className="table-header-bg">More</th>
                        <th className="table-header-bg">Accept</th>
                        
                    </tr> 
                </thead> 
                <tbody> 
                   
                    {rows.map((row) => ( 
                        <tr key={row.id}> 
                            <td>{row.invoiceid}</td> 
                            <td>{row.dued}</td> 
                            <td>{row.amount}</td>
                            <td>{row.curdate}</td> 
                            <td>{row.deldate}</td> 
                            <td>{row.more}</td>
                            <td>{row.accept}</td> 
                        </tr> 
                    ))} 
                </tbody> 
            </Table> 
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

export default Order;