import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from './useUser';
import { getUserAvatarSrc } from "../../utils/helpers";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user, isLoading } = useUser();
  const [avatarSrc, setAvatarSrc] = useState('/default-user.jpg');

  useEffect(() => {
    if (user) setAvatarSrc(getUserAvatarSrc(user.image));
  }, [user?.image]);

  if (isLoading || !user) return null;

  const { name } = user;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatarSrc}
        alt={`Avatar of ${name}`}
        onError={() => setAvatarSrc('/default-user.jpg')}
      />
      <span>{name}</span>
    </StyledUserAvatar>
  )
}

export default UserAvatar