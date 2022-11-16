import { faBan, faCheck, faClose, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react";
import { Button, Table } from "react-bootstrap"
import Style from '~assets/styles/Activity.module.css';
import { formatDate } from "~lib/format";

type ListRegistrationsType = {
  lists: Array<any>,
  handleEdit: Function,
  handleDelete: Function,
  countRegistrationByEvent: Function
}

const ListRegistrations = ({
  lists,
  handleEdit,
  handleDelete,
  countRegistrationByEvent
}: ListRegistrationsType) => {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Evènement</th>
            <th>Email</th>
            <th>Nombre seat</th>
            <th>Date d&rsquo;inscription</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            lists.map((item, index) => (
              <tr key={`registrations-${index}`}>
                <td>{index + 1}</td>
                <td>{item.event.title} ({countRegistrationByEvent(item.event.id)})</td>
                <td>{item.email}</td>
                <td>{item.seatNumber}</td>
                <td>{formatDate(item.registrationDate)}</td>
                <td className={Style.actionContainer}>
                  <div className="d-flex justify-content-around">
                    <Button
                      className="rounded-circle"
                      title="Modifier inscription"
                      variant="success"
                      onClick={() => handleEdit(item)}
                    >
                      <FontAwesomeIcon icon={faPencil} size="sm" />
                    </Button>

                    <Button
                      className="rounded-circle"
                      title="Supprimer inscription"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="sm" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default React.memo(ListRegistrations)