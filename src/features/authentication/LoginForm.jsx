import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import styled from "styled-components";
import { Link } from "react-router-dom";

const IconButton = styled.button`
  position: absolute;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-500);
  display: flex;
  align-items: center;
  padding: 0;

  &:hover { color: var(--color-grey-700); }
  & svg { width: 2rem; height: 2rem; }
  &:focus { outline: none; }
`;

const StyledLink = styled(Link)`
  color: var(--color-brand-600);
  font-size: 1.4rem;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  &:hover { text-decoration: underline; }
`;

function LoginForm() {
  const [email, setEmail] = useState("farahmahfouz11@gmail.com");
  const [password, setPassword] = useState("Test12345");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <IconButton type="button" onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </IconButton>
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={isLoading} fullWidth>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <StyledLink to='/forgotPassword'>Forgot your password?</StyledLink>
    </Form>
  );
}

export default LoginForm;
