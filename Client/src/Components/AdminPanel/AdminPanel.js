import React from 'react'
import AdminNavBar from "./AdminNavBar";
import AdminFooter from "./AdminFooter";
import AdminScreen from './AdminScreen';

const AdminPanel = ({ onLogout }) => {
  return (
    <div>
      <AdminNavBar onLogout={onLogout}/>
      <AdminScreen/>
      <AdminFooter/>
    </div>
  )
}

export default AdminPanel
