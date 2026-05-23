import { useTranslation } from "react-i18next";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ orders }) {
  const { t } = useTranslation();

  const numOrders = orders?.length;
  const sales = orders?.reduce((acc, cur) => acc + cur.totalCost, 0);
  const uniqueCustomers = [
    ...new Set(orders?.map((order) => order.customerName)),
  ].length;

  const completedOrders = orders?.filter(
    (order) => order.status === "completed"
  );
  const averageOrderValue =
    completedOrders?.length > 0 ? sales / completedOrders.length : 0;

  return (
    <>
      <Stat
        title={t("dashboard.stats.orders")}
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOrders}
      />
      <Stat
        title={t("dashboard.stats.sales")}
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales) ?? 0}
      />
      <Stat
        title={t("dashboard.stats.customers")}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={uniqueCustomers}
      />
      <Stat
        title={t("dashboard.stats.avgOrderValue")}
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={formatCurrency(averageOrderValue)}
      />
    </>
  );
}

export default Stats;
