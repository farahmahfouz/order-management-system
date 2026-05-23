import { useForm, Controller } from 'react-hook-form';
import Form from './../../ui/Form';
import FormRow from './../../ui/FormRow';
import Input from './../../ui/Input';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import Textarea from './../../ui/Textarea';
import FileInput from './../../ui/FileInput';
import { useCreateItem } from './useCreateItem';
import { useEditItem } from './useEditItem';
import { useTranslation } from 'react-i18next';

function CreateItemForm({ itemToEdit = {}, onCloseModal }) {
    const { t } = useTranslation();
    const { createItem, isCreating } = useCreateItem();
    const { updateItem, isEditing } = useEditItem();

    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = itemToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, formState, control } = useForm({
        defaultValues: isEditSession ? editValues : {}
    });

    const { errors } = formState;

    const onSubmit = (data) => {
        const image = data.image[0];
        const payload = { ...data, image };

        if (isEditSession) updateItem({ newItemData: payload, id: editId },
            {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                }
            })
        else createItem({ ...data, image: data.image[0] },
            {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                }
            });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>

            <FormRow label={t("items.form.name")} error={errors?.name?.message}>
                <Input type='text' id='name' {...register('name', {
                    required: t("items.validation.required")
                })} />
            </FormRow>

            <FormRow label={t("items.form.price")} error={errors?.price?.message}>
                <Input type='number' defaultValue={0} id='price' {...register('price', {
                    required: t("items.validation.required"),
                    min: { value: 1, message: t("items.validation.priceMin") }
                })} min={1} />
            </FormRow>

            <FormRow label={t("items.form.category")} error={errors?.category?.message}>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: t("items.validation.required") }}
                    render={({ field }) => (
                        <Select
                        options={[
                            { value: "", label: t("items.form.selectCategory") },
                            { value: "food", label: t("items.filter.food") },
                            { value: "beverages", label: t("items.filter.beverages") },
                            { value: "others", label: t("items.filter.others") },
                          ]}
                            {...field}
                        />
                    )}
                />
            </FormRow>

            <FormRow label={t("items.form.expiryDate")} error={errors?.expiryDate?.message}>
                <Input type='date' id='expiryDate' {...register('expiryDate')} />
            </FormRow>

            <FormRow label={t("items.form.description")} error={errors?.description?.message}>
                <Textarea type='text' id='description' {...register('description', {
                     required: t("items.validation.required"),
                })} />
            </FormRow>

            <FormRow label={t("items.form.stock")} error={errors?.stock?.message}>
                <Input type='number' id='stockQuantity' {...register('stockQuantity', {
                     required: t("items.validation.required"),
                })} min={1} />
            </FormRow>

            <FormRow label={t("items.form.photo")} error={errors?.image?.message}>
                <FileInput id="image" accept="image/*" type='file' {...register('image', {
                     required: isEditSession ? false : t("items.validation.required"),
                })} />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
                    {t("common.cancel")}
                </Button>
                <Button disabled={isWorking}>{isEditSession ? `${t("common.edit")}` : `${t("common.add")}`}</Button>
            </FormRow>


        </Form>
    )
}

export default CreateItemForm