import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ orders }) {
  // 1.
  const numOrders = orders?.length;

  // 2.
  const sales = orders?.reduce((acc, cur) => acc + cur.totalCost, 0);

  // 3.
  const uniqueCutomers =  [...new Set(orders?.map(order => order.customerName))].length;

  // 4.
const completedOrders = orders?.filter(order => order.status === "completed");
  const averageOrderValue = completedOrders?.length > 0 ? sales / completedOrders?.length : 0;

  return (
    <>
      <Stat
        title="Orders"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOrders}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Customer Numbers"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={uniqueCutomers}
      />
      <Stat
        title="Avg Order Value"
        color="yellow"
        icon={<HiOutlineChartBar />}
         value={formatCurrency(averageOrderValue)}
      />
    </>
  );
}

export default Stats;
