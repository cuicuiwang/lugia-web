/**
 * Checkbox 颜色公共值
 * create by guorg
 * @flow
 */

import colorsFunc from '../css/stateColor';
import styled, { css } from 'styled-components';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';

import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import Icon from '../icon';
import { getBorder, getBorderRadius } from '../theme/CSSProvider';

const FontSize = 1.4;
const defaultColor = '#fff';
const em = px2remcss;
const {
  themeColor,
  mediumGreyColor,
  marginToDifferentElement,
  marginToPeerElementForY,
  blackColor,
  lightGreyColor,
  borderColor,
  disableColor,
  borderDisableColor,
  padding,
} = colorsFunc();

export type CSStype = {
  themes: ThemeType,
  hasChecked: boolean,
  hasCancel: boolean,
};
type ForGroupType = {
  onChangeForGroup: (event: Object, value: any) => any,
};
export type CheckBoxProps = {
  checked?: boolean,
  defaultChecked?: boolean,
  disabled?: boolean,
  indeterminate?: boolean,
  cancel?: boolean,
  getTheme: Function,
  onChange?: (event: Object, checked: boolean) => any,
  value?: string,
  children?: any,
  styles?: 'default' | 'vertical',
  handleCancelItemClick: Function,
  getPartOfThemeProps: Function,
  getPartOfThemeConfig: Function,
  themeProps: Object,
} & ForGroupType;
type CheckBoxType = CheckBoxProps & CSStype;

const getAfterTransform = (props: { checked: boolean, indeterminate: boolean }): string => {
  const { checked, indeterminate } = props;
  if (checked) {
    return `
      transform: translate(-50%, -50%) rotate(45deg) scale(1);
      transition: all .2s cubic-bezier(.71,-.46,.88,.6);
  `;
  }
  if (indeterminate) {
    return `
      transform: translate(-50%, -50%) scale(1);
      transition: all .2s cubic-bezier(.03,.86,.56,.87);
    `;
  }
  return `
    transform: translate(-50%, -50%) rotate(45deg) scale(0);
    transition: all .2s cubic-bezier(.71,-.46,.88,.6);
  `;
};
const getStyleCSS = (props: CheckBoxType): string => {
  const { styles = 'default', hasCancel } = props;
  if (hasCancel) {
    return `
      display: none;
    `;
  }
  if (styles === 'vertical') {
    return `
      display: block;
      margin-bottom: ${em(marginToPeerElementForY)};
    `;
  }
  return `
    display: inline-block;
    margin-right: ${em(marginToDifferentElement)};
  `;
};

export const CheckBoxWrap = CSSComponent({
  tag: 'label',
  className: 'CheckBoxWrap',
  css: css`
    font-size: ${FontSize}rem;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    box-sizing: border-box;
    padding: 0;
    list-style: none;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    ${getStyleCSS};
  `,
  normal: {
    defaultTheme: {
      opacity: 1,
    },
    selectNames: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
  },
  hover: {
    defaultTheme: {
      opacity: 1,
    },
    selectNames: [['opacity']],
  },
  disabled: {
    defaultTheme: {
      opacity: 1,
    },
    selectNames: [['opacity']],
  },
});

export const CheckBoxContent = StaticComponent({
  tag: 'span',
  className: 'CheckBoxContent',
  css: css`
    margin: 0;
    outline: none;
    line-height: 1;
    vertical-align: text-bottom;
    display: inline-block;
  `,
});

export const CheckBoxLabelSpan = CSSComponent({
  tag: 'span',
  className: 'CheckBoxLabelSpan',
  css: css`
    padding-left: ${em(10)};
  `,
  normal: {
    selectNames: [['color'], ['font']],
    defaultTheme: {
      color: blackColor,
      font: { size: 14 },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: padding,
      },
    },
  },
  hover: {
    selectNames: [['color'], ['font']],
    defaultTheme: {
      color: blackColor,
      font: { fontSize: 14 },
    },
  },
  disabled: {
    selectNames: [['color'], ['font']],
    defaultTheme: {
      color: lightGreyColor,
      font: { fontSize: 14 },
    },
  },
});

export const CheckBoxInput = StaticComponent({
  tag: 'input',
  className: 'CheckBoxInput',
  css: css`
    position: absolute;
    left: 0;
    z-index: 1;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,
});

export const CheckBoxInnerSpan = CSSComponent({
  tag: 'span',
  className: 'CheckBoxInnerSpan',
  css: css`
    position: relative;
    box-sizing: border-box;
    top: 0;
    left: 0;
    display: block;
    width: ${em(18)};
    height: ${em(18)};
    transition: all 0.3s;
  `,
  normal: {
    selectNames: [['background'], ['borderRadius'], ['border']],
    defaultTheme: {
      background: { color: defaultColor },
      border: getBorder({ color: borderColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(2),
    },
    getCSS(themeMeta: Object, themeConfig: Object): string {
      const { propsConfig, themeState } = themeConfig;
      const { hover } = themeState;
      const {
        checkboxInnerCheckedTheme,
        isCancel,
        isDisabled,
        isChecked,
        isIndeterminate,
        hasChecked,
      } = propsConfig;
      if (isCancel || isChecked || isIndeterminate) {
        const {
          normal: normalTheme,
          hover: hoverTheme,
          disabled: disabledTheme,
        } = checkboxInnerCheckedTheme;
        const defaultWidth = isChecked ? 6 : isIndeterminate ? 10 : 6;
        const defaultHeight = isChecked ? 10 : isIndeterminate ? 1 : 10;
        const colors = isDisabled
          ? disabledTheme.color
          : hover
          ? hoverTheme.color
          : normalTheme.color;

        return css`
          &::after {
            position: absolute;
            box-sizing: border-box;
            ${getAfterTransform({
              indeterminate: isIndeterminate,
              checked: isChecked || isCancel,
            })};
            left: 50%;
            top: 50%;
            width: ${em(defaultWidth)};
            height: ${em(defaultHeight)};
            display: table;
            border: ${em(2)} solid ${colors};
            border-top: 0;
            border-left: 0;
            content: ' ';
          }
        `;
      }

      if (hasChecked) {
        return `border: 1px solid ${themeColor};`;
      }

      return '';
    },
  },
  hover: {
    selectNames: [['background'], ['borderRadius'], ['border']],
    defaultTheme: {
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(2),
      background: { color: defaultColor },
    },
  },
  disabled: {
    selectNames: [['background'], ['borderRadius'], ['border']],
    defaultTheme: {
      border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(2),
      background: { color: disableColor },
    },
  },
});

export const HoverSpan = StaticComponent({
  tag: 'span',
  className: 'CheckboxHoverSpan',
  css: css`
    box-sizing: border-box;
    display: block;
    width: ${em(18)};
    height: ${em(18)};
  `,
});
export const IconWrap: Object = styled(Icon)`
  vertical-align: text-bottom !important;
  font-size: ${em(18)};
  color: ${mediumGreyColor};
`;
