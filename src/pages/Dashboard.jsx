import DashboardLayout from "../features/dashboard/DashboardLayout"
import Heading from "../ui/Heading"
import Row from "../ui/Row"

function Dashboard() {
  return (
    <div>
       <>
      <Row
       type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>
      <DashboardLayout />
    </>
      
    </div>
  )
}

export default Dashboard