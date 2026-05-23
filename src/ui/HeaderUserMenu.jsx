import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HiOutlineUser,
  HiOutlineMoon,
  HiOutlineSun,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";

import Menus from "./Menus";
import UserAvatar from "../features/authentication/UserAvatar";
import { useDarkMode } from "../context/DarkModeContext";
import { useLogout } from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";

function HeaderUserMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { logout, isLoading } = useLogout();

  return (
    <Menus>
      <Menus.Menu>
        <Menus.AvatarToggle id="user-menu">
          <UserAvatar />
        </Menus.AvatarToggle>

        <Menus.List id="user-menu">
          <Menus.Button
            icon={<HiOutlineUser />}
            onClick={() => navigate("/account")}
          >
            {t("header.account")}
          </Menus.Button>

          <Menus.Button
            icon={isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? t("header.lighMode") : t("header.darkMode")}
          </Menus.Button>

          <Menus.Button
            icon={
              isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />
            }
            onClick={logout}
          >
            {t("header.logout")}
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
}

export default HeaderUserMenu;
