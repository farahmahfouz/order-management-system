import { useQuery } from "@tanstack/react-query";
import { getSalesReport } from "../../services/apiReports";

export function useSalesReport({ startDate, endDate, waiter, enabled }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["sales-report", startDate, endDate, waiter],
    queryFn: () => getSalesReport({ startDate, endDate, waiter }),
    enabled: !!enabled && !!startDate && !!endDate,
  });

  return { data, isPending, error };
}