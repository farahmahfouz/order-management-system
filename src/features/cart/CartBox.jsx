import { useState } from 'react';
import { useCart } from './../../context/CartContext';
import useCreateOrder from '../orders/useCreateOrder';

import Button from "../../ui/Button";
import CartItem from './CartItem';
import Form from './../../ui/Form';
import styled from 'styled-components';
import ButtonGroup from '../../ui/ButtonGroup';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import toast from 'react-hot-toast';


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
    const { cartItems, clearCart } = useCart();
    const [customerName, setCustomerName] = useState('');
    const  { createOrder, isCreating } = useCreateOrder();

    const total = cartItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    function handlePlaceOrder() {
        if (!customerName.trim()) {
            toast.error('Please enter customer name');
            return;
        }

        // Transform cart items to match backend format
        const items = cartItems.map(item => ({
            item: item._id,
            quantity: item.quantity
        }));

        createOrder(
            { customerName: customerName.trim(), items },
            {
                onSuccess: () => {
                    clearCart();
                    setCustomerName('');
                }
            }
        );
    }

    return (
        <>
            <Form>
                {cartItems?.length > 0 ? (
                    <ul>
                        {cartItems.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </ul>
                ) : (
                    <P>Empty Cart</P>
                )}

                {total > 0 && (
                    <>
                        <Total>Total: <span>{total}$</span></Total>
                        <FormRow label="Customer Name">
                            <Input 
                                type="text"
                                id='cutomerName'
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Enter customer name"
                            />
                        </FormRow>
                    </>
                )}
            </Form>
            {total > 0 && (
                <ButtonGroup>
                    <Button variation="secondary" onClick={clearCart}>
                        Clear
                    </Button>
                    <Button 
                        onClick={handlePlaceOrder}
                        disabled={isCreating || !customerName.trim()}
                    >
                        {isCreating ? 'Creating Order...' : 'Confirm Order'}
                    </Button>
                </ButtonGroup>
            )}
        </>
    )
}

export default CartBox