import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { cancelOrder as cancelOrderApi } from "../../services/apiOrders";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isCancel, mutate: cancelOrder } = useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      toast.success("Order successfully canceled");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCancel, cancelOrder };
}
