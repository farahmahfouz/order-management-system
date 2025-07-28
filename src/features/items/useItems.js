import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getItems } from "../../services/apiItems";
import { useSearchParams } from "react-router-dom";

export function useItems() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 10
    : Number(searchParams.get("limit"));

  const filterValue = searchParams.get("category");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "category", value: filterValue };

  const sort = searchParams.get("sort") || "-createdAt";

  const { isPending, data = { data: [], result: 0 } } = useQuery({
    queryKey: ["items", page, limit, filter, sort],
    queryFn: () => getItems({ page, limit, filter, sort }),
  });

  const items = data.data.items;
  const count = data.allCounts;

  const pageCount = Math.ceil(count / limit);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["items", page + 1, limit, sort, filter],
      queryFn: () => getItems({ page: page + 1, limit }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["items", page - 1, limit, sort, filter],
      queryFn: () => getItems({ page: page - 1, limit }),
    });

  return { isPending, items, count, limit, page };
}
