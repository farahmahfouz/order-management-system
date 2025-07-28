import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import CreateItemForm from './CreateItemForm'

function AddItem() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='item-form'>
                    <Button>Add new Item</Button>
                </Modal.Open>
                <Modal.Window name='item-form'>
                    <CreateItemForm/>
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default AddItem