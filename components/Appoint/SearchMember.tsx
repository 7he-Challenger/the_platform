import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchMember(): JSX.Element {
  return (
    <>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label fw-bold ml-2">
          Rechercher
        </label>
        <div className="col-sm-9">
          <input type="text" className="form-control" id="search" />
        </div>
        <button className="col-sm-1 btn btn-primary text-center">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </>
  );
}

export default SearchMember;
