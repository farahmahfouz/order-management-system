import styled from "styled-components";
import ResetPasswordForm from "../features/authentication/ResetPasswordForm";
import Logo from "../ui/Logo";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
  gap: 3.2rem;
`;

function ResetPassword() {
  return (
    <Layout>
      <Logo />
        <ResetPasswordForm />
    </Layout>
  );
}

export default ResetPassword;