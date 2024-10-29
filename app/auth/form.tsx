'use client'

import React from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from '@/hooks/use-toast'
import { IValue, login } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export const Forms = () => {
  const [value, setValue] = React.useState("")
  const { push } = useRouter()
  const { toast } = useToast()

  const handleLogin = async (values: IValue) => {
    const success = await login(values)

    if (success) {
      toast({
        title: "Login efetuado com sucesso!"
      })
      push('/home')
    } else {
      toast({
        title: "Falha ao efetuar login",
        description: "Código de entrada inválido",
        variant: "destructive"
      })
    }
  }

  React.useEffect(() => {
    const length = value.slice()
    if (length.length === 6) {
      toast({
        title: "Enviando credenciais..."
      })

      handleLogin({
        entry_code: value
      })
    }
  }, [value])

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}
