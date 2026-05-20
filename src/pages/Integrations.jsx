import Heading from "../ui/Heading";
import Row from "../ui/Row";
import IntegrationsFeatures from "../features/integrations/IntegrationsFeatures";

function Integrations() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Automations & Integrations</Heading>
      </Row>
      <IntegrationsFeatures />
    </>
  );
}

export default Integrations;