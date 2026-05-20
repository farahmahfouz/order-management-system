import { Navigate } from "react-router-dom";
import { usePermissions } from "../features/authentication/usePermissions";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function PermissionRoute({ permission, children }) {
  const { permissions, isLoading } = usePermissions();

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (!permissions[permission]) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PermissionRoute;
