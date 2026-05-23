import { useTranslation } from "react-i18next";
import Heading from "../ui/Heading";
import Row from './../ui/Row';
import UserTableOperations from '../features/employees/UserTableOberations';
import UserTable from '../features/employees/UserTable';
import { usePermissions } from './../features/authentication/usePermissions';
import AddUser from "../features/employees/AddUser";

function Employees() {
  const { t } = useTranslation();
  const { permissions, isLoading } = usePermissions();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("employees.heading")}</Heading>
        <UserTableOperations />
      </Row>
      <UserTable />
      {!isLoading && permissions.users && <AddUser />}
    </>
  );
}

export default Employees;
