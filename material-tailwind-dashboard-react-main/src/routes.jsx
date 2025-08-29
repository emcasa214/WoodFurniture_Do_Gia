import {
  ChartPieIcon,
  UserIcon,
  TableCellsIcon,
  BellAlertIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import Home from "./pages/dashboard/home";
import Profile from "./pages/dashboard/profile";
import Tables from "./pages/dashboard/tables";
import Notifications from "./pages/dashboard/notifications";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import RequireAuth from "./pages/auth/RequireAuth";

const routes = [
  {
    layout: "dashboard",
    title: "Main",
    pages: [
      {
        icon: <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
        name: "dashboard",
        path: "/home",  
        element:  <RequireAuth><Home /></RequireAuth>,
      },
      {
        icon: <UserIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
        name: "Danh sách đơn hàng",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
        name: "Danh sách sản phẩm",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <BellAlertIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    layout: "auth",
    title: "Auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;