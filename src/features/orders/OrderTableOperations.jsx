import { useTranslation } from "react-i18next";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
  const { t } = useTranslation();

  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: t("orders.filter.all") },
          { value: "completed", label: t("orders.filter.completed") },
          { value: "pending", label: t("orders.filter.pending") },
          { value: "cancelled", label: t("orders.filter.cancelled") },
          { value: "expired", label: t("orders.filter.expired") },
        ]}
      />

      <SortBy
        options={[
          { value: "-createdAt", label: t("orders.sort.dateDesc") },
          { value: "createdAt", label: t("orders.sort.dateAsc") },
          { value: "-totalCost", label: t("orders.sort.amountDesc") },
          { value: "totalCost", label: t("orders.sort.amountAsc") },
        ]}
      />
    </TableOperations>
  );
}

export default OrderTableOperations;
