/* eslint-disable prettier/prettier */
import { useMemo, useState } from "react";

import dayjs from "dayjs";

import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";
import { getWeekDays } from "@/utils/get-week-days";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

interface CalendarWeekProps{
  week: number,
  days: Array<{
    date: dayjs.Dayjs,
    disabled: boolean
  }>
}

type CalendarWeeksProps = CalendarWeekProps[]

interface BlockedDatesProps{
  blockedWeekDays: number[]
  blockedDates: number[]
}

interface CalendarProps{
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected } : CalendarProps){
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  
  const router = useRouter()
  
  function handlePreviousMonth(){
    const previousMonthDate = currentDate.subtract(1, 'month')
    
    setCurrentDate(previousMonthDate)
  }
  
  function  handleNextMonth(){
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }
  
  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM') // Mês atual  
  const currentYear = currentDate.format('YYYY') // Ano atual

  const username = String(router.query.username)
  
  const { data: blockedDates } = useQuery<BlockedDatesProps>({
    queryKey: ['blocked-dates', currentDate.get('year'), currentDate.get('month') ],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month') + 1,
        },
      })

      return response.data
    }
  })

  const calendarWeeks = useMemo(() => {
    if(!blockedDates){
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth()
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    }) 

    const firstWeekday =  currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekday
    }).map((_, index ) => {
      return currentDate.subtract(index + 1, 'day')
    }).reverse()

    const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth())
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1)
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    }) 

    const calendarDays = [
      ...previousMonthFillArray.map(date => {
        return { date, disabled: true}
      }),
      ...daysInMonthArray.map((date) => {
        return { 
                  date, 
                  disabled: date.endOf('day').isBefore(new Date()) || 
                  blockedDates.blockedWeekDays.includes(date.get('day')) ||
                  blockedDates.blockedDates.includes(date.get('date'))
                }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true}
      })
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeksProps>((weeks, _, index, original) => {
      const isNewWeek = index % 7 === 0

      if(isNewWeek){
        weeks.push({
          week: index / 7 + 1,
          days: original.slice(index, index + 7)
        })
      }

      return weeks
    }, [])

    return calendarWeeks
  }, [currentDate, blockedDates])

  return(
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button title="Previous Month" onClick={handlePreviousMonth}>
            <CaretLeft/>
          </button>

          <button title="Next month" onClick={handleNextMonth}>
            <CaretRight/>
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            { shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ days, week}) => {
            return(
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return(
                    <td key={date.toString()}>
                      <CalendarDay disabled={disabled} onClick={() => onDateSelected(date.toDate())}>
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}