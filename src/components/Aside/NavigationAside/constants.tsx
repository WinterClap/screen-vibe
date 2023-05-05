import { IconType } from "react-icons";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineLogout,
  AiOutlineStar,
  AiFillStar,
  AiFillCalendar,
  AiOutlineCalendar,
  AiOutlineFire,
  AiFillFire,
  AiOutlinePlayCircle,
  AiOutlinePlaySquare,
  AiFillPlaySquare,
  AiFillPlayCircle,
} from "react-icons/ai";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";

type CommonMenuItem = {
  regex?: RegExp;
  type?: undefined;
  href: {
    tv: string;
    movies: string;
  };
  name: string;
  icon: IconType;
  iconFill: IconType;
};
type ExclusiveMenuItem = {
  regex?: RegExp;
  type: "movies" | "tv";
  href: string;
  name: string;
  icon: IconType;
  iconFill: IconType;
};
const menuItems: (CommonMenuItem | ExclusiveMenuItem)[] = [
  {
    regex: /\/category\/(tv|movies)$/,
    href: { tv: "/category/tv", movies: "/category/movies" },
    name: "Home",
    icon: AiOutlineHome,
    iconFill: AiFillHome,
  },
  {
    href: { tv: "/category/tv/discover", movies: "/category/movies/discover" },
    name: "Discover",
    icon: AiOutlineCompass,
    iconFill: AiFillCompass,
  },
  {
    href: { tv: "/category/tv/popular", movies: "/category/movies/popular" },
    name: "Popular",
    icon: AiOutlineFire,
    iconFill: AiFillFire,
  },
  {
    href: { tv: "/category/tv/top-rated", movies: "/category/movies/top-rated" },
    name: "Top Rated",
    icon: AiOutlineStar,
    iconFill: AiFillStar,
  },
  {
    type: "movies",
    href: "/category/movies/upcoming",
    name: "Upcoming",
    icon: AiOutlineCalendar,
    iconFill: AiFillCalendar,
  },
  {
    type: "movies",
    href: "/category/movies/now-playing",
    name: "Now Playing",
    icon: AiOutlinePlayCircle,
    iconFill: AiFillPlayCircle,
  },
  {
    type: "tv",
    href: "/category/tv/airing-today",
    name: "Airing Today",
    icon: AiOutlinePlayCircle,
    iconFill: AiFillPlayCircle,
  },
  {
    type: "tv",
    href: "/category/tv/on-the-air",
    name: "On The Air",
    icon: AiOutlinePlaySquare,
    iconFill: AiFillPlaySquare,
  },
];

export const getMenuItems = (type: "movies" | "tv") => {
  const filteredMenuItems = [];
  for (let i = 0; i < menuItems.length; i++) {
    if (!menuItems[i].type || menuItems[i].type === type) {
      if (!menuItems[i].type) {
        filteredMenuItems.push({
          ...menuItems[i],
          href: (menuItems[i] as CommonMenuItem).href[type],
        });
      } else {
        filteredMenuItems.push({
          ...menuItems[i],
          href: (menuItems[i] as ExclusiveMenuItem).href,
        });
      }
    }
  }

  return filteredMenuItems;
};

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
