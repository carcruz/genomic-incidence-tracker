import React from 'react';
import styled from 'styled-components';


export const tableDimensions = {
  minWidth: 400,
  maxWidth: 1000,
  minHeight: 150,
  maxHeight: 1000
};

const Placeholder = styled.div`
  background-color: aquamarine;
  min-width: ${(props) => props.width}px;
  max-width: ${(props) => props.width}px;
  min-height: ${(props) => props.height}px;
  max-height: ${(props) => props.height}px;
  font-size: 20px;
`;

const Table = ({variable, geoResolution, width, height}) => {
  return (
    <Placeholder width={width} height={height}>
      <div>TABLE</div>
      <div>{`x-axis: ${variable.label}`}</div>
      <div>{`rows: ${geoResolution.label}`}</div>
      <div>{`colours: to do`}</div>
    </Placeholder>
  );
};

export default Table;