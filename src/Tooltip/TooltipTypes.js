// @flow

import { type StylePropType } from '../PlatformStyleSheet/StyleTypes';

export type TriangelTypes = {|
  +style?: StylePropType,
  +isDown?: boolean,
|};

export type TooltipTypes = {} & TriangelTypes;
