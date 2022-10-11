import { AdminLayout } from '~layout'
import type { NextPage } from 'next'

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid' 
import { useRef } from "react";
import styles from '~assets/styles/Calendar.module.css'

const EmploiDuTemps: NextPage = () => {
  const calendarRef = useRef<any>(null);
  return (
    <AdminLayout>
      <span>emploi du temps</span>
      <div className={styles.container}>
        <FullCalendar
          // innerRef={calendarRef}
          plugins={[
            timeGridPlugin, 
            interactionPlugin, 
            dayGridPlugin
          ]}
          editable
          selectable
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          }}
          initialView="dayGridMonth"
          dateClick={(info) => {
            console.log('info', info)
          }}
          height={'auto'}
        />
      </div>
    </AdminLayout>
  )
}

export default EmploiDuTemps