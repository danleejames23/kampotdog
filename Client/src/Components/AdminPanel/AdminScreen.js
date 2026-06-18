import React, { useState } from 'react'
import ManageBlogs from './ManageBlogs'
import ManageDogs from './ManageDogs'
import ManageCounters from './ManageCounters'
import ManageReturns from './ManageReturns'
import ManageContacts from './ManageContacts'
import ManageSponsorships from './ManageSponsorships'

const MENU_ITEMS = [
  { key: 'manageDogs', label: 'Manage Dogs' },
  { key: 'manageSponsorships', label: 'Sponsored Dogs' },
  { key: 'manageBlogs', label: 'Manage Blogs' },
  { key: 'manageCounters', label: 'Site Counters' },
  { key: 'manageReturns', label: 'Return Requests' },
  { key: 'manageContacts', label: 'Contact Messages' },
]

const AdminScreen = () => {
  const [screen, setScreen] = useState('manageDogs')

  return (
    <div className='admin-screen-container'>
      <div className='admin-screen-left'>
        <div className='admin-menu-card'>
          <h3>Site Control</h3>
          <p className='admin-menu-sub'>Update content, sponsorship status and key website sections.</p>
          <div className='admin-menu-list'>
            {MENU_ITEMS.map((item) => (
              <button
                key={item.key}
                type='button'
                className={`admin-menu-btn${screen === item.key ? ' active' : ''}`}
                onClick={() => setScreen(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='admin-screen-right'>
        {screen === 'manageDogs' && <ManageDogs />}
        {screen === 'manageSponsorships' && <ManageSponsorships />}
        {screen === 'manageBlogs' && <ManageBlogs />}
        {screen === 'manageCounters' && <ManageCounters />}
        {screen === 'manageReturns' && <ManageReturns />}
        {screen === 'manageContacts' && <ManageContacts />}
      </div>
    </div>
  )
}

export default AdminScreen
