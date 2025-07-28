import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ orders = [] }) {
  const { isDarkMode } = useDarkMode();

  if (!orders || !Array.isArray(orders)) {
    return (
      <StyledSalesChart>
        <Heading as="h2">No sales data available</Heading>
      </StyledSalesChart>
    );
  }

  const numDays = 7;
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    const dayOrders = orders.filter((order) => 
      order && 
      order.createdAt && 
      isSameDay(new Date(order.createdAt), date)
    );

    const completedOrders = dayOrders.filter(order => order.status === "completed");
    const pendingOrders = dayOrders.filter(order => order.status === "pending");
    
    const completedSales = completedOrders.reduce((sum, order) => sum + (order.totalCost || 0), 0);
    
    const pendingSales = pendingOrders.reduce((sum, order) => sum + (order.totalCost || 0), 0);
    
    const extrasSales = completedSales * 0.15;


    return {
      label: format(date, "MMM dd"),
      totalSales: completedSales, 
      extrasSales: extrasSales,
      pendingSales: pendingSales,
      date: format(date, "yyyy-MM-dd"),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#FFAF9B", fill: "#FFAF9B" },
        extrasSales: { stroke: "#424242", fill: "#424242" },
        pendingSales: { stroke: "#DF5333", fill: "#DF5333" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#FFAF9B", fill: "#FFAF9B" },
        extrasSales: { stroke: "#424242", fill: "#424242" },
        pendingSales: { stroke: "#DF5333", fill: "#DF5333" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip 
            contentStyle={{ backgroundColor: colors.background }}
            labelStyle={{ color: colors.text }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Completed sales"
            unit="$"
          />
          <Area
            dataKey="pendingSales"
            type="monotone"
            stroke={colors.pendingSales.stroke}
            fill={colors.pendingSales.fill}
            strokeWidth={2}
            name="Pending sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;