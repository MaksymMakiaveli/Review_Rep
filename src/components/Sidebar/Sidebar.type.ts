interface SidebarProps {}

export type LinkListType = {
  title: string;
  link: string;
  icon?: JSX.Element;
  children?: LinkListType[];
};

export default SidebarProps;
