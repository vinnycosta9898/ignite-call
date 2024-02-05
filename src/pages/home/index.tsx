import { Heading, Text } from "@ignite-ui/react";
import Image from "next/image";

import previewImage from "../../assets/app-preview.svg";
import ClainUsernameForm from "./components/ClainUserNameForm";
import { Container, Hero, Preview } from "./styles";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique a sua agenda | Ignite Call"
        description="Conecte o seu calendário e permita que pessoas agendem um horário no seu tempo livre"
      />
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
    </>
  );
}
