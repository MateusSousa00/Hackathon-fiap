'use client'
import { useRouter } from 'next/navigation'
import { ClipboardEvent, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Button from '@/components/Button'
import Loading from '@/components/Loading'

export default function Relatorio() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([])
  const router = useRouter()

  type ReportFormData = {
    equalLast: boolean
    hasWater: boolean
    period: string
    quality: string
  }

  const reportForm = useForm<ReportFormData>()

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    register,
  } = reportForm

  const isNull = () => {
    if (Object.keys(errors).length > 0) {
      toast.error('Preencha os campos obrigatórios!')
    }
  }

  const handleReport = async (data: ReportFormData) => {
    console.log(data)
    setIsLoading(true)
    if (data.equalLast) {
      router.replace('/obrigado')
    } else {
      router.replace('/obrigado')
    }
  }

  const handlePeriodSelection = (e: any) => {
    const selectedValue = parseInt(e.target.value, 10)
    if (e.target.checked) {
      // If checkbox is checked, add the value to the array
      setSelectedPeriods([...selectedPeriods, selectedValue])
    } else {
      // If checkbox is unchecked, remove the value from the array
      setSelectedPeriods(
        selectedPeriods.filter((value) => value !== selectedValue),
      )
    }

    // Calculate the sum of selected values and set it as the 'period' field
    const sumOfSelected = selectedPeriods.reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    )
    setValue('period', sumOfSelected.toString()) // Update the 'period' value in the form
  }

  if (isLoading) return <Loading />

  return (
    <div className="bg-blue-500 h-screen flex flex-col justify-center">
      <FormProvider {...reportForm}>
        <form
          className="flex flex-col pt-2 pb-5 items-center"
          onSubmit={handleSubmit(handleReport)}
        >
          <div className="flex flex-col items-center py-4">
            <label className="font-bold">
              Os dados são os mesmos de ontem?
            </label>
            <div className="flex flex-row gap-10">
              <div>
                <input
                  type="radio"
                  {...register('equalLast')}
                  id="sim"
                  value="true"
                />
                <label htmlFor="sim">sim</label>
              </div>
              <div>
                <input
                  type="radio"
                  {...register('equalLast')}
                  id="nao"
                  value="false"
                />
                <label htmlFor="nao">não</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center py-4">
            <label className="font-bold">Faltou Água?</label>
            <div className="flex flex-row gap-10">
              <div>
                <input
                  type="radio"
                  {...register('hasWater')}
                  id="sim-faltou-agua"
                  value="true"
                />
                <label htmlFor="sim-faltou-agua">sim</label>
              </div>
              <div>
                <input
                  type="radio"
                  {...register('hasWater')}
                  id="nao-faltou-agua"
                  value="false"
                />
                <label htmlFor="nao-faltou-agua">não</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center py-4">
            <h1>Escolha o período:</h1>
            <div className="flex flex-row gap-10">
              <label>
                <input
                  type="checkbox"
                  value="1"
                  onChange={handlePeriodSelection}
                />
                Manhã
              </label>
              <label>
                <input
                  type="checkbox"
                  value="3"
                  onChange={handlePeriodSelection}
                />
                Tarde
              </label>
              <label>
                <input
                  type="checkbox"
                  value="5"
                  onChange={handlePeriodSelection}
                />
                Noite
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center py-4">
            <label className="font-bold">Qualidade da Água:</label>
            <div className="flex flex-row gap-10">
              <label>
                <input type="radio" {...register('quality')} value="pessima" />
                Péssima
              </label>
              <label>
                <input type="radio" {...register('quality')} value="ruim" />
                Ruim
              </label>
              <label>
                <input type="radio" {...register('quality')} value="regular" />
                Regular
              </label>
              <label>
                <input type="radio" {...register('quality')} value="boa" />
                Boa
              </label>
              <label>
                <input type="radio" {...register('quality')} value="otima" />
                Ótima
              </label>
            </div>
          </div>

          {/* Send Information */}
          <div className="flex justify-between">
            <Button className="w-full xs:w-28" onClick={isNull} type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
