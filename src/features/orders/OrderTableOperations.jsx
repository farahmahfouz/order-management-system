import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "completed", label: "Completed" },
          { value: "pending", label: "Pending" },
          { value: "cancelled", label: "Cancelled" },
          { value: "expired", label: "Expired" },
        ]}
      />

      <SortBy
        options={[
          { value: "-createdAt", label: "Sort by date (recent first)" },
          { value: "createdAt", label: "Sort by date (earlier first)" },
          {
            value: "-totalCost",
            label: "Sort by amount (high first)",
          },
          { value: "totalCost", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default OrderTableOperations;
