/* import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import MyVerticallyCenteredModal from './show.js';
import { Link } from 'react-router-dom';

export default function ListUser() {
    const [modalShow, setModalShow] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/api/users/').then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }
    const deleteUser = (id) => {
        axios.delete(`http://localhost/api/user/${id}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        });
    }

    return (
        <div>
            <h1>List Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>invoice_id</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.inv_id}</td>
                            <td>
                                <Button variant="primary" onClick={() => setModalShow(user.inv_id)}>Launch modal with grid</Button>
                                <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} inv_id={modalShow} />
        </div>
    )
}
 */