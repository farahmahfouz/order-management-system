import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import { CartProvider } from "./context/CartContext";

import Dashboard from "./pages/Dashboard"
import Items from "./pages/Items"
import Item from "./pages/Item"
import Orders from "./pages/Orders"
import Employees from "./pages/Employees"
import AppLayout from "./ui/AppLayout"
import GlobalStyles from "./styles/GlobalStyles"
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";
import Order from "./pages/Order";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
})

function App() {
  return (
    <DarkModeProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route index element={<Navigate replace to='dashboard' />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="items" element={<Items />} />
                <Route path="items/:itemId" element={<Item />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:orderId" element={<Order />} />
                <Route path="employees" element={<Employees />} />
                <Route path="account" element={<Account />} />
                <Route path="cart" element={<Cart />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path='forgotPassword' element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000
              },
              error: {
                duration: 5000
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'var(--color-grey-0)',
                color: 'var(--color-grey-700)'
              }
            }} />
        </QueryClientProvider>
      </CartProvider>
    </DarkModeProvider>
  )
}

export default App