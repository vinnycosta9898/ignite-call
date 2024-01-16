import { Box, Text, styled } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  margintop: '$6',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column ',
    gap: '$2',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
