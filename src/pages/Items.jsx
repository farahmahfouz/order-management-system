import AddItem from "../features/items/AddItem";
import ItemTable from "../features/items/ItemTable";
import ItemTableOperations from "../features/items/ItemTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { usePermissions } from "../features/authentication/usePermissions";

function Items() {
  const { permissions, isLoading } = usePermissions();

  return (
    <>
      <Row type='horizontal'>
        <Heading as="h1">All Items</Heading>
        <ItemTableOperations/>
      </Row>
      <ItemTable/>
      {!isLoading && permissions.itemsWrite && <AddItem/>}
    </>
  )
}

export default Items