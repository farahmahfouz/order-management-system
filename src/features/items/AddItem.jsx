import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import CreateItemForm from './CreateItemForm'
import { useTranslation } from 'react-i18next';

function AddItem() {
    const { t } = useTranslation();
    return (
        <div>
            <Modal>
                <Modal.Open opens='item-form'>
                    <Button>{t("items.addNew")}</Button>
                </Modal.Open>
                <Modal.Window name='item-form'>
                    <CreateItemForm/>
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default AddItem