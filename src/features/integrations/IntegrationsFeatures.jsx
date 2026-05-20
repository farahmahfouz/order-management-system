// src/features/integrations/IntegrationsFeatures.jsx
import styled from "styled-components";
import { HiOutlineCalendar, HiOutlineFolder, HiOutlineBell, HiOutlineClock, HiOutlineTag } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
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

  & svg { width: 3.2rem; height: 3.2rem; }
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ connected }) => connected ? 'var(--color-green-700)' : 'var(--color-grey-400)'};
  margin-right: 0.6rem;
`;

const features = [
  {
    icon: <HiOutlineBell />,
    title: "Expiry Notifications",
    description: "Automatically sends email alerts to admins when items are expiring today or within 5 days.",
  },
  {
    icon: <HiOutlineCalendar />,
    title: "Google Calendar Reminders",
    description: "Adds expiry events directly to your Google Calendar so you never miss a critical date.",
  },
  {
    icon: <HiOutlineTag />,
    title: "Auto Discount",
    description: "Items expiring within 20 days automatically get a 25% discount applied to reduce waste.",
  },
  {
    icon: <HiOutlineClock />,
    title: "Auto Expire Orders",
    description: "Pending orders older than 4 hours are automatically marked as expired.",
  },
  {
    icon: <HiOutlineFolder />,
    title: "Daily Report to Google Drive",
    description: "A CSV report of today's orders is generated and uploaded to your Google Drive every midnight.",
  },
];

function IntegrationsFeatures() {
  const { isConnected, isPending } = useGoogleStatus();
  console.log(isConnected)

  return (
    <Grid>
      <GoogleCard>
        <GoogleHeader>
          <GoogleInfo>
            <FcGoogle />
            <div>
              <CardTitle>Google Account</CardTitle>
              <CardDescription style={{ marginTop: "0.4rem" }}>
                <StatusDot connected={isConnected} />
                {isPending ? "Checking..." : isConnected ? "Connected" : "Not connected"}
              </CardDescription>
            </div>
          </GoogleInfo>

          {!isPending && !isConnected && (
            <Button onClick={connectGoogle}>
              Connect Google
            </Button>
          )}

          {!isPending && isConnected && (
            <Badge>✓ Active</Badge>
          )}

          {isPending && <SpinnerMini />}
        </GoogleHeader>

        <CardDescription>
          Connecting your Google account enables Calendar reminders for expiring items
          and automatic daily report uploads to Google Drive.
        </CardDescription>
      </GoogleCard>

      {/* Automation Feature Cards */}
      {features.map((feature) => (
        <Card key={feature.title}>
          <CardHeader>
            {feature.icon}
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardDescription>{feature.description}</CardDescription>
          <Badge>Auto • Runs Daily</Badge>
        </Card>
      ))}
    </Grid>
  );
}

export default IntegrationsFeatures;