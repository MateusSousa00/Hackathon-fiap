'use client'
import { Input } from '@/components/Input/Index'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Button from './Button'

export default function SignIn(){
  const [isLoading, setIsLoading] = useState(false)
  const [isCepInputFocused, setIsCepInputFocused] = useState(false)
  const { signIn } = func()
  const router = useRouter()

  type SignInFormData = {
    cpf: string,
    name: string,
    email: string,
    phone: string
  }


  const signInForm = useForm<SignInFormData>()

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    setFocus,
    setError,
    clearErrors,
    register,
  } = signInForm

  function formatPhone(e: ChangeEvent<HTMLInputElement>) {
    // recebe valor em tempo real do input
    const inputPhone = e.target.value

    // recebe valor da inputPhone, remove caracteres especiais
    const numericOnly = inputPhone.replace(/\D/g, '')

    // pega o intervalo entre 0, 11
    const truncatedPhone = numericOnly.slice(0, 11)

    e.target.value = truncatedPhone.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3',
    )
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-']
    if (
      !allowedKeys.includes(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Home' &&
      e.key !== 'End'
    ) {
      e.preventDefault()
    }
  }

  const isNull = () => {
    if (Object.keys(errors).length > 0) {
      toast.error('Preencha os campos obrigatórios!')
    }
  }

  const handleLogin = async (data: SignInFormData) => {
    setIsLoading(true)
    await signIn({
      cpf: data.cpf,
      name: data.name,
      email: data.email,
      phone: data.phone
    })
    .then(() => router.replace('/home'))
    .catch(() => {
      setIsLoading(false)
      toast.error('Login Invalido', {theme: 'colored'})
    })
  }

  if (isLoading) return <Loading />

  return (
    <FormProvider {...signInForm}>
          <form onSubmit={handleSubmit(handleLogin)}>
            {/* Personal Data */}
            <div className="py-9 text-[1rem] font-[400]">
              <h2 className="py-5 pt-3 text-2xl font-bold text-[#4143FF]">
                teste só para aparecer
              </h2>

              <Input.Field>
                <Input.Label>CPF</Input.Label>
                <Input.Root
                  placeholder='000.000.000-00'
                  name="CPF"
                />
                <Input.ErrorMessage field="CPF" />
              </Input.Field>

              <Input.Field>
                <Input.Label>Nome</Input.Label>
                <Input.Root
                  placeholder='Nome'
                  name="name"
                />
                <Input.ErrorMessage field="name" />
              </Input.Field>

              <Input.Field>
                <Input.Label>Telefone</Input.Label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <input
                      {...register('phone', {
                        onChange(e) {
                          formatPhone(e)
                        },
                      })}
                      type="tel"
                      name="phone"
                      placeholder="(11) 98457-1020"
                      className="w-full appearance-none rounded border border-zinc-300 px-5 py-2 text-black placeholder:text-gray-200 focus:border-blue focus:shadow-blue focus:outline-none"
                    />
                    <Input.ErrorMessage field="phone" />
                  </div>
                </div>
                {/* <div className="flex space-x-4"></div> */}
              </Input.Field>
            </div>

            
            {/* Send Information */}
            <div className="flex justify-between">
              <Button
                className="w-full xs:w-28"
                disabled={isLoading || isCepInputFocused}
                onClick={isNull}
                type="submit"
              >
                Criar
              </Button>
            </div>
          </form>
        </FormProvider>
  )
}

function func(): any {
  return "eae blz"
}
