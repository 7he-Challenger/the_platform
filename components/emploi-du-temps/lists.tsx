import { Table } from "react-bootstrap"

type ListActivitiesType = {
  lists: Array<any>
}

const ListActivities = ({
  lists
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
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default ListActivities