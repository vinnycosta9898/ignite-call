/* eslint-disable prettier/prettier */
import { Button, Heading, MultiStep, Text, } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Check } from 'phosphor-react'

import { AuthError, ConnectBox, ConnectItem, Container, Header } from './styles'
import { useRouter } from 'next/router'

export default function Register() {
    const session = useSession()
    const router = useRouter()

    const hasAuthError = !!router.query.error
    const isSigned = session.status === 'authenticated'

    async function handleConnectCalendar() {
        await signIn('google')
    }

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
                    {isSigned
                        ?
                        <Button size='sm' disabled>
                            Conectado
                            <Check />
                        </Button>
                        :
                        <Button
                            variant='secondary'
                            size='sm'
                            onClick={handleConnectCalendar}
                        >
                            Conectar
                            <ArrowRight />
                        </Button>
                    }
                </ConnectItem>

                {hasAuthError && (
                    <AuthError size='sm'>
                        Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso ao Google Calendar
                    </AuthError>
                )}

                <Button type='submit' disabled={!isSigned}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </ConnectBox>
        </Container>
    )
}
