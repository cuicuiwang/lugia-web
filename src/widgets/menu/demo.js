/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Menu from './index';
import Widget from '../consts/index';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import styled from 'styled-components';
const { MenuItem } = Menu;
const Placeholder = Menu.Placeholder;
const computeCanSeeCount = Menu.computeCanSeeCount;

const Button = styled.div`
  width: 200px;
  height: 40px;
  background: cornflowerblue;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  margin: 10px;
`;

const H2 = styled.h2`
  margin: 10px;
  color: orangered;
`;

const MenuWrap = styled.div`
  margin: 10px;
`;

const Box = styled.div`
  display: inline-block;
  margin: 10px 30px;
`;

const data = [
  { value: '皮卡丘', text: '皮卡丘', disabled: true },
  { value: '妙蛙种子', text: '妙蛙种子', disabled: true },
  { value: '小火龙', text: '小火龙' },
  { value: '杰尼龟', text: '杰尼龟' },
  { value: '绿毛虫', text: '绿毛虫' },
  { value: '独角虫', text: '独角虫' },
  { value: '波波', text: '波波' },
  { value: '小拉达', text: '小拉达' },
  { value: '阿伯怪', text: '阿伯怪' },
  { value: '穿山鼠', text: '穿山鼠' },
  { value: '尼多兰', text: '尼多兰' },
  { value: '皮皮', text: '皮皮' },
];

const items = [];
for (let i = 0; i < 20; i++) {
  items.push({ text: i, value: i, disabled: false });
}
const hasChildrenData = [
  {
    text: '一级菜单1',
    value: '一级菜单1',
    disabled: false,
  },
  { text: '一级菜单2', value: '一级菜单2', disabled: false },
  { text: '一级菜单3', value: '一级菜单3', disabled: false },
  {
    text: '一级菜单4',
    value: '一级菜单4',
    disabled: false,
    children: [
      {
        text: '次级菜单4-1',
        value: '次级菜单4-1',
        children: [{ text: '三级菜单4-1-1', value: '三级菜单4-1-1' }],
      },
    ],
  },
  { text: '一级菜单5', value: '一级菜单5', disabled: true },
  {
    text: '一级菜单6',
    value: '一级菜单6',
    disabled: false,
    children: [
      { text: '次级菜单6-1', value: '次级菜单6-1' },
      {
        text: '次级菜单6-2',
        value: '次级菜单6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: '三级菜单6-2-1',
            children: [
              { text: 'sub1', value: 'sub1', children: [{ text: 'sub2', value: 'sub2' }] },
            ],
          },
          { text: '三级菜单6-2-2', value: '三级菜单6-2-2' },
          { text: '三级菜单6-2-3', value: '三级菜单6-2-3' },
        ],
      },
      { text: '次级菜单6-3', value: '次级菜单6-3' },
      { text: '次级菜单6-4', value: '次级菜单6-4' },
      { text: '次级菜单6-5', value: '次级菜单6-5' },
      { text: '次级菜单6-6', value: '次级菜单6-6' },
      { text: '次级菜单6-7', value: '次级菜单6-7' },
      { text: '次级菜单6-8', value: '次级菜单6-8' },
      { text: '次级菜单6-9', value: '次级菜单6-9' },
      { text: '次级菜单6-10', value: '次级菜单6-10' },
    ],
  },
  { text: '一级菜单7', value: '一级菜单7', disabled: true },
  { text: '一级菜单8', value: '一级菜单8', disabled: false },
  { text: '一级菜单9', value: '一级菜单9', disabled: true },
  { text: '一级菜单10', value: '一级菜单10', disabled: false },
];

