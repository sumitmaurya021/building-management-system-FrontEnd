import React, { useEffect, useState } from "react";
import axios from "axios";

function BuildingInfo() {
    const [buildings, setBuildings] = useState([]);
    useEffect(() => {
        const fetchBuildings = async () => {
          try {
            // Retrieve the access token from local storage
            const accessToken = localStorage.getItem("access_token");
            
            // Set headers with the access token
            const config = {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            };
    
            // Fetch buildings using the access token
            const response = await axios.get(
              "http://localhost:3000/api/v1/buildings",
              config
            );
    
            setBuildings(response.data.buildings);
          } catch (error) {
            console.error("Error fetching buildings:", error);
          }
        };
        fetchBuildings();
      }, []);
    
      return (
        <div>
          <div className="d-flex justify-content-end align-items-center gap-5 p-4 bg-black text-white">
            {buildings.map((building) => (
                <div key={building.id}>
                  <h5 className="p-0 m-0 font-monospace userlinecss">{building.building_name}</h5>
                </div>
                  ))}
              </div>
        </div>
      );
}

export default BuildingInfo
