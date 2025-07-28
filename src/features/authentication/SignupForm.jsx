import { useForm, Controller } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import Select from './../../ui/Select';


function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, handleSubmit, reset, control } = useForm();
  const { errors } = formState;

  function onSubmit({ name, email, password, role }) {
    signup(
      { name, email, password, role },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Name must be at least 10 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Role" error={errors?.role?.message}>
        <Controller
          name="role"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              options={[
                { value: "", label: "Select a role" },
                { value: "super_admin", label: "Super Admin" },
                { value: "manager", label: "Manager" },
                { value: "cashier", label: "Cashier" },
                { value: "waiter", label: "Waiter" },
              ]}
              disabled={isLoading}
              {...field}
            />
          )}
        />
      </FormRow>


      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
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
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
