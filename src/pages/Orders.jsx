import Heading from '../ui/Heading'
import OrderTable from '../features/orders/OrderTable'
import Row from '../ui/Row'
import OrderTableOperations from '../features/orders/OrderTableOperations'
import { useTranslation } from 'react-i18next'

function Orders() {
  const {t}  = useTranslation()
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("orders.heading")}</Heading>
        <OrderTableOperations/>
      </Row>
      <OrderTable />
    </>
  )
}

export default Orders