import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import HeaderUserMenu from "./HeaderUserMenu";
import { useTranslation } from "react-i18next";
import { TooltipText, TooltipWrapper } from "../features/items/ItemTableOperations";
import { useCart } from "../context/CartContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const CartButtonWrap = styled.div`
  position: relative;
  display: inline-flex;
`;

const CartBadge = styled.span`
  position: absolute;
  top: 0.5rem;
  inset-inline-end: 0.5rem;
  width: 0.9rem;
  height: 0.9rem;
  background-color: var(--color-brand-600);
  border-radius: 50%;
  border: 2px solid var(--color-grey-0);
  pointer-events: none;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getItemsCount } = useCart();
  const cartCount = getItemsCount();

  return (
    <StyledHeaderMenu>
      <li>
        <HeaderUserMenu />
      </li>
      <li>
        <TooltipWrapper>
          <CartButtonWrap>
            <ButtonIcon onClick={() => navigate("/cart")}>
              <HiOutlineShoppingCart />
            </ButtonIcon>
            {cartCount > 0 && <CartBadge aria-label={t("common.cart")} />}
          </CartButtonWrap>
          <TooltipText className="tooltip-text">{t("common.cart")}</TooltipText>
        </TooltipWrapper>
      </li>
      <li>
        <TooltipWrapper>
          <LanguageToggle />
          <TooltipText className="tooltip-text">{t("common.changeLanguage")}</TooltipText>
        </TooltipWrapper>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
