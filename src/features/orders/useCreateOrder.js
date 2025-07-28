import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/apiOrders";
import toast from "react-hot-toast";

function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: ({ customerName, items }) =>
      createOrderApi({ customerName, items }),
    onSuccess: () => {
      toast.success(`Order created successfully`);
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createOrder, isCreating };
}

export default useCreateOrder;
