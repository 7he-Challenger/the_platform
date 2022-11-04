
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { alertErrorOccured, alertErrorToken } from "~lib/alert";
import { logOut } from "~lib/auth";
import { formatPresenceData, formatQueryPresenceParams, formatQueryUserParams, formatRegisteredMember, formatStatisticsRegisteredMember } from "~lib/format";
import moment from "~lib/moment";
import { getAllPresence, getAllUser } from "~repositories/user";
import { RESPONSE_ATTR } from '~constantes/response-attr';
import { generateListYear } from "~lib/generator";
import ROLES, { USER_TYPES } from "~constantes/roles";

const years = generateListYear(2017, parseInt(moment().format('YYYY')));
const months = moment.monthsShort()
const initialLabel = {
 labels: [],
 datasets: []   
}

export const useStatistics = () => {
  const { data, status }: any = useSession()
  /**
   * state list user 
   */
  const [users, setUsers] = useState<Array<any>>([])

  /**
   * state for the chart 
   */
  const [labelsYear, setLabelYear] = useState<Array<any>>(years);
  const [labelsMonth, setLabelMonth] = useState<Array<any>>(months);
  const [labesType, setLabelTypes] = useState<Array<any>>(USER_TYPES.map((item: any) => (item.name)));
  const [dataYear, setDataYear] = useState<any>(initialLabel)
  const [dataMonth, setDataMonth] = useState<any>(initialLabel)
  const [dataTypes, setDataTypes] = useState<any>(initialLabel)

  const [loading, setLoading] = useState<boolean>(false)

  const options: any = {
    responsive: true
  }

  const loadUserList = async () => {
    setLoading(true)
    try{
      const token = data ? data.accessToken : null
      const query = {
        roleInt: ROLES.ROLE_MEMBER
      }
      const result = await getAllUser(token, formatQueryUserParams(query))
      setUsers(result[RESPONSE_ATTR.data])
    }catch(e: any){
      console.log('error load user', e)
      if(e.response && e.response.status == 401){
        alertErrorToken()
        logOut()
      }else{
        alertErrorOccured()
      }
    }finally{
      setLoading(false)
    }
  }

  const filterStatistics = () => {
    const lists = formatRegisteredMember(users)
    const {
      registeredYear,
      registeredMonth,
      registeredType
    } = formatStatisticsRegisteredMember(
      lists,
      years,
      months,
      USER_TYPES.map((item: any) => (item.value))
    )
    filterUserByYear(registeredYear)
    filterUserByMonth(registeredMonth)
    filterUserByActivity(registeredType)
  }

  const filterUserByYear = (registeredYear: any) => {
    
    setDataYear({
      labels: labelsYear,
      datasets: [
        {
          label: 'Membre inscrit',
          data: registeredYear,
          backgroundColor: 'rgba(18, 200, 255, 0.5)',
        }
      ]
    })
  }

  const filterUserByMonth = (registeredMonth: any) => {
    setDataMonth({
      labels: labelsMonth,
      datasets: [
        {
          label: 'Membre inscrit',
          data: registeredMonth,
          backgroundColor: 'rgba(18, 200, 255, 0.5)',
        }
      ]
    })
  }

  const filterUserByActivity = (registeredType: any) => {
    setDataTypes({
      labels: labesType,
      datasets: [
        {
          data: registeredType,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(10, 86, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(10, 86, 132, 1)'
          ],
          borderWidth: 1,
        },
      ],
    })
  }

  useEffect(() => {
    filterStatistics()
  }, [users])

  useEffect(() => {
    if(data != undefined) loadUserList()
  }, [data])

  return {
    dataYear,
    dataMonth,
    dataTypes,
    options,
    loading
  }
}

export const usePresenceStatistics = () => {
  const { data, status }: any = useSession()
  /**
   * state list user 
   */
  const [presence, setPresence] = useState<Array<any>>([])

  /**
   * state for the chart 
   */
  const [dataPresence, setDatapresence] = useState<any>(initialLabel)
  const [dataAveragePresence, setAverageDatapresence] = useState<any>(initialLabel)

  const [loading, setLoading] = useState<boolean>(false)

  /**
   * options for graph
   */
  const options: any = {
    maintainAspectRatio: false,
    stacked: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
        position: 'bottom' as const
      },
      y: {
        beginAtZero: true,
        // max: 250,
        ticks: {
          maxTicksLimit: 5,
          stepSize: 25,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  }

  const loadUserList = async () => {
    setLoading(true)
    try{
      const token = data ? data.accessToken : null
      const query = {
        isPresent: 1,
        'date[strictly_after]': moment().subtract(1,'year').endOf('year').format('YYYY-MM-DD')
      }
      const result = await getAllPresence(token, formatQueryPresenceParams(query))
      setPresence(result[RESPONSE_ATTR.data])
    }catch(e: any){
      console.log('error load user', e)
      if(e.response && e.response.status == 401){
        alertErrorToken()
        logOut()
      }else{
        alertErrorOccured()
      }
    }finally{
      setLoading(false)
    }
  }

  const filterUserPresence = () => {
    const {
      presence: presenceMember,
      averagePresence
    } = formatPresenceData(presence);
    setDatapresence({
      labels: presenceMember.labels,
      datasets: [
        {
          label: 'Membre présent',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(13, 202, 240, 1)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          data: presenceMember.counts,
          xAxisId: 'x'
        }
      ]
    })

    setAverageDatapresence({
      labels: months,
      datasets: [
        {
          label: 'Membre présent',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(13, 202, 240, 1)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          data: averagePresence,
          xAxisId: 'x'
        }
      ]
    })
  }

  useEffect(() => {
    filterUserPresence()
  }, [presence])

  useEffect(() => {
    if(data != undefined) loadUserList()
  }, [data])

  return {
    dataPresence,
    dataAveragePresence,
    options,
    loading
  }
}