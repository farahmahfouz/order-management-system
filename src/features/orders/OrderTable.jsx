import { useTranslation } from "react-i18next";
import OrderRow from "./OrderRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useOrders } from "./useOrders";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function OrderTable() {
  const { t } = useTranslation();
  const { orders, isPending, count, limit, page } = useOrders();

  if (isPending) return <Spinner />;
  if (!orders?.length) return <Empty resourceName={t("nav.orders")} />;

  return (
    <Menus>
      <Table columns="1fr 1.8fr 1.2fr 1.2fr 1fr 0.8fr 0.6fr">
        <Table.Header>
          <div>{t("orders.columns.orderId")}</div>
          <div>{t("orders.columns.cashier")}</div>
          <div>{t("orders.columns.date")}</div>
          <div>{t("orders.columns.status")}</div>
          <div>{t("orders.columns.amount")}</div>
          <div>{t("orders.columns.qty")}</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={orders}
          render={(order) => (
            <OrderRow key={order._id} order={order} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} limit={limit} page={page} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OrderTable;
