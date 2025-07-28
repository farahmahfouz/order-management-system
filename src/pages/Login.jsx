import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Heading from './../ui/Heading';

const StyledPage = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSide = styled.div`
  flex: 1;
  background-image: url('/logo.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #ffffff; 
   @media (max-width: 768px) {
    flex: none;
    width: 100%;
    height: 100vh;
  }
`;

function Login() {
  return (
    <StyledPage>
      <LeftSide />
      <RightSide>
        <Heading as='h4'>
          Login into your account
        </Heading>
        <LoginForm />
      </RightSide>
    </StyledPage>
  );
}

export default Login;