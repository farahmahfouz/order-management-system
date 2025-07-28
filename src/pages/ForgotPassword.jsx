import styled from 'styled-components';
import ForgotPasswordForm from '../features/authentication/ForgotPasswordForm'
import Heading from '../ui/Heading'
import ButtonText from '../ui/ButtonText'
import { useMoveBack } from '../hooks/useMoveBack';

const StyledPage = styled.div`
 min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;


function ForgotPassword() {
    const moveBack = useMoveBack();

    return (
        <StyledPage>
            <div>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </div>
            <Heading as="h3">Find Your Account</Heading>
        
            <ForgotPasswordForm />
        </StyledPage>
    )
}

export default ForgotPassword