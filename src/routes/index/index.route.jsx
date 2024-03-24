import { Fragment } from "react";
import Header from "../../components/header/header.component.jsx";
import HomeBanner from "../../components/homebanner/homebanner.component.jsx";


const IndexRoute = () => {
  return (
    <Fragment>
      <Header/>
      <HomeBanner/>
    </Fragment>
  );
};

export default IndexRoute;