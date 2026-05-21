import { useTranslation } from "react-i18next";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  const { t } = useTranslation();

  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">{t("dashboard.heading")}</Heading>
      </Row>
      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
