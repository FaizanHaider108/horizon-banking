import Authform from '@/app/components/Authform'
import React from 'react'

function SignIn() {
  return (
   <section className='flex-center size-full max-sm:px-6'>
    <Authform type="sign-in" /> 
   </section>
  )
}

export default SignIn