import styled from "styled-components";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

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
import OrderDataBox from "./OrderDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useOrder } from "./useOrder";
import { useCancelOrder } from "./useCancelOrder";
import { useCompleteOrder } from "./useCompeleteOrder";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function OrderDetail() {
    const { t } = useTranslation();
    const isRTL = i18n.language === "ar";
    const { isLoading, order } = useOrder();
    const { isCancel, cancelOrder } = useCancelOrder();
    const { isComplete, completeOrder } = useCompleteOrder();

    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if (!order) return <Empty resourceName={t("orders.details.notFound")} />;

    const { status, _id: orderId } = order;

    const statusToTagName = {
        pending: "blue",
        completed: "green",
        cancelled: "silver",
        expired: "red",
    };

    function handleCompleteOrder(id) {
        completeOrder(id, {
            onSuccess: () => {
                navigate("/orders");
            },
        });
    }

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">
                        {t("orders.details.title", { id: orderId.slice(0, 5) })}
                    </Heading>
                    <Tag type={statusToTagName[status]}>
                        {t(`orders.filter.${status}`)}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>
                    {isRTL ? <span>&rarr;</span> : <span>&larr;</span>}{" "}
                    {t("common.back")}
                </ButtonText>
            </Row>

            <OrderDataBox order={order} />

            <ButtonGroup>
                {status === "pending" && (
                    <Button
                        onClick={() => handleCompleteOrder(orderId)}
                        disabled={isComplete}
                    >
                        {t("orders.complete")}
                    </Button>
                )}

                {status === "pending" && (
                    <Modal>
                        <Modal.Open opens="delete">
                            <Button variation="danger">
                                {t("orders.cancelOrder")}
                            </Button>
                        </Modal.Open>

                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName="order"
                                disabled={isCancel}
                                onConfirm={() =>
                                    cancelOrder(orderId, {
                                        onSettled: () => navigate(-1),
                                    })
                                }
                            />
                        </Modal.Window>
                    </Modal>
                )}
                <Button variation="secondary" onClick={moveBack}>
                    {t("common.back")}
                </Button>
            </ButtonGroup>
        </>
    );
}

export default OrderDetail;
