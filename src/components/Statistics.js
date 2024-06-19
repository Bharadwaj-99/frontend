import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const response = await axios.get(`https://backend-rox-1.onrender.com/api/statistics?month=${selectedMonth}`);
        
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    getStatistics();
  }, [selectedMonth]);

  return (
    <div className='main-stat-wrapper'>
      <h2>Statistics - {selectedMonth}</h2>
      <div className='stat-wrapper' >
        <div className='element'><span>Total Sale Amount:</span> <span>{statistics.totalSaleAmount}</span></div>
        <div className='element'><span>Total Sold Items:</span> <span>{statistics.soldItems}</span></div>
        <div className='element'><span>Total Not Sold Items:</span> <span>{statistics.notSoldItems}</span></div>
      </div>
    </div>
  );
};

export default Statistics;

