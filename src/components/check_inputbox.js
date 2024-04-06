import React, { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';

function Checkinputbox() {
  const [checkNumbers, setCheckNumbers] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numbersArray = checkNumbers.split(',').map(num => num.trim());
  
      await Promise.all(
        numbersArray.map(async (num) => {
          const orderDocRef = doc(database, 'orders', num);
          const orderSnapshot = await getDoc(orderDocRef);
  
          if (orderSnapshot.exists()) {
            const orderData = orderSnapshot.data();
            await addDoc(collection(database, 'checks'), { ...orderData, id: num, received: true });
            setMessage(`Check with ID ${num} added successfully.`);
            await deleteDoc(orderDocRef);
          } else {
            setMessage(`Order with ID ${num} does not exist.`);
          }
        })
      );
  
    } catch (error) {
      setMessage('An error occurred while processing your request.');
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2 id='check-topic'>Insert Check Received</h2>
      <form onSubmit={handleSubmit}>
        <div className='checkInsertForm'>
          <label id='checkCont' htmlFor="inv_id">Check Numbers (comma-separated):</label><br />
          <input
            type="text"
            id="id"
            name="id"
            value={checkNumbers}
            onChange={(e) => setCheckNumbers(e.target.value)}
          /><br /><br />
        </div>
        <input id='checkinsertbut' type="submit" value="Submit" />
      </form>
      {message && <p style={{ color: "white" }}>{message}</p>}
    </div>
  );
}

export default Checkinputbox;
