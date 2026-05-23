import React from 'react'
import Table from '../../ui/Table'
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Tag from '../../ui/Tag';
import styled from 'styled-components';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { HiEye } from 'react-icons/hi';

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const statusToTagRole = {
    "manager": "blue",
    "super_admin": "green",
    "cashier": "silver",
    "waiter": "red"
  };
  

function UserRow({ user }) {
  const { _id: userId, name, email, createdAt, role } = user;
  const { t } = useTranslation();
  return (
    <Table.Row>
      <User>{userId.slice(0, 5)}</User>
      <Stacked>
        <span>{name}</span>
      </Stacked>
      <Stacked>
        <span>{email}</span>
      </Stacked>
      <Tag type={statusToTagRole[role]}>{role}</Tag>
      <Stacked>{format(new Date(createdAt), "MMM dd yyyy")}</Stacked>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={userId} />
          <Menus.List id={userId}>
            <Menus.Button icon={<HiEye />}>{t("common.seeDetails")}</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  )
}

export default UserRow