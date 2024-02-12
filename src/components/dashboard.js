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
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Dashboard() {
    const rows = [ 
        { id: 1, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 2, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 3, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 4, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 5, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 6, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 7, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 8, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 9, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 10, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 11, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 12, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 

    ];
    const rows2 = [ 
        { id: 1, desc: "balwik", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 2, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 3, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 4, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 5, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 6, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 7, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 8, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 9, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 10, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 11, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 
        { id: 12, desc: "John", amount: 30, curdate: "10/02/2024",deldate: "11/02/2024",more: <AddToHomeScreenIcon/>}, 

    ];

    const MyTable = () => (
        <div style={{ maxHeight: "350px", overflowY: "auto" }}> 
            
            <Table striped bordered hover> 
                <thead style={{position: "sticky", top: "0", backgroundColor: "#22f0f0" }}> 
                    <tr> 
                        <th className="table-header-bg">Invoice ID</th> 
                        <th className="table-header-bg">Description</th> 
                        <th className="table-header-bg">Amount(Rs.)</th>
                        <th className="table-header-bg">Current Date</th>
                        <th className="table-header-bg">Delivery Date</th>
                        <th className="table-header-bg">More</th>
                    </tr> 
                </thead> 
                <tbody> 
                   
                    {rows.map((row) => ( 
                        <tr key={row.id}> 
                            <td>{row.id}</td> 
                            <td>{row.desc}</td> 
                            <td>{row.amount}</td>
                            <td>{row.curdate}</td> 
                            <td>{row.deldate}</td> 
                            <td>{row.more}</td> 
                        </tr> 
                    ))} 
                </tbody> 
            </Table> 
        </div> 
    );

    const MyTable2 = () => (
        <div style={{ maxHeight: "350px", overflowY: "auto" }}> 
            
            <Table striped bordered hover> 
                <thead style={{ position: "sticky", top: "0" }}> 
                    <tr> 
                        <th className="table-header-bg">Invoice ID</th> 
                        <th className="table-header-bg">Description</th> 
                        <th className="table-header-bg">Amount(Rs.)</th>
                        <th className="table-header-bg">Current Date</th>
                        <th className="table-header-bg">Delivery Date</th>
                        <th className="table-header-bg">More</th>
                    </tr> 
                </thead> 
                <tbody> 
                   
                    {rows2.map((row) => ( 
                        <tr key={row.id}> 
                            <td>{row.id}</td> 
                            <td>{row.desc}</td> 
                            <td>{row.amount}</td>
                            <td>{row.curdate}</td> 
                            <td>{row.deldate}</td> 
                            <td>{row.more}</td> 
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
                    <Tabs variant="pills" defaultActiveKey="profile" className="mb-3" fill>
                        <Tab eventKey="home" title="Check Received">
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
                       
                        {/*tab2 section */}
                       
                        <Tab eventKey="profile" title="Not Check Receive">
                        <div className='inv-dashing'>
                                <MyTable2 />
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
