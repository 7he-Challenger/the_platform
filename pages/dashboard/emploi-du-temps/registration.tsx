import { AdminLayout } from '~layout'
import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { logOut } from '~lib/auth'
import { getRegistrations } from '~repositories/registration'
import { RESPONSE_ATTR } from '~constantes/response-attr'
import { getPublicActivity } from '~repositories/activities'
import { Card, CardGroup, Modal } from 'react-bootstrap'
import { useEventInscriptionGesture } from '~hooks/useEmploiDuTemps'
import PaginationActivity from '~components/emploi-du-temps/pagination';
import ListRegistrations from '~components/registrations/lists';
import RegistrationFilter from '~components/registrations/filter'
import FormUpdateRegistration from '~components/registrations/update'

const EventInscriptionGesture: NextPage = (props) => {
  const {
    listInscription,
    listActivities,
    total
  } = props as any

  const {
    handleNavigatePage,
    query,
    resetFilter,
    submitFilter,
    handleFilterChange,
    activities,
    registrations,
    totalItem,
    countRegistrationByEvent,
    handleDeleteRegistrations,
    handleEditRegistrations,
    create,
    toUpdate,
    hideCreate,
    handleSaveRegistration
  } = useEventInscriptionGesture(
    listInscription,
    total,
    listActivities
  )

  return (
    <AdminLayout>
      <RegistrationFilter 
        filter={query}
        submitFilter={submitFilter}
        resetFilter={resetFilter}
        handleFilterChange={handleFilterChange}
        activities={activities}
      />
      <Card>
        <Card.Body>
          <ListRegistrations 
            lists={registrations}
            handleDelete={handleDeleteRegistrations}
            handleEdit={handleEditRegistrations}
            countRegistrationByEvent={countRegistrationByEvent}
          />
        </Card.Body>
        <Card.Footer>
          <PaginationActivity 
            current={query.page || 1}
            handleNavigate={handleNavigatePage}
            totalItem={totalItem}
          />
        </Card.Footer>
      </Card>

      {/* modal form save registration */}
      <Modal 
        show={create} 
        onHide={hideCreate}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {
          toUpdate && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  Mise à jour inscription sur { toUpdate.event.title }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormUpdateRegistration 
                  toUpdate={toUpdate}
                  submitRegistration={handleSaveRegistration}
                />
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
  
  try {
    let queryRegistrations = getRegistrations(session.accessToken, {
      page: 1
    })

    let queryActivities = getPublicActivity()

    let [registrations, activities] = await Promise.all([queryRegistrations, queryActivities])

    return {
      props: {
        listInscription: registrations ? registrations[RESPONSE_ATTR.data] : [],
        listActivities: activities,
        total: registrations ? registrations[RESPONSE_ATTR.total] : 0 
      }
    }
  }catch(e){
    console.log(e)
    logOut()

    return {
      props: {
        listInscription: [],
        listsActivities: [],
        total: 0
      }
    }
  }
}

export default EventInscriptionGesture