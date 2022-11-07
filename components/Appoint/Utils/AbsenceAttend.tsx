import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import cssModule from "../TableRowAttendance.module.css"

interface absence{
    // url:String;
    eventClick:MouseEventHandler; // Event on click
}

/**
 * Button to set an absence of a member
 * 
 * - Need to be handled by an event
 * 
 * @returns 
 */
function AbsenceAttend(props:absence) {
    return (<>
        <Button variant="danger" className={cssModule.row_button} onClick={props.eventClick}>
            <FontAwesomeIcon icon={faXmark} />
        </Button>
    </>)
}

export default AbsenceAttend;