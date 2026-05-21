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
import { usePermissions } from './../authentication/usePermissions';
import { useTranslation } from "react-i18next";
import i18n from './../../i18n';


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function ItemDetails() {

    const { isPending, item } = useItem();
    const { isDeleteing, deleteItem } = useDeleteItem();
    const { addToCart } = useCart();
    const { permissions } = usePermissions();
    const { t } = useTranslation();
    const isRTL = i18n.language === 'ar';


    const moveBack = useMoveBack();
    const navigate = useNavigate();

    function handleAddToCart() {
        addToCart(item);
        toast.success(t("items.details.addedToCart"));
        navigate("/cart");
    }


    if (isPending) return <Spinner />;
    if (!item) return <Empty  resourceName={t("items.details.notFound")} />;

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
                    <Heading as="h1"> {t("items.details.title", { id: itemId.slice(0, 5) })}</Heading>
                    <Tag type={statusToTagName[category]}>{t(`items.filter.${category}`)}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}> {isRTL ? <span>&rarr;</span> : <span>&larr;</span>} {t("common.back")}</ButtonText>
            </Row>

            <ItemDataBox item={item} />

            <ButtonGroup>

                <Modal>
                    {permissions.itemsWrite && (
                        <Modal.Open opens="delete">
                            <Button variation="danger">{t("common.delete")}</Button>
                        </Modal.Open>
                    )}

                    {isAvailable && !isExpired && (
                        <Button onClick={handleAddToCart}>{t("common.addToCart")}</Button>
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
                {t("common.back")}
                </Button>
            </ButtonGroup>
        </>
    );
}

export default ItemDetails;
