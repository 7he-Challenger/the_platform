import { faBan, faCheck, faClose, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react";
import { Button, Table } from "react-bootstrap"
import Style from '~assets/styles/Activity.module.css';
import { formatDate } from "~lib/format";

type ListActivitiesType = {
  lists: Array<any>,
  handleEdit: Function,
  handleDelete: Function,
  handleCancel: Function
}

const ListActivities = ({
  lists,
  handleEdit,
  handleDelete,
  handleCancel
}: ListActivitiesType) => {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Thème</th>
            <th>Intervenant(e)</th>
            <th>Lieu</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Public</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            lists.map((item, index) => (
              <tr key={`activitie-${index}`}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.intervenant}</td>
                <td>{item.locale}</td>
                <td>{formatDate(item.startDate)}</td>
                <td>{formatDate(item.endDate)}</td>
                <td>
                  <FontAwesomeIcon 
                    title={
                      item.isPublic == false
                        ? "Privé"
                        : "Public"
                    }
                    icon={
                      item.isPublic == false
                        ? faClose
                        : faCheck
                    } 
                    size="lg" 
                    color={
                      item.isPublic == false
                        ? 'red'
                        : 'green'
                    }
                  />
                </td>
                <td>
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
                </td>
                <td className={Style.actionContainer}>
                  <div className="d-flex justify-content-around">
                    <Button
                      title="Supprimer activité"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button>

                    <Button
                      title="Modifier activité"
                      variant="primary"
                      onClick={() => handleEdit(item)}
                    >
                      <FontAwesomeIcon icon={faPencil} size="lg" />
                    </Button>

                    <Button
                      title={
                        item.isEnable == false 
                          ? "Confirmer l'activité"
                          : "Annuler activité"
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

export default React.memo(ListActivities)