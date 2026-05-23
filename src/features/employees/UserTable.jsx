import React from 'react'
import { useUsers } from './useUsers';
import { useTranslation } from 'react-i18next';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import UserRow from './UserRow';

function UserTable() {
  const { isPending, users, count, limit, page } = useUsers();
  const { t } = useTranslation();
  if (isPending) return <Spinner />
  if (!users?.length) return <Empty resourceName="users" />
  return (
    <Menus>
      <Table columns="0.4fr 0.3fr 0.5fr 0.4fr 0.4fr 0.4fr">
        <Table.Header>
          <div></div>
          <div>{t("employees.form.name")}</div>
          <div>{t("employees.form.email")}</div>
          <div>{t("employees.form.role")}</div>
          <div>{t("employees.form.createdAt")}</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UserRow key={user._id} user={user} />}
        />
        <Table.Footer>
          <Pagination count={count} limit={limit} page={page} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default UserTable