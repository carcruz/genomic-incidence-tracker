import styled from 'styled-components';
import React from 'react';
import { headerHeight } from '../header';

/* The Sidebar is intended to be a reusable component for different "screens"
 * which this app may one day use.
 *
 * If we want to create a collapsable sidebar similar to auspice
 * I suggest looking at SidebarContainer (in Auspice) for a working solution
 */

const SidebarOuterContainer = styled.div`
  height: ${(props) => (props.height-headerHeight)+"px"};
  width: ${(props) => props.width+"px"};
  max-width: ${(props) => props.width+"px"};
  box-shadow: ${(props) => props.theme.sidebarBoxShadow};
  top: ${headerHeight}px;
  bottom: 0;
  left: 0;
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.sidebarBackground};
`;

const SidebarInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  flex-wrap: nowrap;
  height: 100%;
  order: 0;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  padding: 20px 20px 20px 20px;
`;

const Sidebar = ({width, height, children}) => (
  <SidebarOuterContainer width={width} height={height}>
    <SidebarInnerContainer>
      {children}
    </SidebarInnerContainer>
  </SidebarOuterContainer>
);

export default Sidebar;
