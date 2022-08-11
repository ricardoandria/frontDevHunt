import React from "react";

import { Route, Switch } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Versement from "../pages/Products";
import Retrait from "../pages/Retrait";

const queryClient = new QueryClient();

const Routes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/client" component={Customers} />
        <Route path="/versement" component={Versement} />
        <Route path="/retrait" component={Retrait} />
      </Switch>
    </QueryClientProvider>
  );
};

export default Routes;
