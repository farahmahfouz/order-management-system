import styled from "styled-components";
import {
    HiArrowDownOnSquare,
    HiEye,
    HiTrash,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useCompleteOrder } from "./useCompeleteOrder";
import { useCancelOrder } from "./useCancelOrder";

const Order = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
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

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-brand-500);
`;

function OrderRow({
    order: {
        _id: orderId,
        createdAt,
        totalCost,
        status,
        items,
        cashier: { name: cashierName, email },
    },
}) {
    const navigate = useNavigate();
    const { isCancel, cancelOrder } = useCancelOrder();
    const { isComplete, completeOrder } = useCompleteOrder();

    const statusToTagName = {
        pending: "blue",
        "completed": "green",
        "cancelled": "silver",
        "expired": "red"
    };

    return (
        <Table.Row>
            <Order>{orderId.slice(0, 5)}</Order>

            <Stacked>
                <span>{cashierName}</span>
                <span>{email}</span>
            </Stacked>
            <Stacked>{format(new Date(createdAt), "MMM dd yyyy")}</Stacked>


            <Tag type={statusToTagName[status]}>{status}</Tag>
            <Amount>{formatCurrency(totalCost)}</Amount>

            <Stacked> {items?.map(item => item.quantity).join(", ")}</Stacked>


            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={orderId} />
                    <Menus.List id={orderId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() => navigate(`/orders/${orderId}`)}
                        >
                            See details
                        </Menus.Button>

                        {status === "pending" && (
                            <Menus.Button
                                icon={<HiArrowDownOnSquare />}
                                onClick={() => completeOrder(orderId)}
                                disabled={isComplete}
                            >
                                Complete
                            </Menus.Button>
                        )}

                        {status === "pending" && <Modal.Open opens="delete">
                            <Menus.Button icon={<HiTrash />}>Cancel Order</Menus.Button>
                        </Modal.Open>
                        }
                    </Menus.List>
                </Menus.Menu>

                <Modal.Window name="delete">
                    <ConfirmDelete
                        resourceName="order"
                        disabled={isCancel}
                        onConfirm={() => cancelOrder(orderId)}
                    />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}

export default OrderRow;
