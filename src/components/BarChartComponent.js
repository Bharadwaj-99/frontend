import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const BarChartComponent = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState([]);

 
  const monthNameToNumber = (name) => {
    return monthNames.indexOf(name);
  };

  useEffect(() => {
    const getBarChartData = async () => {
      try {
        
        const monthNumber = monthNameToNumber(selectedMonth);
        const response = await axios.get(`https://backend-rox-1.onrender.com/api/bar-chart?month=${monthNumber}`);
        setBarChartData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    getBarChartData();
  }, [selectedMonth]);

  const dataFormatter = (number) => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`;
    }
    return number.toString();
  };

  return (
    <div className='barchart-container'>
      <h2>Bar Chart Stats - {selectedMonth}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData} margin={{ top: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="range"
            tick={{ stroke: 'gray', strokeWidth: 1 }}
          />
          <YAxis
            tickFormatter={dataFormatter}
            tick={{ stroke: 'gray', strokeWidth: 1 }}
          />
          <Legend wrapperStyle={{ padding: 30 }} />
          <Bar dataKey="count" name="Number of Items" fill="#37807e" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;


