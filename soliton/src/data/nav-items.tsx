import {
  BoxCubeIcon,
  CalendarIcon,
  UserCircleIcon,
  PieChartIcon,
  PlugInIcon,
  HorizontalDots,
  GridIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  ChevronDownIcon,
} from "@/src/icons/index";
import { NavItem } from "./type";

export const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      { name: "Ecommerce", path: "/" },
      { name: "Chart", path: "/chart" },
      { name: "Dashboard", path: "/dashboard" },
      { name: "Amazon", path: "/d" },
      { name: "Google Shop", path: "/e" },
    ],
  },
  {
    icon: <CalendarIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
  {
    icon: <UserCircleIcon />,
    name: "Login",
    path: "/login",
  },

  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [
      { name: "Form Elements", path: "/form-elements" },
      { name: "New Elements", path: "/form-elementsa" },
      { name: "Old Elements", path: "/form-elementsb" },
    ],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/table" }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank" },
      { name: "404 Error", path: "/error-404" },
    ],
  },
];

export const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart" },
      { name: "Bar Chart", path: "/bar-chart" },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts" },
      { name: "Avatar", path: "/avatars" },
      { name: "Badge", path: "/badge" },
      { name: "Buttons", path: "/buttons" },
      { name: "Images", path: "/images" },
      { name: "Videos", path: "/videos" },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" },
    ],
  },
];
