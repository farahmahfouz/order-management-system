import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { mutate: updateUserPassword, isLoading: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: ( user ) => {
      toast.success("User password successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUserPassword, isUpdating };
}
