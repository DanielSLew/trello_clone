import React from "react";
import { Route } from "react-router-dom";
import TopNav from "./shared/TopNav";
import BoardsDashboardContainer from "./dashboard/BoardsDashboardContainer";
import BoardContainer from "./board/BoardContainer";
import CardModal from "./card/CardModal";

const Application = () => {
  return (
    <div>
      <TopNav />
      <Route path="/" exact component={BoardsDashboardContainer} />
      <Route path="/boards" exact component={BoardsDashboardContainer} />
      <Route path="/(boards|cards)/:id" exact component={BoardContainer} />
      <Route path="/cards/:id" exact component={CardModal} />
    </div>
  );
};

export default Application;
