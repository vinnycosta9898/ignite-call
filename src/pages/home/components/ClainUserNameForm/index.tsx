/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormAnnotation } from './styles'

const clainUsernameSchema = z.object({
    username:
        z.string()
            .min(3, { message: 'O nome de usúario precisa ter pelo menos 3 digitos' })
            .transform(username => username.toLowerCase())
})

type clainUserNameFormData = z.infer<typeof clainUsernameSchema>

export default function ClainUsernameForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<clainUserNameFormData>({
        resolver: zodResolver(clainUsernameSchema)
    })

    const router = useRouter()

    async function handlePreRegister(data: clainUserNameFormData) {
        const { username } = data

        await router.push(`/register?username=${username}`)

    }

    return (
        <>
            <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
                <TextInput size="sm" prefix="ignite.com/" placeholder="Seu Usuário" {...register('username')} />
                <Button size="sm" type="submit">
                    Reservar
                    <ArrowRight />
                </Button>


            </Form>

            <FormAnnotation>
                <Text size="sm">
                    {errors.username ? errors.username.message : 'Digite o nome do usúario desejado'}
                </Text>
            </FormAnnotation>
        </>
    )
}

