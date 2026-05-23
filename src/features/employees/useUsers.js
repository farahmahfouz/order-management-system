import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit") ? 10 : Number(searchParams.get("limit"));
  const sort = searchParams.get("sort") || "-createdAt";

  const filterValue = searchParams.get("role");

  const filter = useMemo(() => {
    return !filterValue || filterValue === "all"
      ? null
      : { field: "role", value: filterValue };
  }, [filterValue]);

  const { isPending, data = { data: [], result: 0 } } = useQuery({
    queryKey: ["users", page, limit, filter, sort],
    queryFn: () => getUsers({ page, limit, filter, sort }),
  });

  const users = data.data.users;
  const count = data.allCounts;
  const pageCount = Math.ceil(count / limit);

  useEffect(() => {
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["users", page + 1, limit, filter, sort],
        queryFn: () => getUsers({ page: page + 1, limit, filter, sort }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["users", page - 1, limit, filter, sort],
        queryFn: () => getUsers({ page: page - 1, limit, filter, sort }),
      });
    }
  }, [page, pageCount, limit, filter, sort, queryClient]);

  return { isPending, users, count, limit, page };
}
