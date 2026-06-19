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

export const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      { name: "Ecommerce", path: "/" },
      { name: "Chart", path: "/chart" },
    ],
  },
  {
    icon: <CalendarIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "TEST",
    path: "/profile",
  },

  {
    name: "TESTx",
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
    name: "TEST Elements",
    subItems: [
      { name: "Alerts", path: "/alerts" },
      { name: "Avatar", path: "/avatars" },
      { name: "Badge", path: "/badge" },
      { name: "Buttons", path: "/buttons" },
      { name: "Images", path: "/images" },
      { name: "Videos", path: "/videos" },
    ],
  },
];
