import { useCart } from '../../context/CartContext';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import styled from 'styled-components';

const StyledSpan = styled.span`
display: flex;
flex: 1;
font-size: 18px;
`

const StyledListItem = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
padding-bottom : 2.9rem;
`

const ButtonGroup = styled.div`
display: flex;
align-items: center;
gap: 8px;
`

function CartItem({ item }) {
    const { removeFromCart, updateQuantity } = useCart();
    return (
        <StyledListItem>
            <StyledSpan>
                {item.quantity} × {item.name} - {item.price * item.quantity} $
            </StyledSpan>
            <ButtonGroup>
                <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                        updateQuantity(item._id, Number(e.target.value))
                    }
                    style={{ width: "60px" }}
                />
                <Button size='small' onClick={() => removeFromCart(item._id)}>Delete</Button>
            </ButtonGroup>
        </StyledListItem>
    )
}

export default CartItem