import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    // enabled: false,
    // retry: false,
  });
  const isAuthenticated = Boolean(user && user.isVerified === true);

  return { isLoading, user, isAuthenticated };
}
