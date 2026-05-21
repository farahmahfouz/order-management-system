import { useTranslation } from "react-i18next";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import IntegrationsFeatures from "../features/integrations/IntegrationsFeatures";

function Integrations() {
  const { t } = useTranslation();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("integrations.heading")}</Heading>
      </Row>
      <IntegrationsFeatures />
    </>
  );
}

export default Integrations;
