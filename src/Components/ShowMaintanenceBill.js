import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography } from '@mui/material';
import BuildingInfo from './BuildingInfo';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify'; //

const MotionPaper = motion(Paper);

function ShowMaintenanceBill() {
  const [bills, setBills] = useState([]);
  
  useEffect(() => {
    const fetchBills = async () => {
      try {
        // Retrieve access token from local storage
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
          console.error('Access token not found in local storage');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };

        const response = await axios.get('http://localhost:3000/api/v1/buildings/1/maintenance_bills', config);

        setBills(response.data);
      } catch (error) {
        console.error('Error fetching maintenance bills:', error);
      }
    };
    fetchBills();
  }, []);

  return (
    <div>
      <div>
        <BuildingInfo />
      </div>
      <Container maxWidth="lg createmaincss">
        <h2 className='text-center mb-3'>Maintenance Bills</h2>
        <Grid container spacing={3}>
          <AnimatePresence>
            {bills.map(bill => (
              <Grid item xs={12} sm={6} md={4} key={bill.id}>
                <MotionPaper className="p-2"  
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h6" gutterBottom>
                    {bill.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Amount: ₹{bill.amount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Start Date: {bill.start_date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End Date: {bill.end_date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Remarks: {bill.remarks}
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </div>
  );
}

export default ShowMaintenanceBill;
