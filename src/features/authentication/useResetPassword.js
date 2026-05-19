// features/auth/useResetPassword.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";

export function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Password reset successfully!");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  return { resetPassword, isPending };
}