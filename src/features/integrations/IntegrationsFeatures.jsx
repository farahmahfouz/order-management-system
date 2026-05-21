import styled from "styled-components";
import {
  HiOutlineCalendar,
  HiOutlineFolder,
  HiOutlineBell,
  HiOutlineClock,
  HiOutlineTag,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import { useGoogleStatus } from "./useGoogleStatus";
import { connectGoogle } from "../../services/apiGoogle";
import SpinnerMini from "../../ui/SpinnerMini";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: 2.4rem;
`;

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-brand-600);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const CardDescription = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  line-height: 1.6;
`;

const Badge = styled.span`
  align-self: flex-start;
  background-color: var(--color-green-100);
  color: var(--color-green-700);
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 10rem;
`;

const GoogleCard = styled(Card)`
  border: 1px solid var(--color-grey-200);
  grid-column: 1 / -1;
`;

const GoogleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
`;

const GoogleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ connected }) =>
    connected ? "var(--color-green-700)" : "var(--color-grey-400)"};
  margin-inline-end: 0.6rem;
`;

const FEATURE_KEYS = [
  { key: "expiryNotifications", icon: <HiOutlineBell /> },
  { key: "calendarReminders", icon: <HiOutlineCalendar /> },
  { key: "autoDiscount", icon: <HiOutlineTag /> },
  { key: "autoExpireOrders", icon: <HiOutlineClock /> },
  { key: "dailyReport", icon: <HiOutlineFolder /> },
];

function IntegrationsFeatures() {
  const { t } = useTranslation();
  const { isConnected, isPending } = useGoogleStatus();

  return (
    <Grid>
      <GoogleCard>
        <GoogleHeader>
          <GoogleInfo>
            <FcGoogle />
            <div>
              <CardTitle>{t("integrations.google.title")}</CardTitle>
              <CardDescription style={{ marginTop: "0.4rem" }}>
                <StatusDot connected={isConnected} />
                {isPending
                  ? t("integrations.google.checking")
                  : isConnected
                    ? t("integrations.google.connected")
                    : t("integrations.google.notConnected")}
              </CardDescription>
            </div>
          </GoogleInfo>

          {!isPending && !isConnected && (
            <Button onClick={connectGoogle}>
              {t("integrations.google.connect")}
            </Button>
          )}

          {!isPending && isConnected && (
            <Badge>{t("integrations.google.active")}</Badge>
          )}

          {isPending && <SpinnerMini />}
        </GoogleHeader>

        <CardDescription>{t("integrations.google.description")}</CardDescription>
      </GoogleCard>

      {FEATURE_KEYS.map(({ key, icon }) => (
        <Card key={key}>
          <CardHeader>
            {icon}
            <CardTitle>{t(`integrations.features.${key}.title`)}</CardTitle>
          </CardHeader>
          <CardDescription>
            {t(`integrations.features.${key}.description`)}
          </CardDescription>
          <Badge>{t("integrations.badgeAutoDaily")}</Badge>
        </Card>
      ))}
    </Grid>
  );
}

export default IntegrationsFeatures;
