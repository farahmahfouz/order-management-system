import styled from "styled-components";
import { format, isToday } from "date-fns";
import { useTranslation } from "react-i18next";
import {
  HiOutlineCurrencyDollar,
  HiOutlineClipboardDocumentList,
  HiOutlineUser,
  HiOutlineClock,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledOrderDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-inline-start: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Staff = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: flex-end;

  & > div {
    display: flex;
    align-items: flex-end;
    gap: 0.8rem;
    color: var(--color-grey-600);
  }
`;

const ItemsList = styled.div`
  margin-bottom: 2rem;

  & h4 {
    margin-bottom: 1rem;
    color: var(--color-grey-700);
    font-weight: 600;
  }
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
  }

  & .item-info {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  & .item-name {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  & .item-price {
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }

  & .quantity {
    background-color: var(--color-grey-100);
    padding: 0.2rem 0.8rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
  background-color: var(--color-indigo-100);
  color: var(--color-indigo-700);

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: end;
`;

function OrderDataBox({ order }) {
  const { t } = useTranslation();
  const {
    _id,
    createdAt,
    customerName,
    items,
    totalCost,
    waiter,
    cashier,
  } = order;

  const formattedDate = format(new Date(createdAt), "EEE, MMM dd yyyy, p");
  const timeAgo = isToday(new Date(createdAt))
    ? t("orders.dataBox.today")
    : formatDistanceFromNow
      ? formatDistanceFromNow(createdAt)
      : format(new Date(createdAt), "MMM dd");

  return (
    <StyledOrderDataBox>
      <Header>
        <div>
          <HiOutlineClipboardDocumentList />
          <p>{t("orders.dataBox.header", { id: _id.slice(-6) })}</p>
        </div>
      </Header>

      <Section>
        <ItemsList>
          <h4>{t("orders.dataBox.itemDetails")}</h4>
          {items.map((orderItem) => (
            <ItemRow key={orderItem._id}>
              <div className="item-info">
                <span className="item-name">{orderItem.item?.name}</span>
                <span className="item-price">
                  {formatCurrency(orderItem.item?.price)}
                </span>
              </div>
              <div className="item-info">
                <span className="quantity">
                  {t("orders.dataBox.quantity", { count: orderItem.quantity })}
                </span>
              </div>
            </ItemRow>
          ))}
        </ItemsList>

        <Customer>
          <HiOutlineUser />
          <p>{customerName || "-"}</p>
        </Customer>

        <Staff>
          {waiter && (
            <div>
              <strong>{t("orders.dataBox.waiter")}</strong> {waiter?.name}
            </div>
          )}
          <div>
            <strong>{t("orders.dataBox.cashier")}</strong> {cashier?.name}
          </div>
        </Staff>

        <Price>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={t("orders.dataBox.totalAmount")}>
            {formatCurrency(totalCost)}
          </DataItem>
          <p>{t("orders.dataBox.orderTotal")}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          <HiOutlineClock style={{ display: "inline", marginInlineEnd: "0.5rem" }} />
          {t("orders.dataBox.ordered", { date: formattedDate })} ({timeAgo})
        </p>
      </Footer>
    </StyledOrderDataBox>
  );
}

export default OrderDataBox;
