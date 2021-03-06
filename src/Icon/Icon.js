// @flow

import * as React from 'react';
import { Text as RNText } from 'react-native';
import StyleSheet from '../PlatformStyleSheet';

import iconsMap from './icons.json';

export type Props = {|
  +name: string,
  size?: number,
  color?: string,
|};

const getIconCharacter = name => {
  const icon = iconsMap[name];
  if (!icon) {
    throw Error(`Icon with name "${name}" does not exist.`);
  }

  if (/^E(.{3})$/.test(iconsMap[name].character)) {
    return String.fromCharCode(parseInt(iconsMap[name].character, 16));
  }
  return iconsMap[name].character;
};

export default function Icon({ name, color, size }: Props) {
  return (
    <RNText
      color={color}
      size={size}
      style={[styles.icon, { color, fontSize: size }]}
    >
      {getIconCharacter(name)}
    </RNText>
  );
}

Icon.defaultProps = {
  color: '#46515e',
  size: 20,
};

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'orbit-icons',
    android: {
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
  },
});
