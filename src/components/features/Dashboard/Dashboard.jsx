// src/components/features/Dashboard/Dashboard.js

import React, { useState, useEffect, useRef } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import '../Dashboard/Dashboard.css';
import LoginPage from '../LoginPage/LoginPage';

const Dashboard = () => {
  const [rowData, setRowData] = useState([]);
  const [successData, setSuccessData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [jumpToPage, setJumpToPage] = useState(1);
  const gridApi = useRef(null);

  const handleLogin = (isLoggedIn) => {
    setLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchMissionData();
    }
  }, [loggedIn]);

  const fetchMissionData = () => {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
      .then((response) => response.json())
      .then((data) => {
        setRowData(data);
        const successCount = data.filter((mission) => mission.successful).length;
        const failureCount = data.length - successCount;
        setSuccessData([{ name: 'Success', value: successCount }, { name: 'Failure', value: failureCount }]);
      })
      .catch((error) => {
        console.error('Error fetching mission data:', error.message);
        // Optionally, you can set an error state or show an error message to the user.
      });
  };

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage, 10);
    if (isValidPage(page)) {
      gridApi.current.paginationGoToPage(page - 1);
    }
  };

  const isValidPage = (page) => page >= 1 && page <= getTotalPages();

  const getTotalPages = () => Math.ceil(rowData.length / 10);

  const onGridReady = (params) => {
    gridApi.current = params.api;
  };

  const columnDefs = [
    
    { headerName: 'Mission Name', field: 'mission' },
    { headerName: 'Launch Company', field: 'company' },
    { headerName: 'Location', field: 'location' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Time', field: 'time' },
    { headerName: 'Rocket Type', field: 'rocket' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Mission Outcome', field: 'successful' },
  ];

  const renderDashboardContent = () => (
    <>
      <h2>SpaceVue Dashboard</h2>
      <div className="jump-to-page-container">
        <label htmlFor="jumpToPage">Jump to Page:</label>
        <input
          type="number"
          id="jumpToPage"
          value={jumpToPage}
          onChange={(e) => setJumpToPage(e.target.value)}
          min="1"
          max={getTotalPages()}
        />
        <button onClick={handleJumpToPage}>Go</button>
      </div>
      <div className="data-and-chart-container">
        <div className="data-table-container">{renderGrid()}</div>
        <div className="bar-chart-container">{renderBarChart()}</div>
      </div>
    </>
  );

  const renderGrid = () => {
    if (rowData.length > 0) {
      // Add serial number to each row
      const dataWithSrNo = rowData.map((row, index) => ({ srNo: index + 1, ...row }));
  
      return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '87%' }}>
          <AgGridReact
            columnDefs={[{ headerName: 'Sr. No', field: 'srNo', width:70 }, ...columnDefs]}
            rowData={dataWithSrNo}
            pagination={true}
            paginationPageSize={10}
            onGridReady={onGridReady}
          />
        </div>
      );
    } else if (rowData.length === 0) {
      return <p>No rows to show</p>;
    } else {
      return <p>Loading...</p>;
    }
  };
  

  const renderBarChart = () => (
    <div className="card-container">
      <div className="bar-chart-container">
        <h3>Mission Success Proportion</h3>
        <BarChart width={400} height={400} data={successData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );

  return <div className="dashboard-container">{!loggedIn ? <LoginPage onLogin={handleLogin} /> : renderDashboardContent()}</div>;
};

export default Dashboard;
