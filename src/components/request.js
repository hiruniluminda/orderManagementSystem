import React, { useEffect, useState, useRef } from 'react';
import NavBarCom from './navbarcom';
import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./dashboard.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Contact } from './contact';
import { useReactToPrint } from 'react-to-print';

function Request() {
    const componentPDF = useRef();
    const generatePDF = useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Price List"
    });
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
                        <Tab eventKey="home" title="Request Sending">
                            <div className='inv-dashing'>
                            <div ref={componentPDF} style={{width:'100%',backgroundColor:'black'}}>
                            <Contact />
                            </div>
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}><Button className='printbtnx'><AddBoxIcon/>&nbsp;&nbsp;Add</Button></Col>
                                <Col xs={5}></Col>
                                <Col xs={1}>
                                <Button className='printbtn' onClick={generatePDF}><LocalPrintshopIcon/>&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Request;