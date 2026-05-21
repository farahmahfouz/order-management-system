import { useTranslation } from "react-i18next";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SalesReport from "../features/reports/SalesReport";

function Reports() {
  const { t } = useTranslation();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("reports.heading")}</Heading>
      </Row>
      <SalesReport />
    </>
  );
}

export default Reports;
