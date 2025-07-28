import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdatePassword } from "./useUpdatePassword";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { updateUserPassword, isUpdating } = useUpdatePassword();

  function onSubmit({ passwordCurrent, password }) {
    updateUserPassword({ passwordCurrent, password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current Password"
        error={errors?.passwordCurrent?.message}
      >
        <Input
          type="password"
          id="passwordCurrent"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("passwordCurrent", {
            required: "This field is required"
          })}
        />
      </FormRow>

      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
