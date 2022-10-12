import { faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ProgressBar, Dropdown, Button } from "react-bootstrap";

/**
 * Header of the table in the page "/appoint"
 *
 * @returns {JSX.Element}
 */
function TableRowAttendance(): JSX.Element {
  return (
    <tr className="align-middle">
      <td className="text-center">
        <div className="avatar avatar-md d-inline-flex position-relative">
          <Image
            width={128}
            height={128}
            className="rounded-circle"
            src="https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg"
            alt="user@email.com"
          />
        </div>
      </td>
      <td>
        <div>Yiorgos Avraamu</div>
        <div className="small text-black-50">
          <span>New</span> | Registered: Jan 1, 2020
        </div>
      </td>
      <td>
        <div className="clearfix">
          <div className="float-start">
            <div className="fw-semibold">50%</div>
          </div>
          <div className="float-end">
            <small className="text-black-50">Jun 11, 2020 - Jul 10, 2020</small>
          </div>
        </div>
        <ProgressBar className="progress-thin" variant="success" now={50} />
      </td>
      <td className="text-center">
        <FontAwesomeIcon icon={faCcAmex} size="lg" fixedWidth />
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
