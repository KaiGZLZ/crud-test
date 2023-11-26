import React from 'react'
import { Navbar } from './Navbar'
import { Box, Button, Checkbox, Flex, FormLabel, Grid, Icon, IconButton, Input, Select, Text } from '@chakra-ui/react'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DeleteIcon } from '@chakra-ui/icons'

import Data from '../data'
import { v4 as uuidv4 } from 'uuid'


interface ListData {
  name: string
  value: number
}
interface DataToSend {
  uuid: string
  sector: ListData
  sector2: ListData | undefined
  sector3: ListData | undefined
  sector4: ListData | undefined
}

interface FormDataSector {
  sector: string
  sector2: string
  sector3: string
  sector4: string
}

interface FormData {
  name: string
  sectors: DataToSend[]
  aggee: boolean
}

interface DataFinal {
  id: string
  data: FormData
}

export function EntryPage() {

  const { register: registerSector, handleSubmit: handleSubmitSector, clearErrors: clearErrorsSector, reset: resetSector, formState: { errors: errorsSector } } = useForm<FormDataSector>()

  const [DataSector, setDataSector] = useState<Data[]>([])

  const [DataSector2, setDataSector2] = useState<Data[]>([])

  const [DataSector3, setDataSector3] = useState<Data[]>([])

  const [data, setData] = useState<DataToSend[]>([])

  const submitSector = (formData: FormDataSector) => {

    const sector1 = Data.find((s) => s.name === formData.sector)
    const sector2 = DataSector.find((s) => s.name === formData.sector2)
    const sector3 = DataSector2.find((s) => s.name === formData.sector3)
    const sector4 = DataSector3.find((s) => s.name === formData.sector4)

    const listData = {
      uuid: uuidv4(),
      sector: {
        name: formData.sector,
        value: sector1?.value || 0
      },
      sector2: sector2 ? {
        name: formData.sector2,
        value: sector2.value
      } : undefined,
      sector3: sector3 ? {
        name: formData.sector3,
        value: sector3.value
      } : undefined,
      sector4: sector4 ? {
        name: formData.sector4,
        value: sector4.value
      } : undefined,
    }

    const existingData = data.find((d) => {
      if(d.sector2 && d.sector3 && d.sector4) {
        return d.sector.name === formData.sector && d.sector2.name === formData.sector2 && d.sector3.name === formData.sector3 && d.sector4.name === formData.sector4
      }
      if(d.sector2 && d.sector3) {
        return d.sector.name === formData.sector && d.sector2.name === formData.sector2 && d.sector3.name === formData.sector3
      }
      if(d.sector2) {
        return d.sector.name === formData.sector && d.sector2.name === formData.sector2
      }
      return d.sector.name === formData.sector
    })

    if(existingData) {
      return
    }

    setData([...data, listData])

    resetSector()
    setDataSector([])
    setDataSector2([])
    setDataSector3([])
  }

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>()

  const submit = (formData: FormData) => {

    const dataToSend: DataFinal = {
      id: uuidv4(),
      data: {
        name: formData.name,
        sectors: data,
        aggee: formData.aggee
      }
    }

    const list = JSON.parse(localStorage.getItem('list') || '[]') as DataFinal[]

    localStorage.setItem('list', JSON.stringify([...list, dataToSend]))

    setData([])
    resetSector()
    reset(
      {
        name: '',
        aggee: false
      }
    )

  }

  return <>
    <Navbar />

    <Text
      fontSize={'20px'}
      fontWeight={'bold'}
      margin={'20px'}
    >
      Entry Page
    </Text>
    <Box
      padding={'20px'}
    >
      <Box
        maxWidth={'1200px'}
        fontSize={'18px'}
        fontWeight={'bold'}
        margin={'auto'}
        marginY={'20px'}
        textAlign={'initial'}
      >
        Please enter your name and pick the Sectors you are currently involved in.
      </Box>

      {/* Name */}
      <Box
        maxWidth={'1200px'}
        margin={'auto'}
        marginY={'20px'}
        textAlign={'initial'}
      >
        <FormLabel>Name</FormLabel>
        <Input
          width={['100%', '100%', '50%', '50%']}
          placeholder={'Name'}
          {...register('name', { required: 'The name is required' })}
        />
        <Box
          color={'red'}
        >
          {errors.name && errors.name.message}
        </Box>
      </Box>

      {/* Select Form */}

      <Flex
        maxWidth={'1200px'}
        margin={'auto'}
        flexDir={['column', 'column', 'row', 'row']}
      >
        <Flex
          bg={'gray.100'}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
          padding={'20px'}
        >
          <form onSubmit={handleSubmitSector(submitSector)}>
            <Select
              placeholder={'Select Sector'}
              {...registerSector('sector', { required: true })}
              onChange={(e) => {

                clearErrorsSector('sector')

                const filteredData = Data.filter((s) => s.name === e.target.value)
                if (filteredData.length > 0) {
                  setDataSector(filteredData[0].items)
                }
              }}
            >
              {Data.map((sector) => {
                return <option key={sector.value} value={sector.name}>{sector.name}</option>
              })}
            </Select>
            <Box
              color={'red'}
            >
              {errorsSector.sector && 'sector is required'}
            </Box>

            {
              (DataSector.length > 0) && <>
                <Select
                  placeholder={'Select Sector'}
                  {...registerSector('sector2', { required: true })}
                  onChange={(e) => {

                    clearErrorsSector('sector2')

                    const filteredData = DataSector.find((s) => s.name === e.target.value)

                    if(!filteredData) {
                      return
                    }

                    if (filteredData.items.length > 0) {
                      setDataSector2(filteredData.items)
                      return
                    }
                  }}
                >
                  {DataSector.map((sector) => {
                    return <option key={sector.value} value={sector.name}>{sector.name}</option>
                  })}
                </Select>
                <Box
                  color={'red'}
                >
                  {errorsSector.sector2 && 'sector2 is required'}
                </Box>
              </>
            }

            {
              DataSector2.length>0 && <>
                <Select
                  placeholder={'Select Sector'}
                  {...registerSector('sector3', { required: true })}
                  onChange={(e) => {

                    clearErrorsSector('sector3')

                    const filteredData = DataSector2.find((s) => s.name === e.target.value)

                    if(!filteredData) {
                      return
                    }

                    if (filteredData.items.length > 0) {
                      setDataSector3(filteredData.items)
                    }
                  }}
                >
                  {DataSector2.map((sector) => {
                    return <option key={sector.value} value={sector.name}>{sector.name}</option>
                  })}
                </Select>
                <Box
                  color={'red'}
                >
                  {errorsSector.sector3 && 'sector3 is required'}
                </Box>
              </>
            }

            {
              DataSector3.length>0 && <>
                <Select
                  placeholder={'Select Sector'}
                  {...registerSector('sector4', { required: true })}
                  onChange={() => {

                    clearErrorsSector('sector4')

                  }}
                >
                  {DataSector3.map((sector) => {
                    return <option key={sector.value} value={sector.name}>{sector.name}</option>
                  })}
                </Select>
                <Box
                  color={'red'}
                >
                  {errorsSector.sector4 && 'sector4 is required'}
                </Box>
              </>
            }
            <Button
              type={'submit'}
              bg={'blue.300'}
              margin={'20px'}
              size={'sm'}
            >
            Add sector
            </Button>
          </form>
        </Flex>
        <Box
          bg={'gray.100'}
          width={'100%'}
          padding={'20px'}
        >
          {
            data.map(
              (d) => {
                return <Grid key={d.sector.value} gridTemplateColumns={'4fr 1fr'}>
                  <Flex
                    alignItems={'center'}
                  >
                    {d.sector.name}
                    {d.sector2 ? ' / ' + d.sector2?.name : ''}
                    {d.sector3 ? ' / ' + d.sector3?.name : ''}
                    {d.sector4 ? ' / ' + d.sector4?.name : ''}
                  </Flex>
                  <IconButton
                    aria-label={'delete'}
                    icon={<Icon as={DeleteIcon} />}
                    onClick={() => {
                      const dataFiltered = data.filter((data) => {return data.uuid !== d.uuid})
                      setData(dataFiltered)
                    }}
                  />
                </Grid>
              }
            )
          }
        </Box>
      </Flex>

      {/* Agree */}
      <Box
        maxWidth={'1200px'}
        margin={'auto'}
        marginY={'20px'}
        textAlign={'initial'}
      >
        <Checkbox
          isChecked={watch('aggee')}
          {...register('aggee', { required: 'The agree is required' })}
        >
          Agree to terms
        </Checkbox>
        <Box
          color={'red'}
        >
          {errors.aggee && errors.aggee.message}
        </Box>
      </Box>

      {/* Submit */}
      <form onSubmit={handleSubmit(submit)}>
        <Button
          type={'submit'}
          bg={'green.300'}
        >
        Submit
        </Button>
      </form>

    </Box>
  </>
}