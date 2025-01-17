import GasParams from '@/components/tx/GasParams'
import { useState } from 'react'
import AdvancedParamsForm from './AdvancedParamsForm'
import { type AdvancedParameters } from './types'

type Props = {
  params: AdvancedParameters
  recommendedNonce?: number
  willExecute: boolean
  nonceReadonly: boolean
  onFormSubmit: (data: AdvancedParameters) => void
}

const AdvancedParams = ({ params, recommendedNonce, willExecute, nonceReadonly, onFormSubmit }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const onAdvancedSubmit = (data: AdvancedParameters) => {
    onFormSubmit(data)

    setIsEditing(false)
  }

  return isEditing ? (
    <AdvancedParamsForm
      params={params}
      isExecution={willExecute}
      recommendedNonce={recommendedNonce}
      estimatedGasLimit={params.gasLimit?.toString()}
      nonceReadonly={nonceReadonly}
      onSubmit={onAdvancedSubmit}
    />
  ) : (
    <GasParams params={params} isExecution={willExecute} onEdit={() => setIsEditing(true)} />
  )
}

export default AdvancedParams

export * from './useAdvancedParams'

export * from './types.d'
