import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import cssModule from "../TableRowAttendance.module.css";

interface PropsModal {
  name: String; /// Name of the member
}

/**
 * Button and it's modal for viewing an attendance of a member (sorry for the english)
 * 
 * NOT-DONE
 * @param props 
 * @returns 
 */
function ModalInfoAttend(props: PropsModal):JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="secondary" className={cssModule.row_button} onClick={handleShow}>
        <FontAwesomeIcon icon={faInfo} />
      </Button>

      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Détail de présence: {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalInfoAttend;