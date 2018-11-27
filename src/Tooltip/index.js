// @flow

import * as React from 'react';
import { View } from 'react-native';

import Triangel from './Triangel';
import Text from '../Text';

import type { TooltipTypes } from './TooltipTypes';

/**
 * Tooltip Component
 *
 * The component accepts two props style and isDown
 *
 */

const Tooltip = ({ style, isDown }: TooltipTypes) => (
  <View>
    <Triangel />
    <Text>Tooltip</Text>
  </View>
);

export default Tooltip;
