import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteItem as deleteItemApi } from "../../services/apiItems";

export function useDeleteItem() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleteing, mutate: deleteItem } = useMutation({
    mutationFn: deleteItemApi,
    onSuccess: () => {
      toast.success("Item successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["items"],
         exact: false
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleteing, deleteItem };
}
