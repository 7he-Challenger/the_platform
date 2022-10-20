import { AdminLayout } from '~layout'
import type { NextPage } from 'next'

import { getSession } from 'next-auth/react';
import { getActivities } from '~repositories/activities';
import { RESPONSE_ATTR } from '~constantes/response-attr';
import { logOut } from '~lib/auth';
import dynamic from "next/dynamic";
const Calendar = dynamic(() => import("~/components/calendar"), {
  ssr: false
});

const EmploiDuTemps: NextPage = (props) => {
  const {
    listsActivities,
    total
  } = props as any

  return (
    <AdminLayout>
      <Calendar events={listsActivities}/>
    </AdminLayout>
  )
}

export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context)
  
  // the token to send in axios instance
  try {
    let activities: { [key: string]: any[] } = await getActivities(session.accessToken)

    return {
      props: {
        listsActivities: activities ? activities[RESPONSE_ATTR.data] : [],
        total: activities ? activities[RESPONSE_ATTR.total] : 0 
      }
    }
  }catch(e){
    console.log(e)
    logOut()
    return {
      // redirect: {
      //   destination: ROUTES.login.path,
      //   permanent: false
      // }
      props: {
        listsActivities: [],
        total: 0 
      }
    }
  }

  
}

export default EmploiDuTemps