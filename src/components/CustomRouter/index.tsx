import { useLayoutEffect, useState } from 'react';

import { BrowserHistory } from 'history';
import { Router, RouterProps } from 'react-router-dom';

interface CustomRouterProps extends Partial<RouterProps> {
  history: BrowserHistory;
}

const CustomRouter = (props: CustomRouterProps) => {
  const { history, ...rest } = props;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router {...rest} location={state.location} navigationType={state.action} navigator={history} />
  );
};

export default CustomRouter;
