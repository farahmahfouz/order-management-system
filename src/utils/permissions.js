export const permissions = {
    super_admin: {
      users: true,
      itemsWrite: true,
      orders: true,
      google: true,
      reports: true,
    },
  
    manager: {
      users: true,
      itemsWrite: true,
      orders: true,
      google: true,
      reports: true,
    },
  
    cashier: {
      users: false,
      itemsWrite: false,
      orders: true,
      google: false,
      reports: false,
    },
  
    waiter: {
      users: false,
      itemsWrite: false,
      orders: false,
      google: false,
      reports: false,
    },
  };
