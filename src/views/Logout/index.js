import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../reducers/Auth/authSlice';

function Logout() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(authActions.logout());
    },[])
  return (
        <></>
  )
}

export default Logout