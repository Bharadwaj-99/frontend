import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ selectedMonth, searchInput, page, setPage }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://backend-rox-1.onrender.com/api/transactions`, {
          params: { month: selectedMonth, search: searchInput, page, perPage: 10 }
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [selectedMonth, searchInput, page]);




  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold? 1 : 0}</td>
              <td><img height="100px" className="product-image" src={transaction.image} alt={transaction.title} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button className='prev' disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button className='next' disabled={transactions.length < 10} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
