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
            <th>Date</th>
            <th>Heure</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            lists.map((item, index) => (
              <tr key={`activitie-${index}`}>
                <td>{item.id}</td>
                <td>{item.theme}</td>
                <td>{item.intervenant}</td>
                <td>{item.lieu}</td>
                <td>{item.date}</td>
                <td>{item.heure}</td>
                <td><span>test</span></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default ListActivities