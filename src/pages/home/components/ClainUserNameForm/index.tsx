/* eslint-disable prettier/prettier */
import { ArrowRight } from 'phosphor-react'
import { Form } from './styles'
import { Button, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const clainUsernameSchema = z.object({
    usernmae: z.string()
})


type clainUserNameFormData = z.infer<typeof clainUsernameSchema>

export default function ClainUsernameForm() {
    const { register, handleSubmit } = useForm<clainUserNameFormData>()

    async function handlePreRegister(data: clainUserNameFormData) {
        console.log(data)
    }
    return (
        <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
            <TextInput size="sm" prefix="ignite.com/" placeholder="Seu Usuário" {...register('username')} />
            <Button size="sm" type="submit">
                Reservar
                <ArrowRight />
            </Button>
        </Form>
    )
}
