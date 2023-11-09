import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/parents/Navbar'
import Footer from '../components/parents/Footer'

function Dashboard() {
    const profile = useSelector(state => state.auth.profile)
  return (
    <>
        <div>Dashboard {profile.role}</div>
    </>
  )
}

export default Dashboard