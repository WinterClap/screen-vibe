import { IconType } from "react-icons";
import {
  AiOutlineHome,
  AiFillHome,
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
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";

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
  type: "movies" | "tv";
  href: string;
  name: string;
  icon: IconType;
  iconFill: IconType;
  regex?: RegExp;
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

export const getLibraryMenuItems = (type: "movies" | "tv") => {
  const filteredMenuItems = [];
  for (let i = 0; i < libraryItems.length; i++) {
    if (!menuItems[i].type || libraryItems[i].type === type) {
      if (!libraryItems[i].type) {
        filteredMenuItems.push({
          ...libraryItems[i],
          href: (libraryItems[i] as CommonMenuItem).href[type],
        });
      } else {
        filteredMenuItems.push({
          ...libraryItems[i],
          href: (libraryItems[i] as ExclusiveMenuItem).href,
        });
      }
    }
  }

  return filteredMenuItems;
};

export const libraryItems: (CommonMenuItem | ExclusiveMenuItem)[] = [
  {
    href: { tv: "/category/tv/favorites", movies: "/category/movies/favorites" },
    name: "Favorites",
    icon: IoMdHeartEmpty,
    iconFill: IoMdHeart,
  },
  {
    href: { tv: "/category/tv/watchlist", movies: "/category/movies/watchlist" },
    name: "Watchlist",
    icon: MdOutlineWatchLater,
    iconFill: MdWatchLater,
  },
];

export type BottomItems = {
  name: "Settings" | "Log out";
  identifier: "settings" | "log-out";
  icon: IconType;
  iconFill?: IconType;
  href?: string;
}[];

export const bottomItems: BottomItems = [
  { identifier: "settings", name: "Settings", icon: IoSettingsOutline, iconFill: IoSettings },
  { identifier: "log-out", name: "Log out", icon: AiOutlineLogout, iconFill: AiOutlineLogout },
];
