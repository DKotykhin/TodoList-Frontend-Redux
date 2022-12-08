import React from 'react';
import { Helmet } from "react-helmet";

import Error from "../components/error/Error";

const Page404: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Error Page" />
        <title>Error Page</title>
      </Helmet>
      <Error />
    </>
  )
}

export default Page404