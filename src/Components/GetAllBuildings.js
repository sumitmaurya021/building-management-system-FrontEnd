import React, { useEffect, useState } from "react";
import axios from "axios";

function GetAllBuildings() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/buildings"
        );
        setBuildings(response.data.buildings);
        console.log(response.data.buildings);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    // Fetch buildings only once when the component mounts
    fetchBuildings();
  }, []);

  return (
    <div>
      <div>
        <h1>This is my all buildings</h1>
        <ul>
          {buildings.map((building) => (
            <li key={building.id}>
              <h2>Building Name: {building.building_name}</h2>
              <p>Building Address: {building.building_address}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GetAllBuildings;
