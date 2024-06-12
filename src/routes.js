import DashboardComponent from "./components/Dashboard/DashboardComponent";
export const Routes = [
    {
      name: "Dashboard",      
      path: "/dashboard",
      component: <DashboardComponent />,
      hide: false,
      permission: "default",
    },
    {
        name: "Analytics",      
        path: "/analytics",
        component: <DashboardComponent />,
        hide: false,
        permission: "default",
      },
      {
        name: "Create Quiz",      
        path: "/create-quiz",
        component: <DashboardComponent />,
        hide: false,
        permission: "default",
      },
];