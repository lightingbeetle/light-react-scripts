import React from 'react';
import styled from 'styled-components';

import InteractContext from './state';

const PropsGroup = ({ id }) => (
  <InteractContext.Consumer>
    {({ renderInput, state, props, docgen }) => {
      const statePropNames = Object.keys(docgen.liveProps[id]);
      const propCount = statePropNames.length;

      return (
        state.showProps[id] && (
          <StyledWrapper>
            {propCount ? (
              statePropNames.map(name => {
                return props.filterProps.find(filtered => filtered === name)
                  ? null
                  : renderInput(id, name);
              })
            ) : (
              <p>There are no props to edit, try another component!</p>
            )}
          </StyledWrapper>
        )
      );
    }}
  </InteractContext.Consumer>
);

const StyledWrapper = styled.div`
  border-left: 1px solid ${props => props.theme.colors.greyDark};
  padding-left: ${props => props.theme.spaces.small};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: -1px;
    height: 20px;
    width: 0;
    border-left: 1px solid ${props => props.theme.colors.greyDark};
  }
`;

export default PropsGroup;
