import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


export function Navbar() {
  return(
    <Flex
      maxWidth={'1200px'}
      bg={'gray.200'}
      margin={'auto'}
      height={'50px'}
      alignItems={'center'}
    >
      <Box
        bg={'gray.100'}
        width={'100%'}
        height={'100&'}    >
        <Link to={'/'}>
          <Box
            bg={'gray.200'}
          >
            Entry Page
          </Box>
        </Link>
      </Box>
      <Box
        bg={'gray.100'}
        width={'100%'}
      >
        <Link to={'/list'}>
          <Box
            bg={'gray.200'}
            width={'100%'}
          >
            List page
          </Box>
        </Link>
      </Box>
    </Flex>
  )

}