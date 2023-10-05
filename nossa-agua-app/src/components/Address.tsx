'use client'
import { Input } from '@/components/Input/Index'
import Loading from '@/components/Loading'
import { api } from '@/server/api'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, KeyboardEvent, ChangeEvent, ClipboardEvent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function Address(){
  const [isCepInputFocused, setIsCepInputFocused] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  type AddressFormData = {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
  }

  const addressForm = useForm<AddressFormData>()

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    setFocus,
    setError,
    clearErrors,
    register,
  } = addressForm


  // Validação Cep
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
        message: "Cep Inválido.",
      })
      setValue('street', '')
      setValue('neighborhood', '')
    } finally {
      setIsLoading(false)
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>){
    e.preventDefault()
  }


  return (
    <div className="py-9 text-[1rem] font-[400]">
    <h2 className=" py-5 pt-3 text-2xl font-bold text-[#4143FF]">
      Endereço
    </h2>
    <div className="flex flex-row justify-between">
      <Input.Field>
        <Input.Label>
          CEP
        </Input.Label>
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
      <Input.Label>
        Logradouro
      </Input.Label>
      <Input.Root
        placeholder="Rua, Avenida, Estrada, Praça..."
        name="address"
      />
      <Input.ErrorMessage field="address" />
    </Input.Field>

    <Input.Field>
      <Input.Label>
        Numero
      </Input.Label>
      <Input.Root
        placeholder="43"
        name="number"
      />
      <Input.ErrorMessage field="number" />
    </Input.Field>

    <Input.Field>
      <Input.Label>
        Bairro
      </Input.Label>
      <Input.Root
        placeholder="Jardim Santa Lucia"
        name="neighborhood"
      />
      <Input.ErrorMessage field="neighborhood" />
    </Input.Field>

    <Input.Field>
      <Input.Label>
        Complemento
      </Input.Label>
      <Input.Root placeholder="Condominio das Flores" name="complement" />
      <Input.ErrorMessage field="complement" />
    </Input.Field>
  </div>
  )
}