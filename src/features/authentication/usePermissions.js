import { useUser } from "./useUser";
import { permissions } from "../../utils/permissions";

export function usePermissions() {
  const { user, isLoading } = useUser();
  const role = user?.role;
  const rolePermissions = permissions[role] ?? {};

  return { permissions: rolePermissions, role, isLoading };
}
