import { faBan, faCheck, faClose, faPencil, faTrash, faEye, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react";
import { Button, ListGroup, Modal, Table } from "react-bootstrap"
import Style from '~assets/styles/Activity.module.css';
import { formatDate, formatRoleType, formatUserType } from "~lib/format-user";

type ListUsersType = {
  lists: Array<any>,
  handleEdit: Function,
  handleDelete: Function,
  handleCancel: Function
}

const ListUsers = ({
  lists,
  handleEdit,
  handleDelete,
  handleCancel
}: ListUsersType) => {

  const [event, setEvent] = useState<any>(null)
  const showEvent = (event: any) => setEvent(event)
  const hideEvent = () => setEvent(null)

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom d&rsquo;utilisateur</th>
            <th>Nom</th>
            <th>Prénom(s)</th>
            <th>Type</th>
            <th>Date de création</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            lists.map((item, index) => (
              <tr key={`user-${index}`}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.lastname}</td>
                <td>{item.firstname}</td>
                <td>{formatUserType(item.userType ? item.userType : 1)}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                    <Button
                      title="Détails membre"
                      variant="dark"
                      onClick={() => showEvent(item)}
                    >
                      ...
                    </Button>
                </td>
                <td className={Style.actionContainer}>
                  <div className="d-flex justify-content-around">
                    <Button
                      title="Supprimer membre"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button>

                    <Button
                      title="Modifier membre"
                      variant="primary"
                      onClick={() => handleEdit(item)}
                    >
                      <FontAwesomeIcon icon={faPencil} size="lg" />
                    </Button>

                    <Button
                      title="Modifier le mot de passe"
                      variant="dark"
                      // onClick={() => handleEditPassword(item)}
                    >
                      <FontAwesomeIcon icon={faLock} size="lg" />
                    </Button>
                
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>

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
                  Détails du Membre
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ListGroup>
                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Créer le :</span>
                    <span>{ formatDate(event.createdAt) }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Nom d&rsquo;utilisateur:</span>
                    <span>{ event.username }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Nom Complet:</span>
                    <span>{ event.lastname } { event.firstname }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Rôle:</span>
                    <span>{ formatRoleType(event.role) }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Type:</span>
                    <span>{ formatUserType(event.userType) }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Adresse:</span>
                    <span>{ event.userInfo?.address }</span>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Phone:</span>
                    <span>{ event.userInfo?.phone }</span>
                  </ListGroup.Item>
                </ListGroup>
              </Modal.Body>
            </>
          )
        }
      </Modal>
    </div>
  )
}

export default React.memo(ListUsers)