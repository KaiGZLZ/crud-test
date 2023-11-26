import React from 'react'
import { Navbar } from './Navbar'
import { Box, Flex, Grid, Icon, IconButton, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

export function ListPage() {

  const navigate = useNavigate()

  const list = JSON.parse(localStorage.getItem('list') || '[]') as DataFinal[]

  return <>
    <Navbar />
    <Text
      fontSize={'20px'}
      fontWeight={'bold'}
      margin={'20px'}
    >
      List Page
    </Text>
    <Box
      maxWidth={'1200px'}
      margin={'auto'}
      marginY={'20px'}
      bg={'gray.100'}
      padding={'20px'}

    >
      {
        list.map(
          (item) => {
            return <>
              <Grid templateColumns={'6fr 1fr 1fr'}>
                <Flex
                  maxWidth={'1200px'}
                  margin={'auto'}
                  width={'100%'}
                  flexDir={['column', 'column', 'row', 'row']}

                  border={'1px solid black'}
                >

                  {/* Name section */}
                  <Flex
                    bg={'gray.100'}
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    padding={'20px'}
                  >
                    <Box
                      width={'100%'}
                      height={'50px'}
                    >
                      {item.data.name}
                    </Box>
                  </Flex>

                  {/* Sector section */}
                  <Box
                    bg={'gray.100'}
                    width={'100%'}
                    padding={'20px'}
                  >
                    {
                      item.data.sectors.map(
                        (sector) => {
                          return <>
                            <Flex
                              alignItems={'center'}
                            >
                              {sector.sector?.name}
                              {sector.sector2 ? ' / ' + sector.sector2?.name : ''}
                              {sector.sector3 ? ' / ' + sector.sector3?.name : ''}
                              {sector.sector4 ? ' / ' + sector.sector4?.name : ''}
                            </Flex>
                          </>
                        })
                    }
                  </Box>
                </Flex>
                <IconButton
                  aria-label={'delete'}
                  height={'100%'}
                  icon={<Icon as={EditIcon} />}
                  onClick={() =>
                    navigate('/edit/' + item.id)
                  }
                />
                <IconButton
                  aria-label={'delete'}
                  height={'100%'}
                  icon={<Icon as={DeleteIcon} />}
                  onClick={() => {
                    const newList = list.filter((item2: DataFinal) => item2.id !== item.id)
                    localStorage.setItem('list', JSON.stringify(newList))
                    window.location.reload()
                  }}
                />
              </Grid>
            </>
          }
        )
      }
    </Box>


  </>
}


