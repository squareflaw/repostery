import React from 'reactn';
import styled from "styled-components";

const Title = styled.p`
  padding: 20px;
  font-family: var(--primary-font);
  font-size: 1.1rem;
  font-weight: lighter;
  color: var(--black);
`;

const CharTitle = ({title}) => {
  return <Title>{title}</Title>
}

export default CharTitle;