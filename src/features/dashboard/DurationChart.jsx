import styled from "styled-components";
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
  /* Box */
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

const startDataLight = [
  {
    category: "Low ($0-50)",
    value: 0,
    color: "#ef4444",
  },
  {
    category: "Medium ($51-100)",
    value: 0,
    color: "#f97316",
  },
  {
    category: "High ($101-200)",
    value: 0,
    color: "#eab308",
  },
  {
    category: "Premium ($201+)",
    value: 0,
    color: "#84cc16",
  },
];

const startDataDark = [
  {
    category: "Low ($0-50)",
    value: 0,
    color: "#b91c1c",
  },
  {
    category: "Medium ($51-100)",
    value: 0,
    color: "#c2410c",
  },
  {
    category: "High ($101-200)",
    value: 0,
    color: "#a16207",
  },
  {
    category: "Premium ($201+)",
    value: 0,
    color: "#4d7c0f",
  },
];

const orderStatusDataLight = [
  {
    category: "Completed",
    value: 0,
    color: "#DF5333", 
  },
  {
    category: "Pending",
    value: 0,
    color: "#424242",
  },
  {
    category: "Cancelled",
    value: 0,
    color: "#FFAF9B", 
  },
  {
    category: "Expired",
    value: 0,
    color: "#6b7280", 
  },
];

const orderStatusDataDark = [
  {
    category: "Completed",
    value: 0,
    color: "#DF5333",
  },
  {
    category: "Pending",
    value: 0,
    color: "#424242",
  },
  {
    category: "Cancelled",
    value: 0,
    color: "#FFAF9B",
  },
  {
    category: "Expired",
    value: 0,
    color: "#4b5563",
  },
];

function prepareOrderValueData(startData, orders) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.category === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = orders
    .reduce((arr, cur) => {
      const totalCost = cur.totalCost || 0;
      if (totalCost <= 50) return incArrayValue(arr, "Low ($0-50)");
      if (totalCost <= 100) return incArrayValue(arr, "Medium ($51-100)");
      if (totalCost <= 200) return incArrayValue(arr, "High ($101-200)");
      if (totalCost > 200) return incArrayValue(arr, "Premium ($201+)");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function prepareOrderStatusData(startData, orders) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.category === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = orders
    .reduce((arr, cur) => {
      const status = cur.status;
      if (status === "completed") return incArrayValue(arr, "Completed");
      if (status === "pending") return incArrayValue(arr, "Pending");
      if (status === "cancelled") return incArrayValue(arr, "Cancelled");
      if (status === "expired") return incArrayValue(arr, "Expired");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function OrdersDistributionChart({ orders = [], chartType = "status" }) {
  const { isDarkMode } = useDarkMode();
  
  let startData, data, title;
  
  if (chartType === "value") {
    startData = isDarkMode ? startDataDark : startDataLight;
    data = prepareOrderValueData(startData, orders);
    title = "Orders by Value Range";
  } else {
    startData = isDarkMode ? orderStatusDataDark : orderStatusDataLight;
    data = prepareOrderStatusData(startData, orders);
    title = "Orders by Status";
  }

  if (!data.length) {
    return (
      <ChartBox>
        <Heading as="h2">{title}</Heading>
        <p>No data available</p>
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
                key={entry.category}
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