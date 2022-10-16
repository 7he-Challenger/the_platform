import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import TableHeaderAppoint from "~components/Appoint/TableHeaderAppoint";
import TableRowAttendance from "~components/Appoint/TableRowAttendance";
import { AdminLayout } from "~layout";

const Page: NextPage = () => (
  <>
    <div>
      <Head>
        <title>Présence</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <AdminLayout>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold ml-2">
            Rechercher
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="search"
            />
          </div>
          <button className="col-sm-1 btn btn-primary text-center"><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <Row>
          <div className="container-fluid">
            <table className="table border mb-0">
              <TableHeaderAppoint />
              <tbody>
                <TableRowAttendance name="Roger Gerard" photoUrl="favicon.ico"/>
              </tbody>
            </table>
          </div>
        </Row>
      </AdminLayout>
    </div>
  </>
);

export default Page;
