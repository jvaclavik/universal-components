// @flow

// TODO handle trinangle direction

import * as React from 'react';
import { View, TouchableOpacity } from 'react-native'; // TODO consider changing the TouchableOpacity to Button Touchable

import Triangel from './Triangel';
import Text from '../Text';

import StyleSheet from '../PlatformStyleSheet';

import type { TooltipTypes } from './TooltipTypes';

// TODO temp components just for development
const DefaultPopover = <Text>Dummy Text, will be removed</Text>;
const DummyChildren = <Text>Click here (just temp)</Text>;

type State = {
  isVisible: boolean,
};

class Tooltip extends React.PureComponent<TooltipTypes, State> {
  state = {
    isVisible: false,
  };

  toggleTooltip = () => {
    const { onClose } = this.props;
    this.setState(
      ({ isVisible }) => ({ isVisible: !isVisible }),
      onClose && onClose()
    );
  };

  renderContent = () => {
    const { isDown, popover = DefaultPopover } = this.props;
    // TODO style prop
    return (
      <View>
        <Triangel
          isDown={isDown}
          style={{ borderBottomColor: 'grey', top: 1 }}
        />
        <View style={styles.popoverContainer}>
          <View>{popover}</View>
        </View>
      </View>
    );
  };

  render() {
    const { style, isDown, onOpen, children = DummyChildren } = this.props;

    // TODO consider <View collapsable={false}> https://facebook.github.io/react-native/docs/view#collapsable
    return (
      <View>
        <TouchableOpacity onPress={this.toggleTooltip}>
          {children}
        </TouchableOpacity>
        {this.state.isVisible && this.renderContent()}
      </View>
    );
  }
}

// TODO backgroundColor as a props (same for Triangel)
const styles = StyleSheet.create({
  popoverContainer: {
    backgroundColor: 'grey',
    borderRadius: 2,
  },
});

export default Tooltip;
