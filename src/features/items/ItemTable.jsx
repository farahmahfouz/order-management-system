import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus'
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table'
import ItemRow from './ItemRow';
import { useItems } from './useItems'

function ItemTable() {
    const { isPending, items, count, limit, page } = useItems();
    if (isPending || !items?.length) return <Spinner />
    if (!items.length) return <Empty resourceName='items' />
    return (
        <Menus>
            <Table columns="0.2fr 0.3fr 0.6fr 0.4fr 0.4fr 0.4fr 0.5fr 0.4fr 0.1fr">
                <Table.Header>
                    <div></div>
                    <div>Item</div>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div>Category</div>
                    <div>Stock Qty</div>
                    <div>Available</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={items}
                    render={item => <ItemRow key={item._id} item={item} />}
                />
                <Table.Footer>
                    <Pagination count={count} limit={limit} page={page} />
                </Table.Footer>

            </Table>
        </Menus>
    )
}

export default ItemTable