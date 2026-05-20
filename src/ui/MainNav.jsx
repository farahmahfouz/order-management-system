import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineChartBar, HiOutlineCircleStack, HiOutlineCog6Tooth, HiOutlineDocumentChartBar, HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi2";
import { usePermissions } from "../features/authentication/usePermissions";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const StyledNavLink = styled(NavLink)`
  &:link, &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover, &:active, &.active:link, &.active:visited {
    color: var(--color-brand-600);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    flex-shrink: 0;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg, &:active svg, &.active:link svg, &.active:visited svg {
    color: var(--color-brand-600);
  }

  @media (max-width: 1024px) {
    padding: 1.2rem;
    justify-content: center;

    & span {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 1.2rem 2.4rem;
    justify-content: flex-start;

    & span {
      display: inline;
    }
  }
`;

function MainNav() {
  const { permissions, isLoading } = usePermissions();

  return (
    <nav style={{ width: "100%" }}>
      <NavList>
        <li><StyledNavLink to='/dashboard'><HiOutlineHome /><span>Home</span></StyledNavLink></li>
        <li><StyledNavLink to='/items'><HiOutlineCircleStack /><span>Items</span></StyledNavLink></li>
        {!isLoading && permissions.orders && (
          <li><StyledNavLink to='/orders'><HiOutlineDocumentChartBar /><span>Orders</span></StyledNavLink></li>
        )}
        {!isLoading && permissions.users && (
          <li><StyledNavLink to='/employees'><HiOutlineUserGroup /><span>Employees</span></StyledNavLink></li>
        )}
        {!isLoading && permissions.google && (
          <li><StyledNavLink to='/integrations'><HiOutlineCog6Tooth /><span>Integrations</span></StyledNavLink></li>
        )}
        {!isLoading && permissions.reports && (
          <li>
            <StyledNavLink to='/reports'>
              <HiOutlineChartBar />
              <span>Sales</span>
            </StyledNavLink>
          </li>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;