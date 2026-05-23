import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import useCreateOrder from "../orders/useCreateOrder";
import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import CartItem from "./CartItem";
import Form from "../../ui/Form";
import styled from "styled-components";
import ButtonGroup from "../../ui/ButtonGroup";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

const CartList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0;
  margin: 0;
`;

const P = styled.p`
  color: var(--color-brand-400);
  font-weight: 500;
  text-align: center;
`;

const Total = styled.p`
  color: var(--color-brand-400);
  font-weight: 800;
  text-align: end;
  span {
    color: var(--color-brand-500);
    font-weight: 400;
  }
`;

function CartBox() {
  const { t } = useTranslation();
  const { cartItems, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const { createOrder, isCreating } = useCreateOrder();

  const total = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handlePlaceOrder() {
    if (!customerName.trim()) {
      toast.error(t("cart.customerRequired"));
      return;
    }

    const items = cartItems.map((item) => ({
      item: item._id,
      quantity: item.quantity,
      price: item.price,
    }));

    createOrder(
      { customerName: customerName.trim(), items },
      {
        onSuccess: () => {
          clearCart();
          setCustomerName("");
        },
      }
    );
  }

  return (
    <>
      <Form>
        {cartItems?.length > 0 ? (
          <CartList>
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </CartList>
        ) : (
          <P>{t("cart.empty")}</P>
        )}

        {total > 0 && (
          <>
            <Total>
              {t("cart.total", { amount: formatCurrency(total) })}
            </Total>
            <FormRow label={t("cart.customerName")} required>
              <Input
                type="text"
                id="customerName"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t("cart.customerPlaceholder")}
              />
            </FormRow>
          </>
        )}
      </Form>
      {total > 0 && (
        <ButtonGroup>
          <Button variation="secondary" onClick={clearCart}>
            {t("common.clear")}
          </Button>
          <Button
            onClick={handlePlaceOrder}
            disabled={isCreating || !customerName.trim()}
          >
            {isCreating ? t("cart.creatingOrder") : t("cart.confirmOrder")}
          </Button>
        </ButtonGroup>
      )}
    </>
  );
}

export default CartBox;
