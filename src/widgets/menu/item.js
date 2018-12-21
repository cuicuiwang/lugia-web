/**
 * 菜单
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import { FontSize } from '../css';

import {
  ItemBackgroundColor,
  MenuItemHeight,
  SelectIcon,
  themeColor,
  blackColor,
  lightGreyColor,
  disableColor,
  getMenuItemHeight,
} from '../css/menu';
import CheckBox from '../checkbox';
import Theme from '../theme';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);

const Utils = require('@lugia/type-utils');
const { ObjectUtils } = Utils;
type sizeType = 'large' | 'default' | 'bigger';
type MenuItemProps = {
  checked: boolean,
  mutliple: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  children?: React.Node,
  disabled: boolean,
  checkbox: boolean,
  size: sizeType,
  checkedCSS: 'none' | 'background' | 'mark' | 'checkbox',
};

const getFontSize = (props: Object) => {
  const { size = 'default' } = props;
  return size === 'large' || size === 'bigger' ? em(14) : em(12);
};

const TextContainer = styled.span`
  padding: ${em(7)} ${em(8)};
  font-size: ${getFontSize};
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

const getMulipleCheckedStyle = (props: MenuItemProps) => {
  return props.checked
    ? `
    :after{
      color: ${themeColor};
    } 
    :hover:after{
      color: ${themeColor};
    }
    `
    : `
    :hover:after{
      color: #d0c8c8;
    }
    `;
};

const getItemColorAndBackground = (props: MenuItemProps) => {
  const { checked, disabled, checkedCSS } = props;
  return disabled
    ? `color: ${lightGreyColor};
     font-weight: 500;`
    : checked && checkedCSS !== 'background'
    ? `
    color: ${themeColor};
    font-weight: 900;
  `
    : checked && checkedCSS === 'background'
    ? `
      color: ${blackColor};
      font-weight: 900;
      background: ${disableColor}
    `
    : `
    color: ${blackColor};
    font-weight: 500;
  `;
};

const getIcon = props => {
  const { checkedCSS } = props;
  return `
    ${
      checkedCSS !== 'mark'
        ? ''
        : `
    &::after {
      font-family: "sviconfont" !important;
      text-rendering: optimizeLegibility;
      content: "${SelectIcon}";
      color: transparent;
      display: inline-block;
      font-size: ${FontSize};
      transform: scale(.83333333) rotate(0deg);
      zoom: 1;
      transition: all .2s ease;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: ${em(12)};
      font-weight: 700;
      text-shadow: 0 0.1px 0, 0.1px 0 0, 0 -0.1px 0, -0.1px 0;
    }
    `
    }
  `;
};

const getHeight = (props: Object) => {
  const { size } = props;
  const itemHeight = getMenuItemHeight(size);
  return `height: ${em(itemHeight)}`;
};

const SingleItem = styled.li`
  box-sizing: border-box;
  position: relative;
  display: block;
  ${getHeight};
  font-weight: 400;
  ${getItemColorAndBackground};
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background 0.3s ease;
  ${getIcon};
  ${getMulipleCheckedStyle};
  &:hover {
    background-color: ${ItemBackgroundColor};
    font-weight: 900;
  }
`;

const MutlipleItem = SingleItem.extend`
  ${getIcon};
  ${getMulipleCheckedStyle};
`;
MutlipleItem.displayName = 'mutlipleMenuItem';

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    checked: false,
    mutliple: false,
    disabled: false,
    checkbox: false,
  };
  static displayName = Widget.MenuItem;

  render() {
    const {
      children,
      mutliple,
      checked,
      onClick,
      disabled,
      onMouseEnter,
      checkedCSS,
      size,
    } = this.props;
    const Item = mutliple ? MutlipleItem : SingleItem;
    let title = '';
    React.Children.forEach(children, (item: Object) => {
      if (ObjectUtils.isString(item)) {
        title = item;
      }
    });
    const isCheckbox = checkedCSS === 'checkbox';
    const target = (
      <Item
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        title={title}
        checked={checked}
        disabled={disabled}
        checkedCSS={checkedCSS}
        size={size}
      >
        {isCheckbox ? (
          <Theme>
            <TextContainer>
              <CheckBox checked={checked} disabled={disabled} onChange={onClick}>
                {children}
              </CheckBox>
            </TextContainer>
          </Theme>
        ) : (
          <TextContainer size={size}>{children}</TextContainer>
        )}
      </Item>
    );

    return target;
  }
}

export default MenuItem;
