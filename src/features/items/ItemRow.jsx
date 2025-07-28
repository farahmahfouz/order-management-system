import styled from "styled-components";

import Menus from './../../ui/Menus';
import Modal from './../../ui/Modal';
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import ConfirmDelete from './../../ui/ConfirmDelete';

import {
  HiEye,
  HiOutlineShoppingCart,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";

import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from "../../utils/helpers";
import { useDeleteItem } from './useDeleteItem';
import CreateItemForm from "./CreateItemForm";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Item = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const statusToTagcategory = {
  food: "blue",
  "beverages": "green",
  "others": "silver",
  "false": "red"
};

function ItemRow({ item }) {
  const {
    _id: itemId,
    createdAt,
    stockQuantity,
    name,
    price,
    category,
    isAvailable,
    discountPrice,
    expiryDate,
    image
  } = item;

  const navigate = useNavigate();
  const { isDeleteing, deleteItem } = useDeleteItem();
  const { addToCart } = useCart();

  const isExpired = new Date(expiryDate) < new Date();

  function handleAddToCart() {
    addToCart(item);
    toast.success("Item added to cart successfully");
  }

  return (
    <Table.Row>
      <Img src={image?.length ? image[0] : 'logo.png'} alt={name} />
      <Item>{itemId.slice(0, 5)}</Item>
      <Stacked>
        <span>{name}</span>
        <span>{createdAt ? format(new Date(createdAt), "MMM dd yyyy") : '-'}</span>
      </Stacked>

      <Price>{formatCurrency(price)}</Price>
      {discountPrice ? <Discount>{formatCurrency(discountPrice)}</Discount> : <span>&mdash;</span>}
      <Tag type={statusToTagcategory[category]}>{category}</Tag>
      <Price>{stockQuantity}</Price>
      <Tag type={statusToTagcategory[isAvailable]}>{String(isAvailable)}</Tag>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={itemId} />
          <Menus.List id={itemId}>

            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/items/${itemId}`)}>
              See Details
            </Menus.Button>

            {isAvailable === true && !isExpired &&
                <Menus.Button
                  icon={<HiOutlineShoppingCart />}
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Menus.Button>
            }

            <Modal.Open opens='edit'>
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>



        <Modal.Window name='edit'>
          <CreateItemForm itemToEdit={item} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="item"
            disabled={isDeleteing}
            onConfirm={() => deleteItem(itemId)}
          />
        </Modal.Window>
      </Modal>

    </Table.Row>
  )
}

export default ItemRow