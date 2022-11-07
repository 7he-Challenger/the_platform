import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import cssModule from "../TableRowAttendance.module.css"

interface presence{
    // url:String;
    eventClick:MouseEventHandler;
}

/**
 * Button to set an attendance of a member
 * @returns 
 */
function AcceptAttend(props:presence) {
    return (<>
        <Button variant="success" className={cssModule.row_button} onClick={props.eventClick}>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
    </>)
}

export default AcceptAttend;