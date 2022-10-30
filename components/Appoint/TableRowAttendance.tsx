import Image from "next/image";
import { Button } from "react-bootstrap";
import AttendBadge from "./Utils/AttendBadge";
import cssModule from "./TableRowAttendance.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import InfoAttend from "./Utils/InfoAttend";
import AbsenceAttend from "./Utils/AbsenceAttend";
import AcceptAttend from "./Utils/AcceptAttend";

interface Member {
  // id:string;
  name: string;
  photoUrl: string;
  // attendUrl:string;
  // attendState:Number; /// State of attendance (1 if true, 0 if false, -1 if not set)
}

/**
 * Row components with the picture of the member, his/her name, his/her attendance
 * state and some button to handle an action
 * 
 * NOT-DONE
 * @returns {JSX.Element}
 */
function TableRowAttendance(props: Member): JSX.Element {
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
        <AttendBadge state={-1} />
      </td>
      <td className="text-center">
        <InfoAttend name={"Gerard Dugout"}/>
        <AcceptAttend />
        <AbsenceAttend />
      </td>
    </tr>
  );
}

export default TableRowAttendance;
