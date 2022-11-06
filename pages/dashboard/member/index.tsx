import { AdminLayout } from '~layout'
import type { NextPage } from 'next'

import { Button, Card, Modal } from 'react-bootstrap';
import useMember from '~hooks/useMember';
import CreateMember from '~components/membre/create';
import ListUsers from '~components/membre/lists';
import { getSession } from 'next-auth/react';
import { getUsers } from '~repositories/users';
import { RESPONSE_ATTR } from '~constantes/response-attr';
import { logOut } from '~lib/auth';
import PaginationMember from '~components/membre/pagination';
import MemberFilter from '~components/membre/filter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBan, faCheck, faClose, faPencil, faTrash, faEye, faLock } from "@fortawesome/free-solid-svg-icons"

const Member: NextPage = (props) => {
  const {
    listUsers,
    total
  } = props as any
  const {
    showCreate,
    hideCreate,
    create,
    toUpdate,
    members,
    handleSaveUser,
    handleDeleteUser,
    handleEditUser,
    totalItem,
    query: queryUser,
    handleNavigatePage,
    handleCancelUser,
    submitFilter,
    resetFilter,
    handleFilterChange
  } = useMember(listUsers, total)

  return (
    <AdminLayout>
      <MemberFilter 
        filter={queryUser}
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
              <FontAwesomeIcon icon={faPencil} size="sm"></FontAwesomeIcon>
              &nbsp;
              Nouveau membre
            </Button>
          </div>
          
        </Card.Header>
        <Card.Body>
          <ListUsers 
            lists={members}
            handleDelete={handleDeleteUser}
            handleEdit={handleEditUser}
            handleCancel={handleCancelUser}
          />
        </Card.Body>
        <Card.Footer>
          <PaginationMember 
            current={queryUser.page || 1}
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
          <CreateMember 
            toUpdate={toUpdate}
            submitUser={handleSaveUser}
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
    let users: { [key: string]: any[] } = await getUsers(session.accessToken, {
      page: 1,
      'order[id]': 'desc'
    })

    return {
      props: {
        listUsers: users ? users[RESPONSE_ATTR.data] : [],
        total: users ? users[RESPONSE_ATTR.total] : 0 
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
        listUsers: [],
        total: 0 
      }
    }
  }

  
}

export default Member