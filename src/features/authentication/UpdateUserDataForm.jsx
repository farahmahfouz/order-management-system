import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { user } = useUser();

  const email = user?.email ?? "";
  const currentName = user?.name ?? "";
  const userId = user?._id ?? "";

  const { updateUser, isUpdatig } = useUpdateUser();

  const [name, setName] = useState(currentName);
  const [image, setImage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    updateUser({ userId, updatedData: formData }, {
      onSettled: () => {
        setImage(null);
        e.target.reset();
      }
    })
  }

  function handleCancel() {
    setName(currentName);
    setImage(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          disabled={isUpdatig}
        />
      </FormRow>
      <FormRow label="Image">
        <FileInput
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          disabled={isUpdatig}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" disabled={isUpdatig} onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isUpdatig}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;