import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdatePassword } from "./useUpdatePassword";

function UpdatePasswordForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { updateUserPassword, isUpdating } = useUpdatePassword();

  function onSubmit({ passwordCurrent, password }) {
    updateUserPassword({ passwordCurrent, password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label={t("account.form.currentPassword")}
        error={errors?.passwordCurrent?.message}
      >
        <Input
          type="password"
          id="passwordCurrent"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("passwordCurrent", {
            required: t("account.validation.required"),
          })}
        />
      </FormRow>

      <FormRow
        label={t("account.form.newPassword")}
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("password", {
            required: t("account.validation.required"),
            minLength: {
              value: 8,
              message: t("account.validation.passwordMin"),
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          {t("common.cancel")}
        </Button>
        <Button disabled={isUpdating}>
          {t("account.form.updatePasswordBtn")}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
