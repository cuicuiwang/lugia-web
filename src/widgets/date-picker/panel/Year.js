/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Head from './Head';
import FacePanel from './FacePanel';
import { DateWrapper } from '../styled/styled';
type TypeProps = {
  step?: number,
  onChange: Function,
  from: string,
  theme?: Object,
  mode?: string,
  model: Object,
  year: number,
  themeProps?: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
type TypeState = {
  showYears: boolean,
  start: number,
  end: number,
  title: string,
  month: number,
  yearsRange: number[],
};
class Year extends Component<TypeProps, TypeState> {
  static displayName = 'Year';
  oldValue: number;
  constructor(props: TypeProps) {
    super(props);
    const { model } = props;
    model &&
      model.on('inputOnChange', (data: Object) => {
        const { year } = data;
        this.setState({ start: year });
      });
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { year } = nextProps;
    const start = preState ? preState.start : year;
    const showYears = preState && preState.showYears;
    const end = preState && preState.end;
    const title = preState && preState.title;
    return {
      start,
      end,
      showYears,
      title,
    };
  }
  arrorChange = (obj: Object) => {
    const { start, end, showYears, title, yearsRange } = obj;
    this.setState({
      yearsRange,
      showYears,
      start,
      end,
      title,
    });
  };
  headOnChange = (obj: Object) => {
    const { yearsRange, year, end, showYears, title } = obj;
    this.setState({ start: year, end, showYears, title, yearsRange });
  };
  panelChange = (obj: Object) => {
    const { showYears, start, text, event } = obj;
    const star = showYears === false ? start + 1 : start;
    let data = { showYears, start: star, title: text };
    this.oldValue = this.state.start;
    const year = star;
    if (showYears) {
      data = { start: star, title: text };
      this.getOnChange({ year, event });
    }
    this.setState(data);
  };
  getOnChange = (data: Object) => {
    const { onChange, from } = this.props;
    onChange && onChange({ ...data, from, mode: from });
  };
  render() {
    const { showYears, start, end, title, yearsRange } = this.state;
    const { step = 12, theme, themeProps } = this.props;
    return (
      <DateWrapper themeProps={themeProps} {...theme} mode={this.props.mode}>
        <div>
          <Head
            {...this.props}
            onChange={this.arrorChange}
            headOnChange={this.headOnChange}
            start={start}
            showYears={showYears}
            title={title}
            step={step}
            mode={'year'}
            themeProps={themeProps}
          />
          <FacePanel
            {...this.props}
            onChange={this.panelChange}
            start={start}
            end={end}
            showYears={showYears}
            step={step}
            title={title}
            mode={'year'}
            themeProps={themeProps}
            yearsRange={yearsRange}
          />
        </div>
      </DateWrapper>
    );
  }
}

export default Year;
