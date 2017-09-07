/**
 * 用于进行原始配置的组件
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';

type PropsType = {
  children: React.Node,
  config: Object,
};
type StateType = {};

class Style extends React.Component<PropsType, StateType> {
  static defaultProps = {
    config: {},
  };

  getChildContext (): Object {
    return { config: this.props.config, };
  }

  render () {
    const { children, } = this.props;
    return <span>{children}</span>;
  }
}

Style.childContextTypes = {
  config: PropTypes.object,
};

export default Style;
