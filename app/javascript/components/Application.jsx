import React from "react";
import { Route } from "react-router-dom";
import TopNav from "./shared/TopNav";
import BoardsDashboardContainer from "./dashboard/BoardsDashboardContainer";
import BoardContainer from "./board/BoardContainer";
import CardModalContainer from "./card/CardModalContainer";

const Application = () => {
  return (
    <div>
      <TopNav />
      <Route path="/" exact component={BoardsDashboardContainer} />
      <Route path="/boards" exact component={BoardsDashboardContainer} />
      <Route path="/(boards|cards)/:id" exact component={BoardContainer} />
      <Route path="/cards/:id" exact component={CardModalContainer} />
    </div>
  );
};

export default Application;
