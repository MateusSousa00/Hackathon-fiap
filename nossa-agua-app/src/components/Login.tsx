'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Input } from '@/components/Input/Index'
import Loading from '@/components/Loading'

import eyeIcon from '../icons/eye.svg'
import eyeCrossedIcon from '../icons/eye-crossed.svg'

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { login } = func()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  type LoginFormData = {
    email: string
    password: string
  }

  const loginForm = useForm<LoginFormData>()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = loginForm

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    await login({
      testOne: data.email,
      testTwo: data.password,
    })
      .then(() => router.replace('/home'))
      .catch(() => {
        setIsLoading(false)
        toast.error('Login Invalido', { theme: 'colored' })
      })
  }

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col justify-center w-full">
      <FormProvider {...loginForm}>
        <form
          className="flex flex-col pt-6 items-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input.Field>
            <Input.Label htmlFor="email">email</Input.Label>
            <Input.Root
              name="email"
              placeholder="vencedor@fiap.com"
              autoComplete="username"
            />
          </Input.Field>
          <Input.Field>
            <Input.Label htmlFor="password">senha</Input.Label>
            <div className="relative">
              <Input.Root
                name="password"
                autoComplete="current-password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="senha"
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
    </div>
  )
}

function func(): any {
  return 'eae blz'
}
