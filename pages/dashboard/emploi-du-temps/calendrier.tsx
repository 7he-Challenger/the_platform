import { AdminLayout } from '~layout'
import type { NextPage } from 'next'

import { getSession } from 'next-auth/react';
import { getActivities } from '~repositories/activities';
import { RESPONSE_ATTR } from '~constantes/response-attr';
import { logOut } from '~lib/auth';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { formatDate, formateActivityType } from '~lib/format';
const Calendar = dynamic(() => import("../../../components/calendar"), {
  ssr: false
});

const EmploiDuTemps: NextPage = (props: any) => {
  const {
    listsActivities,
  } = props

  const [event, setEvent] = useState<any>(null)
  const showEvent = (event: any) => setEvent(event)
  const hideEvent = () => setEvent(null)

  const eventDataTransform = (e: any) => {
    return {
      extendedProps: e,
      title: e.title,
      start: e.startDate,
      end: e.endDate,
    }
  }

  return (
    <AdminLayout>
      <Calendar 
        events={listsActivities}
        eventDataTransform={eventDataTransform}
        eventClick={(e:any) => {
          showEvent(e.event.extendedProps)
        }}
      />

      <Modal 
        show={event != null} 
        onHide={hideEvent}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {
          event && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  { event.title }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ListGroup>
                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Début:</span>
                    <span>{ formatDate(event.startDate) }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Fin:</span>
                    <span>{ formatDate(event.endDate) }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Lieu:</span>
                    <span>{ event.locale }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Intervenant:</span>
                    <span>{ event.intervenant }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Type:</span>
                    <span>{ formateActivityType(event.type) }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Sponsors:</span>
                    <span>{ event.sponsors.join(", ") }</span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {
                      event.description 
                        ? (
                          <p>{ event.description }</p>
                        ) : (
                          <div className='d-flex justify-content-center align-items-center'>
                            <span>Aucune description</span>
                          </div>
                        )
                    }
                  </ListGroup.Item>
                </ListGroup>
              </Modal.Body>
            </>
          )
        }
      </Modal>
    </AdminLayout>
  )
}

export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context)
  
  // the token to send in axios instance
  try {
    let activities: any = await getActivities(session.accessToken)

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