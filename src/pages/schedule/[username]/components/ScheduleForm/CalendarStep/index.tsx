/* eslint-disable prettier/prettier */
import { Calendar } from "@/components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useState } from "react";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

interface AvailabilityProps{
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps{
  onSelectedDateTime : (date: Date) => void
}

export function CalendarStep({ onSelectedDateTime } : CalendarStepProps){
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const router = useRouter()
  const username = String(router.query.username)

  const hasSelectedDate = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd'): null
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null
  
  const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DDDD'): null
  
  const { data: availability } = useQuery<AvailabilityProps>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  function handleSelectTime(hour: number){
    const dateWithTime = dayjs(selectedDate).set('hour', hour).startOf('hour').toDate()

    onSelectedDateTime(dateWithTime)
  }
  

  return(
    <Container isTimePickerOpen={hasSelectedDate}>
      <Calendar
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
      />
      {hasSelectedDate && <TimePicker>
        <TimePickerHeader>
          {weekDay} <span>{describedDate}</span>
        </TimePickerHeader>

        <TimePickerList>
          {availability?.possibleTimes.map(hour => {
            return(
              <TimePickerItem 
                key={hour} 
                onClick={() => handleSelectTime(hour)}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            )
          })}
        </TimePickerList>
      </TimePicker> }
    </Container>
  )
}