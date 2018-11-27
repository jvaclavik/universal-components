// @flow

import * as React from 'react';
import { View, Text } from 'react-native';

import StyleSheet from '../PlatformStyleSheet';

import type { TriangelTypes } from './TooltipTypes';

const Triangel = ({ style, isDown = false }: TriangelTypes) => (
  <View style={[styles.triangel, isDown && styles.down, style]} />
);

const styles = StyleSheet.create({
  down: {
    transform: [{ rotate: '180deg' }],
  },
  triangel: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderStartWidth: 8,
    borderEndWidth: 8,
    borderBottomWidth: 8,
    borderStartColor: 'transparent',
    borderEndColor: 'transparent',
    borderBottomColor: 'green',
  },
});

export default Triangel;
