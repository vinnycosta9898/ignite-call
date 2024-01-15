/* eslint-disable prettier/prettier */
import { Button, Heading, MultiStep, Text, } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'

import { ConnectBox, ConnectItem, Container, Header } from './styles'

export default function Register() {

    // async function handleRegister(data: RegisterFormData) { }


    return (
        <Container>
            <Header>
                <Heading as='strong'>Bem vindo ao Ignite Call</Heading>
                <Text>Precisamos de alguma sinformações para criar seu perfil! Ah, você pode editar essas informações depois.</Text>
                <MultiStep size={4} currentStep={2} />
            </Header>
            <ConnectBox>
                <ConnectItem>
                    <Text>Google Calendar</Text>
                    <Button variant='secondary' size='sm'>
                        Conectar
                        <ArrowRight />
                    </Button>
                </ConnectItem>
                <Button type='submit'>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </ConnectBox>
        </Container>
    )
}
