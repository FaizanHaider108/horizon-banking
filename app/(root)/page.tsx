import React from 'react'
import HeaderBox from '../components/headerBox'
import TotalBalanceBox from '../components/TotalBalanceBox'
import RigthSidebar from '../components/RigthSidebar'



function Home() {
  const loggedIn  = {firstName: "Faizan", lastName:"Haider", email:"info@faizanhaiderdev.online"}
  return (
    <div className="home">
      <div className="home-content">
        <header className='home-header'>
          <HeaderBox
          type="greeting" 
          title = "Welcome" 
          user={loggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.25}/>
        </header>
        Recent Transections
      </div>
      <RigthSidebar user={loggedIn} transections={[]} 
      banks={[{currentBalance: 123.50}, {currentBalance: 123.50}]}/>
    </div>
  )
}

export default Home