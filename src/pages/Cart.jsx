import { useMoveBack } from "../hooks/useMoveBack";

import styled from "styled-components";
import CartBox from "../features/cart/CartBox";
import Heading from "../ui/Heading";
import ButtonText from '../ui/ButtonText';
import Row from '../ui/Row';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function Cart() {
    const moveBack = useMoveBack();

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Cart</Heading>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <CartBox />
        </>
    );
}

export default Cart;