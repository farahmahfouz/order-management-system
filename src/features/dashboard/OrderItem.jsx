import { Link } from "react-router-dom";
import styled from "styled-components";
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 9rem 0.7fr ;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function OrderItem({ order }) {
  const { _id: itemId, status, totalCost } = order;
  return (
    <StyledTodayItem>
      {status === 'pending' && <Tag type='green'>
        Today
      </Tag>}

      <Guest>Order number {itemId ? itemId.slice(0, 5) : "Unknown"}</Guest>
      <span>{totalCost}</span>

      {status === 'pending' && <Button size='small' variation='primary' as={Link} to={`/checkin/${itemId}`}>
        Complete
      </Button>}
    </StyledTodayItem>
  )
}