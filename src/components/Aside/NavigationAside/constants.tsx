import { IconType } from "react-icons";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineClockCircle,
  AiFillClockCircle,
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineLogout,
} from "react-icons/ai";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";

export const menuItems = [
  {
    href: "",
    name: "Home",
    icon: AiOutlineHome,
    iconFill: AiFillHome,
  },
  {
    href: "",
    name: "Discovery",
    icon: AiOutlineCompass,
    iconFill: AiFillCompass,
  },
  {
    href: "",
    name: "Comming soon",
    icon: AiOutlineClockCircle,
    iconFill: AiFillClockCircle,
  },
];

export const libraryItems = [
  {
    href: "",
    name: "Recent",
  },
];

export type BottomItems = {
  name: "Settings" | "Logout";
  icon: IconType;
  iconFill?: IconType;
  href?: string;
}[];

export const bottomItems: BottomItems = [
  { name: "Settings", icon: IoSettingsOutline, iconFill: IoSettings },
  { name: "Logout", icon: AiOutlineLogout, iconFill: AiOutlineLogout },
];
