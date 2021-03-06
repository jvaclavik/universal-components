// @flow

import * as React from 'react';
import {
  TextInput as RNTextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

import Text from '../Text';
import FormLabel from './FormLabel';
import { Icon } from '../Icon';
import { FormFeedback } from '../FormFeedback';
import StyleSheet from '../PlatformStyleSheet';
import { createStylesGenerator } from '../utils';
import { fontSize, height } from './styles';

import type { Props, State } from './TextInputTypes';

const fontSizeGen = createStylesGenerator('fontSize', fontSize);
const heightGen = createStylesGenerator('height', height);

const Prefix = ({ children, size, status }) => {
  const prefix = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      let iconColor = defaultTokens.colorIconInput;

      if (Platform.OS !== 'web') {
        if (status === 'warning') {
          iconColor = defaultTokens.colorIconCritical;
        } else if (status === 'success') {
          iconColor = defaultTokens.colorIconSuccess;
        } else iconColor = defaultTokens.colorIconSecondary;
      }

      return React.cloneElement(child, {
        color: iconColor,
        size: size === 'small' ? 16 : 24,
      });
    }
    return child;
  });

  return (
    <View style={styles.prefix}>
      <Text style={styles.textInputPrefix}>{prefix}</Text>
    </View>
  );
};

const Suffix = ({ children }) => {
  const suffix = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        size: 16,
      });
    }
    return child;
  });

  return <View style={styles.suffix}>{suffix}</View>;
};

const ClearButton = ({ onPress, focused, value }) => {
  if (focused && value) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name="close-circle" color={defaultTokens.colorIconSecondary} />
      </TouchableOpacity>
    );
  }
  return null;
};

const InlineLabel = ({ children }) => (
  <View style={styles.inlineLabel}>{children}</View>
);

class TextInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      focused: false,
      value: props.value || '',
    };
  }

  myref: ?RNTextInput;

  toggleFocus = () => {
    this.setState(state => ({
      focused: !state.focused,
    }));
  };

  handleOnFocus = () => {
    const { onFocus, disabled } = this.props;
    if (!disabled) {
      this.toggleFocus();
      onFocus && onFocus();
    }
  };

  handleOnBlur = () => {
    const { onBlur, disabled } = this.props;
    if (!disabled) {
      this.toggleFocus();
      onBlur && onBlur();
    }
  };

  handleChangeText = (value: string) => {
    const { onChangeText, disabled } = this.props;
    if (!disabled) {
      this.setState({ value });
      onChangeText && onChangeText(value);
    }
  };

  handleKeyboardType = (type: string) => {
    switch (type) {
      case 'number':
        return 'numeric';
      case 'email':
        return 'email-address';
      default:
        return 'default';
    }
  };

  refToTextInput = (ref: ?RNTextInput) => {
    this.myref = ref;
  };

  focusTextInput = () => {
    this.myref && this.myref.focus();
  };

  clearValue = () => {
    this.setState({ value: '' });
  };

  render() {
    const {
      placeholder,
      size = 'normal',
      disabled,
      label,
      required,
      prefix,
      inlineLabel,
      suffix,
      type = 'text',
      error,
      help,
      maxLength,
      minLength,
      status = 'default',
    } = this.props;
    const { focused, value } = this.state;

    const ifSuccess = status === 'success' && Platform.OS !== 'web';
    const ifWarning = status === 'warning' && Platform.OS !== 'web';

    let placeholderTextColor = defaultTokens.colorPlaceholderInput;

    if (Platform.OS !== 'web') {
      if (status === 'success') {
        placeholderTextColor = defaultTokens.colorTextSuccess;
      } else if (status === 'warning') {
        placeholderTextColor = defaultTokens.paletteRedLightActive;
      } else placeholderTextColor = defaultTokens.paletteInkLight;
    }

    return (
      <TouchableWithoutFeedback onPress={this.focusTextInput}>
        <View style={styles.inputWrapper}>
          {label != null && !inlineLabel && (
            <FormLabel filled={!!value} required={required} disabled={disabled}>
              {label}
            </FormLabel>
          )}
          <View
            style={[
              styles.inputContainer,
              styles[size],
              disabled && styles.inputContainerDisabled,
              focused && styles.inputContainerBorderFocused,
              error && !focused && styles.inputContainerBorderError,
              ifSuccess && styles.inputContainerSuccess,
              ifWarning && styles.inputContainerWarning,
            ]}
          >
            {prefix != null && (
              <Prefix size={size} status={status}>
                {prefix}
              </Prefix>
            )}
            {label != null && inlineLabel && (
              <InlineLabel>
                <FormLabel
                  filled={!!value}
                  inlineLabel
                  required={required}
                  disabled={disabled}
                >
                  {label}
                </FormLabel>
              </InlineLabel>
            )}
            {/* $FlowFixMe
             * Prop `minLength` is not supported in rn-web
             * and doesn't exist in TextInput props,
             * but it's catched by web and works with input field.
             */}
            <RNTextInput
              ref={this.refToTextInput}
              onFocus={this.handleOnFocus}
              onBlur={this.handleOnBlur}
              onChangeText={this.handleChangeText}
              placeholderTextColor={placeholderTextColor}
              editable={!disabled}
              placeholder={placeholder}
              value={value}
              keyboardType={this.handleKeyboardType(type)}
              secureTextEntry={type === 'password'}
              maxLength={maxLength}
              minLength={minLength}
              style={[
                styles.inputField,
                disabled && styles.inputFieldDisabled,
                ifSuccess && styles.inputFieldSuccess,
                ifWarning && styles.inputFieldWarning,
                styles[size],
              ]}
            />
            {Platform.OS !== 'web' && (
              <ClearButton
                onPress={this.clearValue}
                focused={focused}
                value={value}
              />
            )}
            {suffix != null && Platform.OS === 'web' && (
              <Suffix>{suffix}</Suffix>
            )}
          </View>
          {help != null && !error && (
            <FormFeedback type="help">{help}</FormFeedback>
          )}
          {error != null && <FormFeedback type="error">{error}</FormFeedback>}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    web: {
      cursor: 'text',
    },
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: parseFloat(defaultTokens.borderRadiusNormal),
    paddingHorizontal: parseFloat(defaultTokens.spaceSmall),
    backgroundColor: defaultTokens.backgroundInputDisabled,
    web: {
      borderWidth: parseFloat(defaultTokens.borderWidthInput),
      borderColor: defaultTokens.borderColorInput,
      backgroundColor: defaultTokens.backgroundInput,
    },
  },
  inputContainerDisabled: {
    backgroundColor: defaultTokens.backgroundInputDisabled,
  },
  inputContainerSuccess: {
    backgroundColor: defaultTokens.backgroundAlertSuccess,
    borderColor: defaultTokens.paletteGreenNormal,
    borderWidth: parseFloat(defaultTokens.borderWidthInput),
  },
  inputContainerWarning: {
    backgroundColor: defaultTokens.backgroundAlertCritical,
    borderColor: defaultTokens.borderColorInputError,
    borderWidth: parseFloat(defaultTokens.borderWidthInput),
  },
  inputField: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    web: {
      outline: 'none',
      color: defaultTokens.colorTextInput,
    },
    color: defaultTokens.colorTextAttention,
  },
  inputFieldDisabled: {
    color: defaultTokens.colorTextInputDisabled,
  },
  inputFieldSuccess: {
    color: defaultTokens.colorTextAlertSuccess,
  },
  inputFieldWarning: {
    color: defaultTokens.paletteRedNormalActive,
  },
  inputContainerBorderFocused: {
    web: {
      borderColor: defaultTokens.borderColorInputFocus,
      borderWidth: parseFloat(defaultTokens.borderWidthInputFocus),
    },
  },
  inputContainerBorderError: {
    borderColor: defaultTokens.borderColorInputError,
  },
  inlineLabel: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: parseFloat(defaultTokens.spaceSmall),
  },
  prefix: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: parseFloat(defaultTokens.spaceSmall),
  },
  suffix: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: parseFloat(defaultTokens.spaceSmall),
  },
  textInputPrefix: {
    color: defaultTokens.colorTextInputPrefix,
  },
  ...fontSizeGen(),
  ...heightGen(),
});

export default TextInput;
