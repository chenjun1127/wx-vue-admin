import mitt from 'mitt';
export const emitter = mitt();
export const enum busEventEnum {
  menuShow = 'menuShow',
}
