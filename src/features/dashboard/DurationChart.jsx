import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function getValueRangeStartData(t, isDarkMode) {
  const colors = isDarkMode
    ? ["#b91c1c", "#c2410c", "#a16207", "#4d7c0f"]
    : ["#ef4444", "#f97316", "#eab308", "#84cc16"];

  return ["low", "medium", "high", "premium"].map((key, i) => ({
    key,
    category: t(`dashboard.charts.valueRange.${key}`),
    value: 0,
    color: colors[i],
  }));
}

function getStatusStartData(t, isDarkMode) {
  const statusKeys = ["completed", "pending", "cancelled", "expired"];
  const colors = isDarkMode
    ? ["#DF5333", "#424242", "#FFAF9B", "#4b5563"]
    : ["#DF5333", "#424242", "#FFAF9B", "#6b7280"];

  return statusKeys.map((key, i) => ({
    key,
    category: t(`orders.filter.${key}`),
    value: 0,
    color: colors[i],
  }));
}

function incArrayValue(arr, fieldKey) {
  return arr.map((obj) =>
    obj.key === fieldKey ? { ...obj, value: obj.value + 1 } : obj
  );
}

function prepareOrderValueData(startData, orders) {
  const data = orders
    .reduce((arr, cur) => {
      const totalCost = cur.totalCost || 0;
      if (totalCost <= 50) return incArrayValue(arr, "low");
      if (totalCost <= 100) return incArrayValue(arr, "medium");
      if (totalCost <= 200) return incArrayValue(arr, "high");
      if (totalCost > 200) return incArrayValue(arr, "premium");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function prepareOrderStatusData(startData, orders) {
  const data = orders
    .reduce((arr, cur) => {
      const status = cur.status;
      if (["completed", "pending", "cancelled", "expired"].includes(status)) {
        return incArrayValue(arr, status);
      }
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function OrdersDistributionChart({ orders = [], chartType = "status" }) {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  let startData, data, title;

  if (chartType === "value") {
    startData = getValueRangeStartData(t, isDarkMode);
    data = prepareOrderValueData(startData, orders);
    title = t("dashboard.charts.byValueRange");
  } else {
    startData = getStatusStartData(t, isDarkMode);
    data = prepareOrderStatusData(startData, orders);
    title = t("dashboard.charts.byStatus");
  }

  if (!data.length) {
    return (
      <ChartBox>
        <Heading as="h2">{title}</Heading>
        <p>{t("dashboard.charts.noData")}</p>
      </ChartBox>
    );
  }

  return (
    <ChartBox>
      <Heading as="h2">{title}</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="category"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.key}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default OrdersDistributionChart;
