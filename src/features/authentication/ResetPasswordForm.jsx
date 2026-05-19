import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { resetPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState: { errors }, } = useForm();

  async function onSubmit({ password }) {
    try {
      await resetPassword({ token, password });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="New password" error={errors?.password?.message}>
        <Input
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Confirm password" error={errors?.confirmPassword?.message}>
        <Input
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val) => val === getValues("password") || "Passwords don't match",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large">
          Reset Password
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ResetPasswordForm;