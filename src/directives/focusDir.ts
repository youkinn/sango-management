/*
 * @Author: youkinn
 * @Date: 2020-08-09 17:47:03
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-10 00:44:34
 * @Description: v-focus
 */
export default {
  id: 'focus',
  definition: {
    inserted: function(el: HTMLElement) {
      el.focus();
    }
  }
};
