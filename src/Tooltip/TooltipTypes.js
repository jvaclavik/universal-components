// @flow

import * as React from 'react';
import { type StylePropType } from '../PlatformStyleSheet/StyleTypes';

export type TriangelTypes = {|
  +style?: StylePropType,
  +isDown?: boolean,
|};

export type TooltipTypes = {|
  +popover: React.Node,
  +onOpen: () => void,
  ...TooltipTypes,
|};
