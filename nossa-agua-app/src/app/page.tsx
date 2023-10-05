'use client'
import Image from 'next/image'
import waterLogoIcon from '../icons/water-logo.svg'
import Login from '@/components/Login'
import SignIn from '@/components/Signin'

export default function Home() {
  
  return (
    <div className='bg-gradient h-screen'>
    <Image src={waterLogoIcon} alt='Nossa Agua' />
    <h1>Nossa Água</h1>
    <p>Já Cuidou da</p>
    <span>nossa água</span>
    <p>hoje?</p>
    
    <Login/>

    <SignIn/>

    </div>
  )
}

