import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import cssModule from "../TableRowAttendance.module.css"

interface absence{
    url:String
}

/**
 * Button to set an attendance of a member
 * @returns 
 */
function AcceptAttend() {
    return (<>
        <Button variant="success" className={cssModule.row_button}>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
    </>)
}

export default AcceptAttend;