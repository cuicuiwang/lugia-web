/*
 * by wangcuixia
 * @flow
 * */
import EventEmitter from '../common/EventEmitter';
type SwitchPanelModeEventType = 'inputOnChange' | 'inputOnFocus';
export default class SwitchPanelMode extends EventEmitter<SwitchPanelModeEventType> {
  onChange(params: Object) {
    this.emit('inputOnChange', params);
  }
  onFocus(params: Object) {
    this.emit('inputOnFocus', params);
  }
}
