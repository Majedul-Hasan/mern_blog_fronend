import React from 'react'

import { css } from "@emotion/react";
//import CircleLoader from "react-spinners/CircleLoader";
import DotLoader from "react-spinners/DotLoader";


const override = css`
  display: flex ;
  margin: 20% auto;
  
  border-color: red;
`;

const LoadingComponent = () => { 
  return  <DotLoader color='red' loading={true} css={override} />
}

export default LoadingComponent