
import React, { useState } from 'react';
import TransactionsTable from './TransactionsTable';
import Statistics from './Statistics';
import BarChartComponent from './BarChartComponent';

const Transactions = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  function getCurrentMonth() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentDate = new Date();
    return monthNames[currentDate.getMonth()];
  }

  return (
    <div className='main'>
      <div className='container'>
        <h3>Transaction Dashboard</h3>
      </div>
      <div className='search-container'>
        <input 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
          className='input-element' 
          type="search" 
          placeholder='Search transaction' 
        />
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)} 
          className='dropdown-list'
        >
          {generateMonthOptions()}
        </select>
      </div>
      <TransactionsTable month={selectedMonth} search={searchInput} page={page} setPage={setPage} />
      <Statistics selectedMonth={selectedMonth} />
      <BarChartComponent selectedMonth={selectedMonth} />
    </div>
  );
};

function generateMonthOptions() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return monthNames.map((month, index) => (
    <option key={index} value={month}>{month}</option>
  ));
}

export default Transactions;
