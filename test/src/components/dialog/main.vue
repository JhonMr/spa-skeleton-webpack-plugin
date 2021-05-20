/*
* Author: LJH
* Date: 2019/9/11
* Description:
* props:
* query:
* params:
*/
<template>
  <transition name="dialog" :duration="500">
    <div v-show="show" :class="className" class="dialog">
      <div class="mask"></div>
      <div class="dialog-contain">
        <span
          class="close"
          v-if="showClose"
          @click="close"
        >×</span>
        <header v-if="title">
          <slot name="title">
            <div v-html="title"></div>
          </slot>
        </header>
        <main>
          <div>
            <slot name="default">
              <div v-html="content"></div>
            </slot>
          </div>

        </main>
        <footer>
          <button
            class="cancel-btn"
            v-html="cancelButtonText"
            v-if="showCancelButton"
            @click="cancel"
          ></button>
          <button
            class="confirm-btn"
            v-html="confirmButtonText"
            v-if="showConfirmButton"
            @click="confirm"
          ></button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import {on, off} from '@/utils/DOM'
  export default {
    name: "AqmDialog",
    componentName: "AqmDialog",
    props: {
      value: {
        type: Boolean,
        default: undefined,
      },
      actionDom: {
        type: String,
      },
      activeByDom: {
        type: Boolean,
        required: false,
        default: true,
      },
      appendTo: {
        default: 'body',
      },
      showClose: {
        default: true,
      },
      showCancelButton: {
        default: true,
      },
      showConfirmButton: {
        default: true,
      },
      cancelButtonText: {
        default: '取消'
      },
      confirmButtonText: {
        default: '确定'
      },
      title: {
        default: '提示'
      },
      content: {
        default: '',
      },
      className: {
        default: '',
      }
    },
    components: {},
    data() {
      return {
        show: false,
      }
    },
    computed: {
      currentValue: {
        get() {
          return this.value;
        },
        set(val) {
          if (this.value !== undefined)
            this.$emit('input', val);
        },
      },
    },
    mounted() {
      if (this.activeByDom)
        on(this.actionDomCompute(), 'click', this.domActiveHandle);
    },
    beforeDestroy() {
      if (this.activeByDom)
        off(this.actionDomCompute(), 'click', this.domActiveHandle);
      if (this.$el.parentNode) this.$el.parentNode.removeChild(this.$el);
    },
    methods: {
      close() {
        this.show = false
        this.currentValue = false;
      },
      cancel() {
        this.show = false
        this.currentValue = false;
      },
      confirm() {
        this.show = false
        this.currentValue = false;
      },
      actionDomCompute() {
        let dom = this.actionDom;
        if (typeof this.actionDom === 'string') dom = document.querySelector(this.actionDom);
        return dom;
      },
      domActiveHandle() {
        if (this.activeByDom) this.show = !this.show;
      },
    },
    watch: {
      value(n) {
        if (n) {
          document.querySelector(this.appendTo).appendChild(this.$el);
        }
      },
      show(n) {
        if (n) {
          document.querySelector(this.appendTo).appendChild(this.$el);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/base';
  $mainPadding: 20px;
  .dialog {
    position: fixed;
    width: 100%;
    height:100%;
    top: 0;
    left: 0;
    &-contain {
      width: calc(100% - #{$mainPadding*2});
      padding: $mainPadding;
      margin: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
  .mask {
    width: 100%;
    height:100%;
    background: rgba(0,0,0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
  .close {
    position:absolute;
    top: $mainPadding;
    right: $mainPadding;
    line-height: 0.5;
    color: #ccc;
    font-size: 24px;
  }
  header {
    font-size: 18px;
    padding-bottom: $mainPadding;
  }
  main {
    font-size: 16px;
    padding-bottom: $mainPadding;
    text-align: center;
    & > div {
      display: inline-block;
      text-align: left;
    }
  }
  footer {
    display: flex;
    font-size: 0;
    button {
      flex: 1 1 50%;
      width:calc(50% - #{$mainPadding/2});
      font-size: 14px;
      text-align: center;
      padding: 5px 10px;
      border-radius: 3px;
      vertical-align: middle;
    }
    button + button {
      margin-left: $mainPadding;
    }
    .cancel-btn {
      color: $primaryColor;
    }
    .confirm-btn {
      color: #fff;
      background: $primaryColor;
      border: 0;
    }
  }

  .dialog-enter-active .dialog-contain {
    transition: opacity 0.5s;
  }
  .dialog-leave-active .dialog-contain {
    transition: opacity 0.5s;
  }
  .dialog-enter-active .mask,
  .dialog-leave-active .mask {
    transition: opacity 0.5s;
  }

  .dialog-enter .dialog-contain,
  .dialog-leave-to .dialog-contain {
    opacity: 0;
  }
  .dialog-enter .mask,
  .dialog-leave-to .mask {
    opacity: 0;
  }
</style>
