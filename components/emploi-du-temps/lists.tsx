import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Table } from "react-bootstrap"
import Style from '~assets/styles/Activity.module.css';

type ListActivitiesType = {
  lists: Array<any>,
  handleEdit: Function,
  handleDelete: Function
}

const ListActivities = ({
  lists,
  handleEdit,
  handleDelete
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

export default ListActivities