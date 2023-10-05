'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, ClipboardEvent, KeyboardEvent, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Input } from '@/components/Input/Index'
import Loading from '@/components/Loading'
import { api } from '@/server/api'

import Button from './Button'

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCepInputFocused, setIsCepInputFocused] = useState(false)
  const { signIn } = func()
  const router = useRouter()

  type SignInFormData = {
    cpf: string
    name: string
    email: string
    phone: string
    cep: string
    street: string
    number: string
    complement: string
    neighborhood: string
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
    const inputPhone = e.target.value
    const numericOnly = inputPhone.replace(/\D/g, '')
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
      phone: data.phone,
    })
      .then(() => router.replace('/home'))
      .catch(() => {
        setIsLoading(false)
        toast.error('Cadastro Invalido', { theme: 'colored' })
      })
  }

  // GET cep
  const checkCep = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return

    const inputCep = e.target.value
    const cepNumbersOnly = inputCep.replace(/\D/g, '')

    if (cepNumbersOnly.length !== 8) {
      setValue('street', '')
      setValue('neighborhood', '')
      return
    }

    setIsLoading(true)

    const formattedCep = cepNumbersOnly.replace(/^(\d{5})(\d{3})$/, '$1-$2')

    e.target.value = formattedCep

    try {
      const cepData = await api.viaCep(cepNumbersOnly)
      console.log(cepData)
      clearErrors('cep')
      setValue('street', cepData.logradouro, { shouldValidate: true })
      setValue('neighborhood', cepData.bairro, { shouldValidate: true })
      setFocus('number')
    } catch (error) {
      setError('cep', {
        type: 'manual',
        message: 'Cep Inválido.',
      })
      setValue('street', '')
      setValue('neighborhood', '')
    } finally {
      setIsLoading(false)
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
  }

  if (isLoading) return <Loading />

  return (
    <FormProvider {...signInForm}>
      <form
        className="flex flex-col pt-6 items-center"
        onSubmit={handleSubmit(handleLogin)}
      >
        {/* Personal Data */}
        <div className="py-9 text-[1rem] font-[400]">
          <h2 className="py-5 pt-3 text-2xl font-bold text-[#FFF]">Cadastro</h2>
          <Input.Field>
            <Input.Label>CPF</Input.Label>
            <Input.Root placeholder="000.000.000-00" name="CPF" />
            <Input.ErrorMessage field="CPF" />
          </Input.Field>
          <Input.Field>
            <Input.Label>Nome</Input.Label>
            <Input.Root placeholder="Nome" name="name" />
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

          <h2 className=" py-5 pt-3 text-2xl font-bold text-[#FFF]">
            Endereço
          </h2>
          <div className="flex flex-row justify-between">
            <Input.Field>
              <Input.Label>CEP</Input.Label>
              <Input.Root
                type="tel"
                inputMode="decimal"
                onKeyDown={handleKeyDown}
                onBlur={(e) => {
                  setIsCepInputFocused(false)
                  checkCep(e)
                }}
                onFocus={() => setIsCepInputFocused(true)}
                onPaste={handlePaste}
                placeholder="00000-000"
                name="zipcode"
              />
              <Input.ErrorMessage field="zipcode" />
            </Input.Field>
            <p className="pt-4 text-zinc-400 underline">
              <a
                className="whitespace-nowrap"
                target="_blank"
                href="https://buscacepinter.correios.com.br/app/endereco/"
              >
                Não sei meu cep
              </a>
            </p>
          </div>

          <Input.Field>
            <Input.Label>Logradouro</Input.Label>
            <Input.Root
              placeholder="Rua, Avenida, Estrada, Praça..."
              name="address"
            />
            <Input.ErrorMessage field="address" />
          </Input.Field>

          <Input.Field>
            <Input.Label>Numero</Input.Label>
            <Input.Root placeholder="43" name="number" />
            <Input.ErrorMessage field="number" />
          </Input.Field>

          <Input.Field>
            <Input.Label>Bairro</Input.Label>
            <Input.Root placeholder="Jardim Santa Lucia" name="neighborhood" />
            <Input.ErrorMessage field="neighborhood" />
          </Input.Field>

          <Input.Field>
            <Input.Label>Complemento</Input.Label>
            <Input.Root placeholder="Condominio das Flores" name="complement" />
            <Input.ErrorMessage field="complement" />
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
  return 'eae blz'
}
