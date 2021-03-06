import React, {useRef, useEffect, useState} from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { makeSelectDataForChart } from "../../reducers/selectResults";
import { renderD3Table } from "./render";
import { selectTimeValue, selectModellingDisplayVariable, isModelViewSelected } from "../../reducers/settings";

export const tableDimensions = {
  minWidth: 570,
  maxWidth: 1000,
  minHeight: 550,
  maxHeight: 1000
};
const margin = 10;
const Container = styled.div`
  min-width: ${(props) => props.width - 2*margin}px;
  max-width: ${(props) => props.width - 2*margin}px;
  min-height: ${(props) => props.height - 2*margin}px;
  max-height: ${(props) => props.height - 2*margin}px;
  margin: ${margin}px;
  position: relative;
`;
const Toggle = styled.button` /* to do: actually make this a toggle! */
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const Table = (props) => {
  const refElement = useRef(null);
  const ref = useRef({}); /* see renderD3Table for description */
  const [percCountToggle, changePercCountToggle] = useState("count");

  const titleText = !props.data ?
    "" : props.isModelViewSelected ?
      `Modelling ${props.selectedModellingDisplayVariable.label} incidence for ${props.selectedTime.label}` :
      `${props.data.primaryVariable.label}${props.data.groupByVariable ? ` with ${props.data.groupByVariable.label} restricted to ${props.data.groupByValue}` : ""}`;

  useEffect(() =>
    renderD3Table({
      domRef: refElement.current,
      ref: ref.current,
      width: props.width-2*margin,
      // I had to set a validation here because it seems sometimes props.data.demes is not
      // defined during first load, and this would crash the app
      height: !props.data.demes ? props.height - 2 * margin : props.data.demes.length * 28,
      data: props.data,
      titleText,
      showAsPerc: percCountToggle==="perc",
      selectedTime: props.selectedTime,
      selectedModellingDisplayVariable: props.selectedModellingDisplayVariable
    })
  );

  const renderPercentageCountsToggle = () => {
    if (!props.data.percentages) return null;
    return (
      <Toggle onClick={() => changePercCountToggle(percCountToggle === "count" ? "perc" : "count")}>
        {`display ${percCountToggle === "count" ? "perc" : "count"}`}
      </Toggle>
    );
  };

  return (
    <Container width={props.width} height={tableDimensions.minHeight}>
      {renderPercentageCountsToggle()}
      <div ref={refElement}/>
    </Container>
  );
};

/* The "typical" mapStateToProps fn, which returns an object, runs each time a component updates
 * This doesn't allow us to "create" a memoised selector from a factory, as it'd be created each time
 * (this isn't a concern for a "normal" memoised selector which is only employed in one place)
 * If mapStateToProps returns a fn, then it will be used to create an individual mapStateToProps function
 * see https://github.com/reduxjs/reselect
 */
const makeMapStateToProps = () => {
  const selectDataForChart = makeSelectDataForChart();
  const mapStateToProps = (state, props) => {
    return {
      data: selectDataForChart(state, props),
      isModelViewSelected: isModelViewSelected(state),
      selectedTime: selectTimeValue(state),
      selectedModellingDisplayVariable: selectModellingDisplayVariable(state)
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(Table);
