import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Header of the table in the page "/appoint"
 * 
 * @returns {JSX.Element}
 */
function TableHeaderAppoint(): JSX.Element {
    return <thead className="table-light fw-semibold">
        <tr className="align-middle">
            <th className="text-center">
                <FontAwesomeIcon icon={faUsers} fixedWidth />
            </th>
            <th>Nom du membre</th>
            <th>Fréquence de présence</th>
            <th className="text-center">État de présence actuel</th>
            <th aria-label="Action" />
        </tr>
    </thead>;
}

export default TableHeaderAppoint;