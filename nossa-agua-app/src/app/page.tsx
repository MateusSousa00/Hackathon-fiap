'use client'
import { Input } from '@/components/Input/Index'
import Loading from '@/components/Loading'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import eyeIcon from '../icons/eye.svg'
import eyeCrossedIcon from '../icons/eye-crossed.svg'

export default function Home() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { testFunc } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  type TestFormData = {
    testOne: string,
    testTwo: string
  }
  const testForm = useForm<TestFormData>()


  const {
    handleSubmit,
    formState: { isSubmitting },
  } = testForm

  const handleTest = async (data: TestFormData) => {
    setIsLoading(true)
    await testFunc({
      testOne: data.testOne,
      testTwo: data.testTwo
    })
    .then(() => router.replace('/home'))
    .catch(() => {
      setIsLoading(false)
      toast.error('test invalido', {theme: 'colored'})
    })
  }

  if (isLoading) return <Loading />

  return (
    <FormProvider {...testForm}>
      <form
        className='flex w-full flex-col pt-6'
        onSubmit={handleSubmit(handleTest)}
      >
      <Input.Field>
        <Input.Label htmlFor="email">email</Input.Label>
        <Input.Root
         name='email'
         placeholder='emailplace'
         autoComplete='username'
         />
      </Input.Field>
      <Input.Field>
              <Input.Label htmlFor="password">password</Input.Label>
            
            <div className="relative">
              <Input.Root
                name="password"
                autoComplete="current-password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder='password'
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Image src={eyeIcon} alt="Eye Icon" />
                ) : (
                  <Image src={eyeCrossedIcon} alt="Eye Crossed Icon" />
                )}
              </div>
            </div>
            <Input.ErrorMessage field="password" />
          </Input.Field>

      </form>
    </FormProvider>
  )
}

function useAuthContext(): any {
  return "nice func boy"
}

