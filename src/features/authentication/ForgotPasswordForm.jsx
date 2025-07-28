import { useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import FormRowVertical from '../../ui/FormRowVertical'
import Heading from '../../ui/Heading'
import Input from '../../ui/Input'
import toast from 'react-hot-toast'
import { forgotPassword } from '../../services/apiAuth'

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        forgotPassword({ email })
            .then(() => {
                toast.success("Check your email");
            })
            .catch((err) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setEmail("");
            });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Heading as="h5">Please enter your email address or mobile number to search for your account.</Heading>

            <FormRowVertical label="Email address">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormRowVertical>

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => setEmail("")}
                >
                    Cancel
                </Button>
                <Button>Search</Button>
            </FormRow>

        </Form>
    )
}

export default ForgotPasswordForm