import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import cssModule from "../TableRowAttendance.module.css"

interface absence{
    url:String
}

/**
 * Button to set an absence of a member
 * @returns 
 */
function AbsenceAttend() {
    return (<>
        <Button variant="danger" className={cssModule.row_button}>
            <FontAwesomeIcon icon={faXmark} />
        </Button>
    </>)
}

export default AbsenceAttend;