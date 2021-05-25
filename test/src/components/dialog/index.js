/*
* Author: LJH
* Date: 2019/9/11
* Description:
*/

import temp from './main.vue'
import Vue from 'vue'

const Constructor = Vue.extend(temp)
console.log(Constructor);
Constructor.prototype.doDestory =  function(){
  const vm = this
  setTimeout(()=>{
    if(vm.$el && vm.$el.parentNode){
      vm.$el.parentNode.removeChild(vm.$el)
    }
    vm.$destroy()
  }, 500)
}


const dialog = function (options) {
  let parent = document.body,
    instance = new Constructor({
      el: document.createElement('div'),
      propsData: options
    });

  parent.appendChild(instance.$el)
  instance.$nextTick(()=>{
    instance.show = true
  })

  const promise = new Promise((resolve, reject)=> {
    let close = instance.close
    let confirm = instance.confirm
    let cancel = instance.cancel
    instance.close = ()=>{
      close()
      reject('close');
      instance.doDestory()
    }
    instance.confirm = ()=>{
      confirm()
      resolve('confirm')
      instance.doDestory()
    }
    instance.cancel = ()=>{
      cancel()
      reject('cancel')
      instance.doDestory()
    }
  })
  promise.abort = instance.close;
  return promise;
}

dialog.alert = function(params) {
  const defaults = {
    showCancelButton: false,
    className: 'aqm-alert',
  };
  if (params.buttonText) {
    defaults.confirmButtonText = params.buttonText;
  }
  params.className = `${params.className || ''} ${defaults.className}`;
  const options = Object.assign({}, defaults, params)
  return dialog(options)
}

dialog.confirm = function (params) {
  const defaults = {
    className: 'aqm-confirm',
  };
  params.className = `${params.className || ''} ${defaults.className}`;
  const options = Object.assign({}, defaults, params);
  return dialog(options);
}


export default dialog