const theme = {
  [Widget.Menu]: {
    MenuItem: {
      MenuItemWrap: { normal: { height: 50 } },
    },
  },
};

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // items,
      // selectedKeys: ['一级菜单6/次级菜单6-2/三级菜单a/sub1'],
      // expandedPath: ['一级菜单6/次级菜单6-2/三级菜单a/sub1'],
      selectedKeys: [],
      expandedPath: [],
      scrollerValue: 0,
      start: 0,
    };
  }

  render() {
    const { selectedKeys, expandedPath } = this.state;

    const theme = {
      [Widget.Menu]: {
        MenuWrap: {
          normal: {
            width: 300,
            height: 400,
            // opacity: 0.7,
            background: {
              color: '#ccc',
            },
            padding: {
              left: 10,
              top: 30,
              //   right: 30,
            },
            margin: {
              left: 20,
              top: 20,
            },
            border: getBorder({ color: '#ff3366', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
            boxShadow: getBoxShadow('2px 2px 2px 4px #ff3366'),
          },
          hover: {
            background: {
              color: '#ff66cc',
            },
            // opacity: 1,
            border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
            boxShadow: getBoxShadow('2px 2px 2px 4px #ff66cc'),
          },
        },
        MenuItem: {
          MenuItemWrap: {
            normal: {
              height: 60,
              background: { color: '#ff99cc' },
              color: '#cc00cc',
              // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
              padding: {
                left: 60,
                top: 0,
              },
              font: {
                size: 16,
              },
            },
            hover: {
              color: '#fff',
              background: {
                color: '#660066',
              },
              opacity: 0.9,
              font: {
                fontWeight: 900,
              },
              // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
            },

            active: {
              color: '#4d63ff',
              background: {
                color: 'ff0099',
              },
              opacity: 0.9,
              font: {
                fontWeight: 900,
              },
              // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(60),
            },

            disabled: {
              background: { color: '#ff99cc' },
              color: 'red',
              borderRadius: getBorderRadius(60),
              opacity: 0.7,
              padding: {
                left: 30,
                top: 0,
              },
              font: {
                size: 26,
              },
            },
          },

          SelectedMenuItemWrap: {
            normal: {
              height: 80,
              background: { color: '#cc00ff' },
              color: '#fff',
              // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(80),
              padding: {
                left: 30,
              },
              font: {
                size: 20,
              },
            },
            hover: {
              color: '#4d63ff',
              background: {
                color: '#ffffcc',
              },
              opacity: 1,
              font: {
                fontWeight: 900,
              },
              // border: getBorder({ color: '#336699', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(60),
            },

            active: {
              color: '#cc0000',
              background: {
                color: 'ff9900',
              },
              opacity: 1,
              font: {
                fontWeight: 900,
              },
              // border: getBorder({ color: '#000033', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(0),
            },
          },

          Divider: {
            normal: { background: { color: 'red' } },
          },

          Checkbox: {
            CheckboxText: {
              normal: {
                color: 'red',
                font: { fontSize: 22, fontWeight: 500 },
              },
              hover: { color: 'green', font: { fontSize: 16, fontWeight: 500 } },
              disabled: { color: 'yellow', font: { fontSize: 16, fontWeight: 500 } },
            },
          },
        },

        SubMenu: {
          MenuWrap: {
            normal: {
              width: 100,
              background: {
                color: '#660033',
              },
            },
          },

          MenuItem: {
            MenuItemWrap: {
              normal: {
                color: '#fff',
              },
            },
          },

          SubMenu: {
            MenuWrap: {
              normal: {
                width: 200,
                background: {
                  color: '#777777',
                },
              },
            },
          },
        },
      },
    };

    return (
      <div>
        <Box>
          <Menu
            theme={theme}
            autoHeight
            checkedCSS={'checkbox'}
            divided
            mutliple={true}
            data={data}
          />
        </Box>

        <Box>
          <Menu divided theme={theme} mutliple data={data} />
        </Box>

        <MenuWrap>
          <H2>级联嵌套菜单 </H2>
          <Box>
            <Menu
              theme={theme}
              separator={'/'}
              mutliple={false}
              // popupVisible={false}
              // action={'click'}
              action={'hover'}
              expandedPath={expandedPath}
              selectedKeys={selectedKeys}
              handleIsInMenu={this.handleIsInMenu}
              data={hasChildrenData}
              offsetY={0}
              onExpandPathChange={this.onExpandPathChange}
              onClick={this.onClick}
              autoHeight
            />
          </Box>
          <Button onClick={this.btnClick}>hello</Button>
        </MenuWrap>
      </div>
    );
  }

  clickDefaultMenu = (e, keys, item) => {
    const { selectedKeys } = keys;
  };

  btnClick = (e, keys, item) => {
    this.setState({
      selectedKeys: ['一级菜单6/次级菜单6-2/三级菜单6-2-1/sub1'],
      expandedPath: ['一级菜单6/次级菜单6-2/三级菜单6-2-1/sub1'],
    });
  };

  onClick = (e, keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeys, expandedPath: selectedKeys });
  };

  onExpandPathChange = expandedPath => {
    this.setState({ expandedPath });
  };

  onScroller = (start, end) => {
    // this.setState({ start });
  };
}
