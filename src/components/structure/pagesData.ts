type PageInfo = {
  path: string;
  title: string;
};

type PageKey =
  | "search"
  | "trending"
  | "upcoming"
  | "top-rated"
  | "shows"
  | "movies"
  | "calendar"
  | "profile"
  | "settings"
  | "contacts"
  | "about";

export const pagesData: { [key in PageKey]: PageInfo } = {
  search: { path: "/search", title: "Search" },
  trending: { path: "/trending", title: "Trending" },
  upcoming: { path: "/upcoming", title: "Upcoming" },
  "top-rated": { path: "/top-rated", title: "Top rated" },
  shows: { path: "/shows", title: "Shows" },
  movies: { path: "/movies", title: "Movies" },
  calendar: { path: "/calendar", title: "Calendar" },
  profile: { path: "/profile", title: "Profile" },
  settings: { path: "/settings", title: "Settings" },
  contacts: { path: "/contacts", title: "Contacts" },
  about: { path: "/about", title: "About" },
};

export type ScreenBreakpoints = "xs" | "sm" | "md" | "lg" | "xl";

export type HeaderMenuItem = {
  id: PageKey;
  supportedSizes?: ScreenBreakpoints[];
};

export type HeaderMenuGroup = {
  id: string;
  title: string;
  submenu: HeaderMenuItem[];
  supportedSizes?: ScreenBreakpoints[];
};

export const isHeaderMenuGroup = (
  element: HeaderMenuItem | HeaderMenuGroup
): element is HeaderMenuGroup => {
  return (element as HeaderMenuGroup).submenu !== undefined;
};

export const headerMenuStructure: (HeaderMenuItem | HeaderMenuGroup)[] = [
  { id: "search", supportedSizes: ["sm", "md", "lg", "xl"] },
  {
    id: "discover",
    title: "Discover",
    supportedSizes: ["xs"],
    submenu: [
      { id: "search", supportedSizes: ["xs"] },
      // { id: "trending" },
      // { id: "upcoming" },
      // { id: "top-rated" },
    ],
  },
  // { id: "shows", supportedSizes: ["lg", "xl"] },
  // { id: "movies", supportedSizes: ["lg", "xl"] },
  // { id: "calendar", supportedSizes: ["lg", "xl"] },
  // {
  //   id: "my-lists",
  //   title: "My lists",
  //   supportedSizes: ["xs", "sm", "md"],
  //   submenu: [{ id: "shows" }, { id: "movies" }, { id: "calendar" }],
  // },
  // {
  //   id: "manage",
  //   title: "Manage",
  //   submenu: [{ id: "profile" }, { id: "settings" }],
  // },
];

type FooterMenuItem = {
  groupTitle: string;
  content: { id: PageKey }[];
};

export const footerMenuStructure: FooterMenuItem[] = [
  {
    groupTitle: "Search",
    content: [{ id: "search" }],
  },
  // {
  //   groupTitle: "Discover",
  //   content: [{ id: "trending" }, { id: "upcoming" }, { id: "top-rated" }],
  // },
  // { groupTitle: "Personalize", content: [{ id: "shows" }, { id: "movies" }, { id: "calendar" }] },
  {
    groupTitle: "Manage",
    content: [
      // { id: "profile" },
      // { id: "contacts" },
      { id: "about" },
    ],
  },
];
