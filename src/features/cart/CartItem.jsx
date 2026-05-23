import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const StyledCard = styled.li`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 16px;
  padding: 1.4rem;
  width: 260px;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
`;

const CardTop = styled.div`
  position: relative;
  padding-inline-end: 2.8rem;
`;

const ItemName = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  color: var(--color-grey-800);
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 0;
  inset-inline-end: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  color: var(--color-red-700);
  font-size: 2.4rem;
  transition: color 0.15s;

  &:hover {
    color: var(--color-red-800);
  }
`;

const UnitPrice = styled.p`
  font-size: 15px;
  color: var(--color-grey-500);
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-100);
  margin: 0;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

const QtyBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--color-grey-200);
  background: var(--color-grey-50);
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-700);
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: var(--color-grey-100);
    border-color: var(--color-grey-300);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const QtyValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
  color: var(--color-grey-800);
`;

const LineTotal = styled.p`
  font-size: 17px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  color: var(--color-grey-900);
`;

function CartItem({ item }) {
  const { t } = useTranslation();
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <StyledCard>
      <CardTop>
        <ItemName>{item.name}</ItemName>
        <DeleteBtn
          onClick={() => removeFromCart(item._id)}
          title={t("common.delete")}
          aria-label={t("common.delete")}
        >×
        </DeleteBtn>
      </CardTop>

      <UnitPrice>{formatCurrency(item.price)} / unit</UnitPrice>

      <Divider />

      <QtyRow>
        <QtyBtn
          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
          aria-label="decrease quantity"
        >
          −
        </QtyBtn>
        <QtyValue>{item.quantity}</QtyValue>
        <QtyBtn
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          aria-label="increase quantity"
        >
          +
        </QtyBtn>
      </QtyRow>

      <LineTotal>{formatCurrency(item.price * item.quantity)}</LineTotal>
    </StyledCard>
  );
}

export default CartItem;