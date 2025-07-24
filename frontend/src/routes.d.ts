interface Handle {
  pageTitle?: string;
  tabTitle?: string;
  icon?: React.ElementType;
  disableLink?: boolean;
}

interface RouteMatch {
  id: string;
  handle?: Handle;
  pathname: string;
}
