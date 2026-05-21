import { useTranslation } from "react-i18next";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  const { t } = useTranslation();

  return (
    <>
      <Heading as="h1">{t("account.heading")}</Heading>

      <Row>
        <Heading as="h3">{t("account.updateUserData")}</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">{t("account.updatePassword")}</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
