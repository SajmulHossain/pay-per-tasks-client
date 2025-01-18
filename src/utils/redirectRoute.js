const redirect = (role, isRolling) => {
  let dashboardPath = "/dashboard";

  if (!isRolling) {
    switch (role) {
      case "admin":
        dashboardPath = "/dashboard/admin-home";
        break;
      case "worker":
        dashboardPath = "/dashboard/worker-home";
        break;
      case "buyer":
        dashboardPath = "/dashboard/buyer-home";
        break;

      default:
        dashboardPath = "/";
        break;
    }
  }

  return dashboardPath;
};


export default redirect;