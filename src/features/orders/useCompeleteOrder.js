import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { completeOrder as completeOrderApi } from "../../services/apiOrders";

export function useCompleteOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isComplete, mutate: completeOrder } = useMutation({
    mutationFn: completeOrderApi,
    onSuccess: () => {
      toast.success("Order successfully completed");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isComplete, completeOrder };
}
