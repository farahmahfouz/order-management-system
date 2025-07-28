import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem as createItemApi } from "../../services/apiItems";
import toast from "react-hot-toast";

export function useCreateItem() {
  const queryClient = useQueryClient();
  const { mutate: createItem, isPending: isCreating } = useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      toast.success("Item added successfully");
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createItem, isCreating };
}