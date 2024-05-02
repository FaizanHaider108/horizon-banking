import React from 'react'
import HeaderBox from './components/headerBox'


function Home() {
  const loggedIn  = {firstname: "Faizan Haider"}
  return (
    <div className="home">
      <div className="home-content">
        <header className='home-header'>
          <HeaderBox 
          type="greeting" 
          title = "Welcome" 
          user={loggedIn?.firstname || 'Guest'}
          subtext="Access and manage your account and transactions efficiently"
          />
        </header>
      </div>
    </div>
  )
}

export default Home