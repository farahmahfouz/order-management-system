import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";
import { useSearchParams } from "react-router-dom";

export function useOrders() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 10
    : Number(searchParams.get("limit"));

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sort = searchParams.get("sort") || "-createdAt";

  const { isPending, data = { data: [], result: 0 } } = useQuery({
    queryKey: ["orders", page, limit, filter, sort],
    queryFn: () => getOrders({ page, limit, filter, sort }),
  });

  const orders = data.data.orders;
  const count = data.allCounts;

  const pageCount = Math.ceil(count / limit);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1, limit, sort, filter],
      queryFn: () => getOrders({ page: page + 1, limit }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1, limit, sort, filter],
      queryFn: () => getOrders({ page: page - 1, limit }),
    });

  return { isPending, orders, count, limit, page };
}
