import { useTranslation } from "react-i18next";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function Employees() {
  const { t } = useTranslation();

  return (
    <>
      <Heading as="h1">{t("employees.heading")}</Heading>
      <SignupForm />
    </>
  );
}

export default Employees;
