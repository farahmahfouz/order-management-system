import { useQuery } from "@tanstack/react-query";
import { todayOrders } from "../../services/apiOrders";

export function useTodayOrders() {
  const { isPending, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: todayOrders,
  });


  return { isPending, orders };
}
