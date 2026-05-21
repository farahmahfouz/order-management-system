import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useMoveBack } from "../hooks/useMoveBack";
import styled from "styled-components";
import CartBox from "../features/cart/CartBox";
import Heading from "../ui/Heading";
import ButtonText from "../ui/ButtonText";
import Row from "../ui/Row";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function Cart() {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const moveBack = useMoveBack();

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">{t("cart.heading")}</Heading>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>
          {isRTL ? <span>&rarr;</span> : <span>&larr;</span>} {t("common.back")}
        </ButtonText>
      </Row>

      <CartBox />
    </>
  );
}

export default Cart;
