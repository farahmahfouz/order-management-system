import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import ItemDataBox from "./ItemDataBox";

import useItem from "./useItem";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useDeleteItem } from "./useDeleteItem";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function ItemDetails() {

    const { isPending, item } = useItem();
    const { isDeleteing, deleteItem } = useDeleteItem();
    const { addToCart } = useCart();


    const moveBack = useMoveBack();
    const navigate = useNavigate();

    function handleAddToCart() {
        addToCart(item);
        toast.success("Item added to cart successfully");
        navigate("/cart");
      }
    

    if (isPending) return <Spinner />;
    if (!item) return <Empty resourceName="item" />;

    const { category, _id: itemId, isAvailable, expiryDate } = item;

    const isExpired = new Date(expiryDate) < new Date();


    const statusToTagName = {
        food: "blue",
        "beverages": "green",
        "others": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Item #{itemId.slice(0, 5)}</Heading>
                    <Tag type={statusToTagName[category]}>{category}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <ItemDataBox item={item} />

            <ButtonGroup>

                <Modal>
                    <Modal.Open opens="delete">
                        <Button variation="danger">Delete</Button>
                    </Modal.Open>

                    {isAvailable && !isExpired && (
                        <Button onClick={handleAddToCart}>Add to cart</Button>
                    )}

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="item"
                            disabled={isDeleteing}
                            onConfirm={() =>
                                deleteItem(itemId, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                        />
                    </Modal.Window>
                </Modal>

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default ItemDetails;
