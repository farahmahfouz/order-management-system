import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SalesReport from "../features/reports/SalesReport";

function Reports() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Sales Report</Heading>
      </Row>
      <SalesReport />
    </>
  );
}

export default Reports;