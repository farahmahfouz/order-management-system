import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "./../../services/apiAuth";
import toast from "react-hot-toast";

export default function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success("Reset link sent to your email!");
    },
    onError: (err) => toast.error(err.message),
  });
  return { forgotPassword, isPending };
}
