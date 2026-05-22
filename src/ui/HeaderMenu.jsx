import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import HeaderUserMenu from "./HeaderUserMenu";
import { useTranslation } from "react-i18next";
import { TooltipText, TooltipWrapper } from "../features/items/ItemTableOperations";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <StyledHeaderMenu>
      <li>
        <HeaderUserMenu />
      </li>
      <li>
        <TooltipWrapper>
          <ButtonIcon onClick={() => navigate("/cart")}>
            <HiOutlineShoppingCart />
          </ButtonIcon>
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
