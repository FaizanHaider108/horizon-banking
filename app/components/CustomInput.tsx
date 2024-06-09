import React from 'react'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import { Control, FieldPath } from 'react-hook-form'

import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { AuthformSchema } from '@/lib/utils'
const formSchema = AuthformSchema('sign-up')
interface CustomInput {
    control: Control <z.infer<typeof formSchema>>,
    name: FieldPath<z.infer< typeof formSchema>>,
    label: string,
    placeholder: string

}



const CustomInput = ({control, name, label, placeholder}: CustomInput) => {
  return (
    <div>
     
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder}{...field} type={name === "password" ? "password" : "text" }/>
              </FormControl>
             
              <FormMessage className='text-red-600 mt-2'/>
            </FormItem>
          )}
        />
      
    </div>
  )
}

export default CustomInput
