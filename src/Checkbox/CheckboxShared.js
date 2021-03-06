// @flow

import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import CheckboxText from './CheckboxText';
import CheckboxIcon from './CheckboxIcon';
import Hoverable from './Hoverable';
import theme, { parseStringToFloat } from './styles';
import StyleSheet from '../PlatformStyleSheet';
import type { CheckboxSharedProps, CheckboxSharedState } from './CheckboxTypes';

class CheckboxShared extends React.Component<
  CheckboxSharedProps,
  CheckboxSharedState
> {
  constructor(props: CheckboxSharedProps) {
    super(props);

    this.state = {
      focusDisplayed: false,
      hovered: false,
      pressed: false,
    };
  }

  handleOnMouseEnter = () => {
    this.setState({ hovered: true });
  };

  handleOnMouseLeave = () => {
    this.setState({ hovered: false });
  };

  handleOnPressIn = () => {
    this.setState({ pressed: true });
  };

  handleOnPressOut = () => {
    this.setState({ pressed: false, focusDisplayed: false });
  };

  handleOnFocus = () => {
    this.setState({ focusDisplayed: true });
  };

  handleOnBlur = () => {
    this.setState({ focusDisplayed: false });
  };

  render() {
    const { label, hasError, disabled, checked, info, onPress } = this.props;
    const { focusDisplayed, hovered, pressed } = this.state;

    return (
      <Hoverable
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        {/* $FlowFixMe - missing declaration for onFocus + onBlußr - react-native issue ( https://github.com/facebook/react-native/pull/21462 ) */}
        <TouchableWithoutFeedback
          onPress={onPress}
          onPressIn={this.handleOnPressIn}
          onPressOut={this.handleOnPressOut}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          disabled={disabled}
        >
          <View style={[styles.view, disabled && styles.viewDisabled]}>
            <CheckboxIcon
              checked={checked}
              hasError={hasError}
              disabled={disabled}
              focused={focusDisplayed}
              hovered={hovered}
              pressed={pressed}
            />
            <CheckboxText label={label} checked={checked} info={info} />
          </View>
        </TouchableWithoutFeedback>
      </Hoverable>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    web: {
      outline: '0',
    },
  },
  viewDisabled: {
    opacity: parseStringToFloat(theme.orbit.opacityCheckboxDisabled),
  },
});

export default CheckboxShared;
