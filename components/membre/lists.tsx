import { faBan, faCheck, faClose, faPencil, faTrash, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react";
import { Button, Table } from "react-bootstrap"
import Style from '~assets/styles/Activity.module.css';
import { formatDate, formateUserType } from "~lib/format-user";

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
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom d&rsquo;utilisateur</th>
            <th>Nom</th>
            <th>Prénom(s)</th>
            <th>Rôle</th>
            <th>Date de création</th>
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
                <td>{formateUserType(item.roles)}</td>
                <td>{formatDate(item.createdAt)}</td>
                {/* <td>
                  <FontAwesomeIcon 
                    title={
                      item.isEnable == false
                        ? "Annulé"
                        : "Validé"
                    }
                    icon={
                      item.isEnable == false
                        ? faBan
                        : faCheck
                    } 
                    size="lg" 
                    color={
                      item.isEnable == false
                        ? 'red'
                        : 'green'
                    }
                  />
                </td> */}
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
                      title="Détails membre"
                      variant="dark"
                      // onClick={() => handleView(item)}
                    >
                      <FontAwesomeIcon icon={faEye} size="lg" />
                    </Button>

                    {/* <Button
                      title={
                        item.isEnable == false 
                          ? "Confirmer l'membre"
                          : "Annuler membre"
                      }
                      variant="dark"
                      onClick={() => {
                        item.isEnable == false 
                          ? handleCancel(item.id, true)
                          : handleCancel(item.id)
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={
                          item.isEnable == false
                            ? faCheck
                            : faClose
                        } 
                        size="lg" 
                      />
                    </Button> */}
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

export default React.memo(ListUsers)