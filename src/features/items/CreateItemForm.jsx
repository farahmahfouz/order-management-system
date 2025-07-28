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

function CreateItemForm({ itemToEdit = {}, onCloseModal }) {
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

            <FormRow label='Item name' error={errors?.name?.message}>
                <Input type='text' id='name' {...register('name', {
                    required: 'This field is required'
                })} />
            </FormRow>

            <FormRow label='Item price' error={errors?.price?.message}>
                <Input type='number' defaultValue={0} id='price' {...register('price', {
                    required: 'This field is required',
                    min: {
                        value: 1,
                        message: 'The Price should be at least one'
                    }
                })} />
            </FormRow>

            <FormRow label='Item category' error={errors?.category?.message}>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <Select
                            options={[
                                { value: "", label: "Select a category" },
                                { value: "food", label: "Food" },
                                { value: "beverages", label: "Beverages" },
                                { value: "others", label: "Others" },
                            ]}
                            {...field}
                        />
                    )}
                />
            </FormRow>

            <FormRow label='Expiry Date' error={errors?.expiryDate?.message}>
                <Input type='date' id='expiryDate' {...register('expiryDate')} />
            </FormRow>

            <FormRow label='Description' error={errors?.description?.message}>
                <Textarea type='text' id='description' {...register('description', {
                    required: 'This field is required'
                })} />
            </FormRow>

            <FormRow label='Stock' error={errors?.stock?.message}>
                <Input type='number' id='stockQuantity' {...register('stockQuantity', {
                    required: 'This field is required'
                })} />
            </FormRow>

            <FormRow label='Item photo' error={errors?.image?.message}>
                <FileInput id="image" accept="image/*" type='file' {...register('image', {
                    required: isEditSession ? false : 'This field is required'
                })} />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? 'Edit Item' : 'Add Item'}</Button>
            </FormRow>


        </Form>
    )
}

export default CreateItemForm