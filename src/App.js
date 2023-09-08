import './App.css';
import { useState } from 'react'

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/api/transaction'; // Add '/api' to match your Express route
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Correct the header field name
      },
      body: JSON.stringify({ name, description, datetime }), // Send a valid JSON object
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        console.log('result', json);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <main>
      <h1>$400<span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" 
                  value={name}
                  onChange={ev => setName(ev.target.value)}
                  placeholder={'+200 nwe samsung tv'}/>
          <input type="datetime-local" 
                  value={datetime}
                  onChange={ev => setDatetime(ev.target.value)}/>
        </div>
        <div className="description">
          <input type="text" 
                  value={description}
                  onChange={ev => setDescription(ev.target.value)}
                  placeholder={'description'}/>
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">it was time for new tv</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Gig job new website</div>
            <div className="description">it was time for new tv</div>
          </div>
          <div className="right">
            <div className="price green">+$400</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Iphone</div>
            <div className="description">it was time for new tv</div>
          </div>
          <div className="right">
            <div className="price red">-$900</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
