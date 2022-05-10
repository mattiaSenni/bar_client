import React, { useState } from 'react';
import './App.scss';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {BottomNavigation, BottomNavigationAction} from '@mui/material'
import { FastfoodRounded, HomeRounded, MenuRounded, ShoppingCart } from '@mui/icons-material';
import TopAppBar from './components/TopAppBar';

function App() {
  let location = useLocation().pathname
  let login = useSelector(state => state.login).login
  const navigate = useNavigate()

  if (!login) {
    return (<Navigate to="/login" />)
  }

  if (location === '/')
    return (<Navigate to="/home" />)
  
  const value = reverseLocations[location]

  return (
    <div>
      <TopAppBar />
      <div style={{display:'block', height:'50px'}}></div>
      <Outlet />
      <div style={{display:'block', height:'70px'}}></div>
      <BottomNavigation
        style={{position:'fixed', bottom:0, width:'100%'}}
        showLabels
        value={value}
      >
        <BottomNavigationAction label="Home" component={Link} to="/home" icon={<HomeRounded />} />
        <BottomNavigationAction label="Menu" component={Link} to="/menu" icon={<MenuRounded />} />
        <BottomNavigationAction label="Ordini" component={Link} to="/orders" icon={<FastfoodRounded />} />
        <BottomNavigationAction label="Carrello" component={Link} to="/carrello" icon={<ShoppingCart />} />
      </BottomNavigation>
    </div>
  );
}
export default App

const locations = {
  0: '/home',
  1: '/menu',
  2: '/orders',
  3: '/carrello'
}
const reverseLocations = {
  '/home': 0,
  '/menu': 1,
  '/orders': 2,
  '/carrello': 3
}