/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
    username:
        z.string()
            .min(3, { message: 'O nome de usúario precisa ter pelo menos 3 digitos' })
            .regex(/ˆ([a-z\\-]+)$/i, { message: 'O usúario precisa ter somente letras' })
            .transform(username => username.toLowerCase()),
    name:
        z.string()
            .min(3, { message: 'O nome precisa ter pelo menos 3 digitos' })
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    })

    async function handleRegister(data: RegisterFormData) {
        console.log(data)
    }


    return (
        <Container>
            <Header>
                <Heading as='strong'>Bem vindo ao Ignite Call</Heading>
                <Text>Precisamos de alguma sinformações para criar seu perfil! Ah, você pode editar essas informações depois.</Text>
                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as='form' onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm">Nome de Usuário</Text>
                    <TextInput prefix='ignite.com' placeholder='seu-usuario' {...register('username')} />
                    {errors.username && (
                        <FormError size='sm'>{errors.username.message}</FormError>
                    )}
                </label>

                <label>
                    <Text size='sm'>
                        Nome Completo
                    </Text>
                    <TextInput placeholder='Seu nome' {...register('name')} />
                    {errors.username && (
                        <FormError size='sm'>{errors.name.message}</FormError>
                    )}
                </label>

                <Button type='submit' disabled={isSubmitting}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}
