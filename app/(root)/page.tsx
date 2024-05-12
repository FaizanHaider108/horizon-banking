import React from 'react'
import HeaderBox from './components/headerBox'
import TotalBalanceBox from './components/TotalBalanceBox'


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
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.25}/>
        </header>
      </div>
    </div>
  )
}

export default Home