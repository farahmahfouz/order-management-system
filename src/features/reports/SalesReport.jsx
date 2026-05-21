import { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { HiOutlineArrowDownTray, HiOutlineFunnel } from "react-icons/hi2";

import { useSalesReport } from "./useSalesReport";
import { exportSalesReportCSV } from "../../services/apiReports";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const FilterBar = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2rem 2.4rem;
  display: flex;
  align-items: flex-end;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  & label {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-grey-600);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  & input {
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 2rem;
`;

const StatCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2rem 2.4rem;

  & h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-grey-500);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.8rem;
  }

  & p {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--color-grey-800);
  }
`;

const TableCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const TableTitle = styled.div`
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.4rem;

  & th {
    background-color: var(--color-grey-50);
    padding: 1.2rem 2rem;
    text-align: start;
    font-weight: 600;
    color: var(--color-grey-600);
    border-bottom: 1px solid var(--color-grey-100);
  }

  & td {
    padding: 1.2rem 2rem;
    color: var(--color-grey-700);
    border-bottom: 1px solid var(--color-grey-100);
  }

  & tr:last-child td {
    border-bottom: none;
  }
  & tr:hover td {
    background-color: var(--color-grey-50);
  }
`;

const ChartCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;

  & h3 {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-700);
    margin-bottom: 2rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: var(--color-grey-500);
  font-size: 1.6rem;
`;

function SalesReport() {
  const { t } = useTranslation();
  const today = format(new Date(), "yyyy-MM-dd");
  const firstOfMonth = format(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    "yyyy-MM-dd"
  );

  const [startDate, setStartDate] = useState(firstOfMonth);
  const [endDate, setEndDate] = useState(today);
  const [waiterFilter, setWaiterFilter] = useState("");
  const [applied, setApplied] = useState({
    startDate: firstOfMonth,
    endDate: today,
    waiter: "",
  });

  const { data, isPending } = useSalesReport({
    startDate: applied.startDate,
    endDate: applied.endDate,
    waiter: applied.waiter,
    enabled: true,
  });

  const totalRevenue =
    data?.reduce((sum, r) => sum + parseFloat(r.revenue), 0).toFixed(2) || "0.00";
  const totalItems = data?.reduce((sum, r) => sum + r.totalItemsSold, 0) || 0;
  const totalCommission =
    data?.reduce((sum, r) => sum + parseFloat(r.totalCommission), 0).toFixed(2) ||
    "0.00";

  const chartData =
    data?.map((r) => ({
      name: r.waiter || t("reports.unknown"),
      Revenue: parseFloat(r.revenue),
      Commission: parseFloat(r.totalCommission),
      Items: r.totalItemsSold,
    })) || [];

  async function handleExport() {
    try {
      await exportSalesReportCSV({
        startDate: applied.startDate,
        endDate: applied.endDate,
        waiter: applied.waiter,
      });
      toast.success(t("reports.exportSuccess"));
    } catch {
      toast.error(t("reports.exportError"));
    }
  }

  return (
    <Section>
      <FilterBar>
        <FilterGroup>
          <label>{t("reports.startDate")}</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <label>{t("reports.endDate")}</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <label>{t("reports.waiterName")}</label>
          <input
            type="text"
            placeholder={t("reports.waiterPlaceholder")}
            value={waiterFilter}
            onChange={(e) => setWaiterFilter(e.target.value)}
          />
        </FilterGroup>

        <Button
          onClick={() =>
            setApplied({ startDate, endDate, waiter: waiterFilter })
          }
        >
          <HiOutlineFunnel /> {t("reports.apply")}
        </Button>

        <Button variation="secondary" onClick={handleExport}>
          <HiOutlineArrowDownTray /> {t("reports.exportCsv")}
        </Button>
      </FilterBar>

      {isPending ? (
        <Spinner />
      ) : !data?.length ? (
        <EmptyState>{t("reports.empty")}</EmptyState>
      ) : (
        <>
          <StatsGrid>
            <StatCard>
              <h4>{t("reports.stats.totalRevenue")}</h4>
              <p>{t("reports.currency", { amount: totalRevenue })}</p>
            </StatCard>
            <StatCard>
              <h4>{t("reports.stats.totalItemsSold")}</h4>
              <p>{totalItems}</p>
            </StatCard>
            <StatCard>
              <h4>{t("reports.stats.totalCommission")}</h4>
              <p>{t("reports.currency", { amount: totalCommission })}</p>
            </StatCard>
            <StatCard>
              <h4>{t("reports.stats.waiters")}</h4>
              <p>{data.length}</p>
            </StatCard>
          </StatsGrid>

          <ChartCard>
            <h3>{t("reports.chart.title")}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Revenue"
                  name={t("reports.chart.revenue")}
                  fill="var(--color-brand-600)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Commission"
                  name={t("reports.chart.commission")}
                  fill="var(--color-green-700)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <TableCard>
            <TableTitle>{t("reports.table.title")}</TableTitle>
            <Table>
              <thead>
                <tr>
                  <th>{t("reports.table.waiter")}</th>
                  <th>{t("reports.table.itemsSold")}</th>
                  <th>{t("reports.table.revenue")}</th>
                  <th>{t("reports.table.commission")}</th>
                  <th>{t("reports.table.food")}</th>
                  <th>{t("reports.table.beverages")}</th>
                  <th>{t("reports.table.others")}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td>{row.waiter || "—"}</td>
                    <td>{row.totalItemsSold}</td>
                    <td>{t("reports.currency", { amount: row.revenue })}</td>
                    <td>
                      {t("reports.currency", { amount: row.totalCommission })}
                    </td>
                    <td>{row.categoryBreakdown?.food || 0}</td>
                    <td>{row.categoryBreakdown?.beverages || 0}</td>
                    <td>{row.categoryBreakdown?.others || 0}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableCard>
        </>
      )}
    </Section>
  );
}

export default SalesReport;
