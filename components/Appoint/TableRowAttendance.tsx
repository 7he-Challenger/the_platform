import { faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ProgressBar, Dropdown, Button } from "react-bootstrap";
import AttendBadge from "./Utils/AttendBadge";

interface Member{
  // id:string;
  name:string;
  photoUrl:string;
  // attendUrl:string;
  // attendState:Number; /// State of attendance (1 if true, 0 if false, -1 if not set)
}

/**
 * Header of the table in the page "/appoint"
 *
 * @returns {JSX.Element}
 */
function TableRowAttendance(props:Member): JSX.Element {
  return (
    <tr className="align-middle">
      <td className="text-center">
        <div className="avatar avatar-md d-inline-flex position-relative">
          <Image
            width={128}
            height={128}
            className="rounded-circle"
            src={props.photoUrl}
            alt="user@email.com"
          />
        </div>
      </td>
      <td>
        <div>{props.name}</div>
      </td>
      <td className="text-center">
        <AttendBadge state={-1}/>
      </td>
      <td>
        <Dropdown align="end">
          <Dropdown.Toggle
            as="button"
            bsPrefix="btn"
            className="btn-link rounded-0 text-black-50 shadow-none p-0"
            id="action-user1"
          >
            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1"><Button variant="secondary" className="w-100">Info</Button></Dropdown.Item>
            <Dropdown.Item href="#/action-2"><Button variant="success" className="w-100">Présent(e)</Button></Dropdown.Item>
            <Dropdown.Item href="#/action-3">
              <Button variant="danger" className="w-100">Absent(e)</Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default TableRowAttendance;
