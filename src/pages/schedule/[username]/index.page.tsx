import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticProps } from 'next'
import { prismaClient } from '@/lib/prisma'
import { ScheduleForm } from './components/ScheduleForm'

interface ScheduleProps {
    user:{
        name: string
        bio: string
        avatar_url: string
    }
}

// Quando a pagina é estatica mais a rota é dinamica
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export default function Schedule({ user } : ScheduleProps) {
    return (
        <Container>
            <UserHeader>
                {/* <Avatar src={user.avatar_url} />
                <Heading>{user.name}</Heading>
                <Text>{user.bio}</Text> */}
            </UserHeader>

            <ScheduleForm/>
        </Container>
    )
}

export const getStaticProps : GetStaticProps = async ({ params }) => {
    const username = String(params?.username)

    const user = await prismaClient.user.findUnique({
        where:{
            username
        }
    })

    if(!user){
        return{
            notFound: true
        }
    }
    
    return{
        props:{
            user:{
                name: user.name,
                bio: user.bio,
                avatarUrl: user.avatar_url
            }
        }
    }
}
