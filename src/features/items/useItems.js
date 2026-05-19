import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getItems } from "../../services/apiItems";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

export function useItems() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit") ? 10 : Number(searchParams.get("limit"));
  const sort = searchParams.get("sort") || "-createdAt";

  const filterValue = searchParams.get("category");

  const filter = useMemo(() => {
    return !filterValue || filterValue === "all"
      ? null
      : { field: "category", value: filterValue };
  }, [filterValue]);

  const { isPending, data = { data: [], result: 0 } } = useQuery({
    queryKey: ["items", page, limit, filter, sort],
    queryFn: () => getItems({ page, limit, filter, sort }),
  });

  const items = data.data.items;
  const count = data.allCounts;
  const pageCount = Math.ceil(count / limit);

  useEffect(() => {
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["items", page + 1, limit, filter, sort],
        queryFn: () => getItems({ page: page + 1, limit, filter, sort }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["items", page - 1, limit, filter, sort], 
        queryFn: () => getItems({ page: page - 1, limit, filter, sort }),
      });
    }
  }, [page, pageCount, limit, filter, sort, queryClient]);

  return { isPending, items, count, limit, page };
}