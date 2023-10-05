'use client'
import Image from 'next/image'
import waterLogoIcon from '../icons/water-logo.svg'
import Login from '@/components/Login'
import SignIn from '@/components/Signin'
import Address from '@/components/Address'
import { useState } from 'react'

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(
    null
  );

  type ComponentType = 'Login' | 'SignIn';

  const renderComponent = (component: ComponentType) => {
    setSelectedComponent(component);
  };
  
  return (
    <div className='bg-gradient h-screen'>
      <div className='pt-8 flex flex-col items-center'>
        <Image src={waterLogoIcon} alt='Nossa Agua' />
        <h1 className='text-2xl'>Nossa Água</h1>
        <p>Quanto mais, melhor!</p>

      </div>
      {selectedComponent === null && (
        <>
          <div className='flex flex-col items-center h-full justify-center'>
            {/* Buttons to toggle between Login and SignIn */}
            <button onClick={() => renderComponent('Login')}>Login</button>
            <button onClick={() => renderComponent('SignIn')}>SignIn</button>
          </div>
        </>
      )}
      

      {/* Render the selected component */}
      {selectedComponent === 'Login' && <Login />}
      {selectedComponent === 'SignIn' && (
        <>
          <SignIn />
          <Address />
        </>
      )}
    </div>
  );
}

