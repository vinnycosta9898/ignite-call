import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'

import previewImage from '../../assets/app-preview.svg'
import ClainUsernameForm from './components/ClainUserNameForm'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="xl">
          Conecte-se o seu calendário e permita que as pessoas marquem
          agendamentos no seu tempo livre.
        </Text>
        <ClainUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando a aplicação em funcionamento"
        />
      </Preview>
    </Container>
  )
}
