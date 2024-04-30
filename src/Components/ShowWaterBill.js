import React, { useEffect, useState } from 'react'
import BuildingInfo from './BuildingInfo'
import axios from 'axios';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify'; 
const MotionPaper = motion(Paper);


function ShowWaterBill() {
  const [waterBills, setWaterBills] = useState([]);

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

        const response = await axios.get('http://localhost:3000/api/v1/buildings/1/water_bills', config);
        setWaterBills(response.data);
      } catch (error) {
        console.error('Error fetching water bills:', error);
      }
    }


    fetchBills();
      }, []);

  

  return (
    <div>
        <div>
            <BuildingInfo />
            <Container maxWidth="lg createmaincss">
              <h2 className='text-center mb-3'>Water Bills</h2>
        <Grid container spacing={3}>
          <AnimatePresence>
            {waterBills.map(bill => (
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
                    Amount: {bill.amount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Start Date: {bill.start_date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End Date: {bill.end_date}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Remarks: {bill.remarks}
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
        </div>
      
    </div>
  )
}

export default ShowWaterBill
