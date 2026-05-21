import { useTranslation } from 'react-i18next';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus'
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table'
import ItemRow from './ItemRow';
import { useItems } from './useItems'

function ItemTable() {
    const { isPending, items, count, limit, page } = useItems();
    const { t } = useTranslation();
    if (isPending) return <Spinner />

    if (!items?.length) return <Empty resourceName="items" />
    return (
        <Menus>
            <Table columns="0.2fr 0.3fr 0.6fr 0.4fr 0.4fr 0.4fr 0.5fr 0.4fr 0.1fr">
                <Table.Header>
                    <div></div>
                    <div>{t("items.columns.item")}</div>
                    <div>{t("items.columns.name")}</div>
                    <div>{t("items.columns.price")}</div>
                    <div>{t("items.columns.discount")}</div>
                    <div>{t("items.columns.category")}</div>
                    <div>{t("items.columns.stockQty")}</div>
                    <div>{t("items.columns.available")}</div>
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