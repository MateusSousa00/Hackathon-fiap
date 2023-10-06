'use client'
import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/Button'
import Login from '@/components/Login'
import SignIn from '@/components/Signin'

import waterLogoIcon from '../icons/water-logo.svg'

export default function Home() {
  const [selectedComponent, setSelectedComponent] =
    // eslint-disable-next-line no-use-before-define
    useState<ComponentType | null>(null)

  const [divClassType, setDivClassType] = useState('flex-col')
  const [changeHeight, setChangeHeight] = useState('h-screen')

  type ComponentType = 'Login' | 'SignIn'

  const renderComponent = (component: ComponentType) => {
    setSelectedComponent(component)
    setChangeHeight('h-screen')
    if (component === 'Login') {
      setDivClassType('flex-col')
    } else {
      setDivClassType('flex-row items-center justify-between px-12')
    }
  }

  return (
    <div className={`bg-blue-500 ${changeHeight}`}>
      <div className={`flex ${divClassType}`}>
        {selectedComponent === 'SignIn' && (
          <div className="flex flex-col items-start">
            <Image src={waterLogoIcon} alt="Nossa Agua" />
            <div className="my-10 flex flex-col items-center">
              <h1 className="text-3xl font-extrabold">Nossa Água</h1>
              <p className="font-bold">Quanto mais, melhor!</p>
            </div>
          </div>
        )}
        {selectedComponent !== 'SignIn' && (
          <div className="pt-8 flex flex-col items-center">
            <Image src={waterLogoIcon} alt="Nossa Agua" />
            <div className="my-10 flex flex-col items-center">
              <h1 className="text-3xl font-extrabold">Nossa Água</h1>
              <p className="font-bold">Quanto mais, melhor!</p>
            </div>
          </div>
        )}
        {selectedComponent === null && (
          <>
            <div className="flex flex-col items-center h-full justify-center mt-40 gap-12">
              {/* Buttons to toggle between Login and SignIn */}
              <Button
                className="w-full xs:w-28"
                onClick={() => renderComponent('Login')}
              >
                Login
              </Button>
              <Button
                className="w-full xs:w-28"
                onClick={() => renderComponent('SignIn')}
              >
                SignIn
              </Button>
            </div>
          </>
        )}

        {/* Render the selected component */}
        {selectedComponent === 'Login' && <Login />}
        {selectedComponent === 'SignIn' && <SignIn />}
      </div>
    </div>
  )
}
