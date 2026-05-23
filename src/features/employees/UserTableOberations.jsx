import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import { useTranslation } from 'react-i18next';
import SortBy from '../../ui/SortBy';

function UserTableOberations() {
  const { t } = useTranslation();
  return (
    <TableOperations>
      <Filter
        filterField="role"
        options={[
          { value: "all", label: t("employees.roles.all") },
          { value: "manager", label: t("employees.roles.manager") },
          { value: "super_admin", label: t("employees.roles.super_admin") },
          { value: "cashier", label: t("employees.roles.cashier") },
          { value: "waiter", label: t("employees.roles.waiter") },
        ]}
      />
      <SortBy 
        options={[
          { value: "-createdAt", label: t("employees.sort.nameDesc") },
          { value: "createdAt", label: t("employees.sort.nameAsc") },
        ]}
      />
    </TableOperations>
  )
}

export default UserTableOberations