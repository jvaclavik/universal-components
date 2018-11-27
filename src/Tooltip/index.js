// @flow

import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Triangel from './Triangel';
import Text from '../Text';

import type { TooltipTypes } from './TooltipTypes';

// TODO temp components just for development
const DefaultPopover = <Text>Dummy Text, will be removed</Text>;
const DummyChildren = <Text>Click here (just temp)</Text>;

type State = {
  isOpen: boolean,
};

class Tooltip extends React.PureComponent<TooltipTypes, State> {
  state = {
    isOpen: false,
  };

  toggleTooltip = () => {
    const { onClose } = this.props;
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }), onClose && onClose());
  };

  renderContent = () => {
    const { isDown, popover = DefaultPopover } = this.props;
    return (
      <>
        <Triangel isDown={isDown} />
        <View>{popover}</View>
        <View testID="tooltipPopoverContainer" />
      </>
    );
  };

  render() {
    const { style, isDown, onOpen, children = DummyChildren } = this.props;

    return (
      <View>
        <TouchableOpacity onPress={this.toggleTooltip}>
          {children}
        </TouchableOpacity>
        {this.state.isOpen && this.renderContent()}
      </View>
    );
  }
}

export default Tooltip;
