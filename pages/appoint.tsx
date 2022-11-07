import { NextPage } from "next";
import Head from "next/head";
import { Row } from "react-bootstrap";
import SearchMember from "~components/Appoint/SearchMember";
import TableHeaderAppoint from "~components/Appoint/TableHeaderAppoint";
import TableRowAttendance from "~components/Appoint/TableRowAttendance";
import { AdminLayout } from "~layout";

/**
 * Attend page
 * @returns {NextPage}
 */
const Page: NextPage = () => (
  <>
    <div>
      <Head>
        <title>Présence</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <AdminLayout>
        <SearchMember />
        <Row>
          <div className="container-fluid">
            <table className="table border mb-0">
              <TableHeaderAppoint />
              <tbody>
                <TableRowAttendance
                  name="Roger Gerard"
                  photoUrl="favicon.ico"
                  key={"azer"}
                />
              </tbody>
            </table>
          </div>
        </Row>
      </AdminLayout>
    </div>
  </>
);

export default Page;
