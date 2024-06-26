import BuildingInfo from './BuildingInfo'
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

function CreateWaterBill() {
  const [waterBill, setWaterBill] = useState({
    your_name: '',
    name: 'Water Bill',
    amount: '',
    start_date: '',
    end_date: '',
    remarks: ''
  });
  const [createdBill, setCreatedBill] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWaterBill({
      ...waterBill,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("access_token");
    const response = await fetch('http://localhost:3000/api/v1/buildings/1/water_bills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // Assuming accessToken is defined
      },
      body: JSON.stringify({ water_bill: waterBill })
    });
    const data = await response.json();
    if (response.ok) {
      setCreatedBill(data);
      setWaterBill({
        your_name: '',
        name: 'Water Bill',
        amount: '',
        start_date: '',
        end_date: '',
        remarks: ''
      });
    } else {
      console.error('Failed to create Water bill:', data.error);
    }
  };

  return (
    <div>
        <div>
            <BuildingInfo />
        <div className="createmaincss ms-5">
        <Typography variant="h6" gutterBottom>Create Water Bill</Typography>
        <TextField
          name="your_name"
          label="Your Name"
          value={waterBill.your_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="amount"
          label="Amount"
          type="number"
          value={waterBill.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="start_date"
          label="Start Date"
          type="date"
          value={waterBill.start_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="end_date"
          label="End Date"
          type="date"
          value={waterBill.end_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="remarks"
          label="Remarks"
          value={waterBill.remarks}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </div>
      {createdBill && (
        <div>
          <Typography variant="h6" gutterBottom>Water Bill Details</Typography>
          <Typography>Your Name: {createdBill.your_name}</Typography>
          <Typography>Name: {createdBill.name}</Typography>
          <Typography>Amount: {createdBill.amount}</Typography>
          <Typography>Start Date: {createdBill.start_date}</Typography>
          <Typography>End Date: {createdBill.end_date}</Typography>
          <Typography>Remarks: {createdBill.remarks}</Typography>
        </div>
      )}
    </div>
  </div>
  )
}

export default CreateWaterBill
