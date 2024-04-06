import React, { useState, useEffect, useRef } from 'react';
import { database } from './firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';
import NavBarCom from './navbarcom';
import { Col, Row, Form, Button, Tabs, Tab, Modal, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useReactToPrint } from 'react-to-print';

function FirebaseFirestore() {
    const [foodCode, setFoodCode] = useState('');
    const [foodName, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const value = collection(database, 'priceList');

    const componentPDF = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(value);
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setItems(data);
        };
        fetchData();

        const unsubscribe = onSnapshot(value, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setItems(data);
        });

        return () => unsubscribe();
    }, []);

    const handleCreate = async () => {
        await addDoc(value, { foodCode, foodName, price });
        setFoodCode('');
        setFoodName('');
        setPrice('');
        setShowCreateModal(false);
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(database, 'priceList', id));
    };

    const handleEdit = (id, foodCode, foodName, price) => {
        setFoodCode(foodCode);
        setFoodName(foodName);
        setPrice(price);
        setId(id);
        setShow(true);
    };

    const handleUpdate = async () => {
        const updateData = doc(database, 'priceList', id);
        await updateDoc(updateData, {
            foodCode: foodCode,
            foodName: foodName,
            price: price
        });
        setShow(false);
        setFoodCode('');
        setFoodName('');
        setPrice('');
    };

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
                        <Tab eventKey="home" title="Latest Prices">
                            <div className='inv-dashing'>
                                <div className="App">
                                    <div className='container'>
                                        <div ref={componentPDF} style={{width:'100%'}}>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Food Code</th>
                                                    <th>Food Name</th>
                                                    <th>Price</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map(item =>
                                                    <tr key={item.id}>
                                                        <td>{item.foodCode}</td>
                                                        <td>{item.foodName}</td>
                                                        <td>{item.price}</td>
                                                        <td>
                                                            <Button className='dangre' onClick={() => handleDelete(item.id)}>Delete</Button>
                                                            <Button className='primer' onClick={() => handleEdit(item.id, item.foodCode, item.foodName, item.price)}>Edit</Button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}><Button className='printbtnx' onClick={() => setShowCreateModal(true)}><AddBoxIcon />&nbsp;&nbsp;Add</Button></Col>
                                <Col xs={5}></Col>
                                <Col xs={1}>
                                    <Button className='printbtn' onClick={generatePDF}><LocalPrintshopIcon />&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </div>

            {/* Create Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Food Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formFoodCode">
                            <Form.Label>Food Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter food code" value={foodCode} onChange={(e) => setFoodCode(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFoodName">
                            <Form.Label>Food Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Food Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formFoodCode">
                            <Form.Label>Food Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter food code" value={foodCode} onChange={(e) => setFoodCode(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFoodName">
                            <Form.Label>Food Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FirebaseFirestore;


