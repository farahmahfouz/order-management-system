import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayOrders from "../dashboard/TodayOrders";
import { useOrders } from './../orders/useOrders';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { orders, isPending: isLoading1 } = useOrders();

  if (isLoading1 ) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        orders={orders}
      />
      <TodayOrders />
      <DurationChart  orders={orders} />
      <SalesChart orders={orders} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
