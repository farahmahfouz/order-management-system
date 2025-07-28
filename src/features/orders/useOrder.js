import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrder } from "./../../services/apiOrders";

export function useOrder() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    retry: false,
  });

  return { isLoading, error, order };
}
