import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((data) => setTransactions(data));
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/api/transactions'; 
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/api/transaction'; 
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price, name:name.substring(price.length+1), description, datetime }), // Send a valid JSON object
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        console.log('result', json);
        setName('');
        setDatetime('');
        setDescription('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  let balance = 0;
  for (const transaction of transactions){
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
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
        {transactions.length > 0 && transactions.map(transaction => (
         <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price " +(transaction.price<0?'red':'green')}>{transaction.price}</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
         </div>         
        ))}
      </div>
    </main>
  );
}

export default App;
