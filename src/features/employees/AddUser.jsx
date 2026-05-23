import React from 'react'
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import SignupForm from './SignupForm';

function AddUser() {
  const { t } = useTranslation();
  return (
      <div>
          <Modal>
              <Modal.Open opens='user-form'>
                  <Button>{t("employees.form.createUser")}</Button>
              </Modal.Open>
              <Modal.Window name='user-form'>
                  <SignupForm/>
              </Modal.Window>
          </Modal>
      </div>
  )
}

export default AddUser