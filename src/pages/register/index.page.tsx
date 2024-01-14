/* eslint-disable prettier/prettier */
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'

import { Container, Form, Header } from './styles'

export default function Register() {
    return (
        <Container>
            <Header>
                <Heading as='strong'>Bem vindo ao Ignite Call</Heading>
                <Text>Precisamos de alguma sinformações para criar seu perfil! Ah, você pode editar essas informações depois.</Text>
                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as='form'>
                <label>
                    <Text size="sm">Nome de Usuário</Text>
                    <TextInput prefix='ignite.com' placeholder='seu-usuario' />
                </label>

                <label>
                    <Text size='sm'>
                        Nome Completo
                    </Text>
                    <TextInput placeholder='Seu nome' />
                </label>

                <Button type='submit'>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}
