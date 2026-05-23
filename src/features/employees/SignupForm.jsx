import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "../employees/useSignup";
import Select from "../../ui/Select";

const ROLE_OPTIONS = [
  "super_admin",
  "manager",
  "cashier",
  "waiter",
];

function SignupForm({ onCloseModal }) {
  const { t } = useTranslation();
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
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label={t("employees.form.name")} error={errors?.name?.message} required>
        <Input
          type="text"
          id="name"
          required
          disabled={isLoading}
          {...register("name", {
            required: t("employees.validation.required"),
            minLength: {
              value: 10,
              message: t("employees.validation.nameMin"),
            },
          })}
        />
      </FormRow>

      <FormRow label={t("employees.form.email")} error={errors?.email?.message} required>
        <Input
          type="email"
          id="email"
          required
          autoComplete="email"
          disabled={isLoading}
          {...register("email", {
            required: t("employees.validation.required"),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t("employees.validation.emailInvalid"),
            },
          })}
        />
      </FormRow>

      <FormRow label={t("employees.form.role")} error={errors?.role?.message} required>
        <Controller
          name="role"
          control={control}
          rules={{ required: t("employees.validation.required") }}
          render={({ field }) => (
            <Select
              options={[
                { value: "", label: t("employees.form.selectRole") },
                ...ROLE_OPTIONS.map((role) => ({
                  value: role,
                  label: t(`employees.roles.${role}`),
                })),
              ]}
              disabled={isLoading}
              {...field}
            />
          )}
        />
      </FormRow>

      <FormRow
        label={t("employees.form.password")}
        error={errors?.password?.message}
        required
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("password", {
            required: t("employees.validation.required"),
            minLength: {
              value: 8,
              message: t("employees.validation.passwordMin"),
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          {t("common.cancel")}
        </Button>
        <Button disabled={isLoading}>{t("employees.form.createUser")}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
