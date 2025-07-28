import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem as updateItemApi } from "../../services/apiItems";

export function useEditItem() {
  const queryClient = useQueryClient();
  const { mutate: updateItem, isPending: isEditing } = useMutation({
    mutationFn: ({ newItemData, id }) => updateItemApi(newItemData, id),
    onSuccess: () => {
      toast.success("Item updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateItem, isEditing };
}