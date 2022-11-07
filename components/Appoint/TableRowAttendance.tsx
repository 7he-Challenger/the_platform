import Image from "next/image";
import AttendBadge from "./Utils/AttendBadge";
import InfoAttend from "./Utils/InfoAttend";
import AbsenceAttend from "./Utils/AbsenceAttend";
import AcceptAttend from "./Utils/AcceptAttend";
import { useState } from "react";

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
 * - Need a "key" react props 
 * 
 * NOT-DONE
 * @returns {JSX.Element}
 */
function TableRowAttendance(props: Member): JSX.Element {
  const [attend,setAttend] = useState(-1)
  
  const setPresent = ()=>{
    setTimeout(()=>setAttend(1),500)
  }
  
  const setAbsent = ()=>{
    setTimeout(()=>setAttend(0),500)
  }

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
        <AttendBadge state={attend} />
      </td>
      <td className="text-center">
        <InfoAttend name={"Gerard Dugout"}/>
        <AcceptAttend eventClick={setPresent}/>
        <AbsenceAttend eventClick={setAbsent}/>
      </td>
    </tr>
  );
}

export default TableRowAttendance;
