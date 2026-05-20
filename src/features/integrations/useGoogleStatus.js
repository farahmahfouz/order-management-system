import { useQuery } from "@tanstack/react-query";
import { getGoogleStatus } from "../../services/apiGoogle";

export function useGoogleStatus() {
  const { data, isPending } = useQuery({
    queryKey: ["google-status"],
    queryFn: getGoogleStatus,
  });

  return { isConnected: data?.data?.connected, isPending };
}
