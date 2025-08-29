import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Doanh Thu Tháng Này",
    value: "20.000.000đ",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "so với tháng trước",
    },
  },
  // {
  //   color: "gray",
  //   icon: UsersIcon,
  //   title: "Lượt truy cập tháng này",
  //   value: "2,300",
  //   footer: {
  //     color: "text-green-500",
  //     value: "+3%",
  //     label: "so với tháng trước",
  //   },
  // },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Khách hàng mới",
    value: "30",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Tổng số đơn hàng tháng này",
    value: "20",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "so với tháng trước",
    },
  },
];

export default statisticsCardsData;
