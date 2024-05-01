import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import Home from '../assets/home-solid.svg';
import Team from '../assets/social.svg';
import Calender from '../assets/sceduled.svg';
import Projects from '../assets/starred.svg';
import Documents from '../assets/draft.svg';
import PowerOff from '../assets/power-off-solid.svg';

const Container = styled.div`
  position: fixed;
`;

const Button = styled.button`
  background-color: var(--black);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    content: '';
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? '1.5' : '1rem')};
    transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
  }

  &::after {
    top: ${(props) => (props.clicked ? '1.2' : '1.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
  }
`;

const SidebarContainer = styled.div`
  background-color: var(--black);
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Logo = styled.div`
  width: 2rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
  padding: 2rem 0;
  position: absolute;
  top: 6rem;
  left: 0;
  width: ${(props) => (props.clicked ? '12rem' : '3.5rem')};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg) brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? '100%' : '0')};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? '1.5rem' : '0')};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? '14rem' : '3rem')};
  height: 3rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? '9rem' : '0')};
  background-color: var(--black);
  color: var(--white);
  transition: all 0.3s ease;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;

  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg) brightness(100%) contrast(126%);
    transition: all 0.3s ease;

    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;

function Sidebar() {
  const [click, setClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setLoggedIn(!!accessToken);
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        toast.error('Access token not found.');
        return;
      }

      // Set authorization headers with the access token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      // Make the POST request to logout
      const response = await axios.post('http://localhost:3000/api/v1/logout', null, config);

      // Check response status
      if (response.status === 200) {
        // Remove access token from local storage
        localStorage.removeItem('access_token');
        toast.success('Logged out successfully');
        setLoggedIn(false); // Hide sidebar
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle unexpected response
        toast.error('An error occurred while logging out. Please try again later.');
      }
    } catch (error) {
      console.error('Error while logging out:', error);
      toast.error('An error occurred while logging out. Please try again later.');
    }
  };

  const handleClick = () => {
    setProfileClick(!profileClick);
    setClick(false); // Close the menu items when profile is clicked
  };

  return (
    <Container>
      {/* Sidebar content */}
      {loggedIn && (
        <>
          <Button clicked={click} onClick={() => setClick(!click)}>
            Click
          </Button>
          <SidebarContainer>
            {/* Sidebar items */}
            <SlickBar clicked={click}>
              <Item onClick={() => setClick(false)} exact activeClassName="active" to="/">
                <img src={Home} alt="Home" />
                <Text clicked={click}>Dashboard</Text>
              </Item>
              <Item onClick={() => setClick(false)} to="/CreateMaintenanceBill" activeClassName="active">
                <img src={Team} alt="CreateMainBill" />
                <Text clicked={click}>CreateMainBill</Text>
              </Item>
              <Item onClick={() => setClick(false)} to="/CreateWatereBill" activeClassName="active">
                <img src={Calender} alt="CreateWaterBill" />
                <Text clicked={click}>CreateWaterBill</Text>
              </Item>
              <Item onClick={() => setClick(false)} to="/ShowMaintanenceBill" activeClassName="active">
                <img src={Documents} alt="" />
                <Text clicked={click}>ShowMainBill</Text>
              </Item>
              <Item onClick={() => setClick(false)} to="/ShowWaterBill" activeClassName="active">
                <img src={Projects} alt="Projects" />
                <Text clicked={click}>ShowWaterBill</Text>
              </Item>
            </SlickBar>
            {/* Profile */}
            <Profile clicked={profileClick} onClick={handleClick}>
              <img src="https://picsum.photos/200" alt="Profile" />
              <Details clicked={profileClick}>
                <Name>
                  <h5 style={{fontSize: '10px', marginTop: '2px'}} >Jhon Doe</h5>
                  <a href="/#">View Profile</a>
                </Name>
                <Logout onClick={handleLogout}>
                  <img src={PowerOff} alt="logout" />
                </Logout>
              </Details>
            </Profile>
          </SidebarContainer>
        </>
      )}
      <ToastContainer />
    </Container>
  );
}

export default Sidebar;
