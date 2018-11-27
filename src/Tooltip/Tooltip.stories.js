// @flow

import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";

import Tooltip from "./index";

storiesOf("Tooltip", module).add("default", () => {
  return <Tooltip />;
});
