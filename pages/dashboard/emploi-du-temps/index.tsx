import { AdminLayout } from '~layout'
import type { NextPage } from 'next'

import { Button, Card, Modal } from 'react-bootstrap';
import useEmploiDuTemps from '~hooks/useEmploiDuTemps';
import CreateEmploiDuTemps from '~components/emploi-du-temps/create';
import ListActivities from '~components/emploi-du-temps/lists';
import { getSession } from 'next-auth/react';
import { getActivities } from '~repositories/activities';
import { RESPONSE_ATTR } from '~constantes/response-attr';
import { logOut } from '~lib/auth';
import PaginationActivity from '~components/emploi-du-temps/pagination';
import ActivityFilter from '~components/emploi-du-temps/filter';
import { faBan, faCheck, faClose, faPencil, faRefresh, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const EmploiDuTemps: NextPage = (props) => {
  const {
    listsActivities,
    total
  } = props as any
  const {
    showCreate,
    hideCreate,
    create,
    toUpdate,
    activities,
    handleSaveActivity,
    handleDeletActivity,
    handleEditActivity,
    totalItem,
    query: queryActivity,
    handleNavigatePage,
    handleCancelActivity,
    submitFilter,
    resetFilter,
    handleFilterChange
  } = useEmploiDuTemps(listsActivities, total)

  return (
    <AdminLayout>
      <ActivityFilter 
        filter={queryActivity}
        submitFilter={submitFilter}
        resetFilter={resetFilter}
        handleFilterChange={handleFilterChange}
      />
      <Card>
        <Card.Header>
          <div className='d-flex justify-content-end align-items-center'>
            <Button 
              variant="primary"
              onClick={showCreate}
            >
              <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
              &nbsp;
              Nouvelle activité
            </Button>
          </div>
          
        </Card.Header>
        <Card.Body>
          <ListActivities 
            lists={activities}
            handleDelete={handleDeletActivity}
            handleEdit={handleEditActivity}
            handleCancel={handleCancelActivity}
          />
        </Card.Body>
        <Card.Footer>
          <PaginationActivity 
            current={queryActivity.page || 1}
            handleNavigate={handleNavigatePage}
            totalItem={totalItem}
          />
        </Card.Footer>
      </Card>

      {/* modal form save activity */}
      <Modal 
        show={create} 
        onHide={hideCreate}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {
              toUpdate 
                ? 'Mise à jour'
                : 'Création'
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateEmploiDuTemps 
            toUpdate={toUpdate}
            submitActivity={handleSaveActivity}
          />
        </Modal.Body>
      </Modal>
    </AdminLayout>
  )
}

export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context)
  
  // the token to send in axios instance
  try {
    let activities: { [key: string]: any[] } = await getActivities(session.accessToken, {
      page: 1,
      'order[id]': 'desc'
    })

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