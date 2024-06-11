import PaymentTransferForm from '@/app/components/PaymentTransferForm'
import HeaderBox from '@/app/components/headerBox'
import { getAccounts } from '@/lib/actions/banks.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Transfer = async () => {
  const loggedIn  = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id
  })
  if(!accounts) return;
  const accountData = accounts?.data;
  return (
   <section className='payment-transfer'>
    <HeaderBox title='Payment Transfer' subtext='Please provide any specific details or notes related to the payment transfer'/>
    <section>
      <PaymentTransferForm accounts={accountData} />
    </section>
   </section>
  )
}

export default Transfer
