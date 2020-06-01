import React, { useGlobal, useEffect, useState } from 'reactn';
import styled from "styled-components";
import { Spin } from 'antd';

const SpinnerStyled = styled(Spin)`
  min-height: ${({ fullHeight }) => fullHeight ? `${window.innerHeight}px` : '300px'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({fullHeight=false, size="large"}) => {
    return <SpinnerStyled size={size} fullHeight={fullHeight}/>
}