/* eslint-disable prettier/prettier */
import { prismaClient } from "@/lib/prisma";
// import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'GET'){
    return res.status(405).end()
  } 

  const username = String(req.query.username) 

  const { year, month } = req.query 

  if(!month || !year){
    return res.status(400).json({ message : 'Year or month not specified'})
  }

  const user = await prismaClient.user.findUnique({
    where:{
      username
    }
  })

  if(!user){
    return res.status(400).json({ message : 'User does not exists'})
  }

  const availableWeekDays = await prismaClient.userTimeInterval.findMany({
    select:{
      week_day: true
    },
    where:{
      user_id: user.id
    }
  })

  const blockedWeekDays = [0, 1, 2, 3 , 4, 5, 6].filter(weekDay => {
    return !availableWeekDays.some(
      (availableWeekDays) => availableWeekDays.week_day === weekDay
    )
  })

  const blockedDatesRaw = await prismaClient.$queryRaw`
    SELECT * 
    FROM schedulings S

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
  `

  return res.json({ blockedWeekDays }) 

  
}