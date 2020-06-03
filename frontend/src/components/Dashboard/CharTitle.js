import React from 'reactn';
import styled from "styled-components";

const Title = styled.p`
  font-family: var(--primary-font);
  font-size: 1.2rem;
  font-weight: lighter;
  color: var(--black);
`;

const CharTitle = ({title}) => {
  return <Title>{title}</Title>
}

export default CharTitle;