import AddItem from "../features/items/AddItem";
import ItemTable from "../features/items/ItemTable";
import ItemTableOperations from "../features/items/ItemTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { usePermissions } from "../features/authentication/usePermissions";
import { useTranslation } from "react-i18next";

function Items() {
  const { permissions, isLoading } = usePermissions();
  const { t } = useTranslation();

  return (
    <>
      <Row type='horizontal'>
        <Heading as="h1">{t("items.heading")}</Heading>
        <ItemTableOperations />
      </Row>
      <ItemTable />
      {!isLoading && permissions.itemsWrite && <AddItem />}
    </>
  )
}

export default Items