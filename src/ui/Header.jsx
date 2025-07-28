import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import ButtonIcon from "./ButtonIcon";
import { HiBars3 } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: flex-end;

   @media (max-width: 768px) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  }
`;

const SidebarToggleWrapper = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

function Header({ onToggleSidebar }) {
  return (
    <StyledHeader>
      <SidebarToggleWrapper>
        <ButtonIcon onClick={onToggleSidebar} className="sidebar-toggle">
          <HiBars3 />
        </ButtonIcon>
      </SidebarToggleWrapper>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
