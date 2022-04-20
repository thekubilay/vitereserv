<template>
  <transition name="fade">
    <div v-show="modelValue"
         class="loader"
         :class="{ fixed: fixed, absolute: !fixed, bg: background }"
         :style="getStyle()"
    >
      <div class="blur"></div>
      <div class="spinner-wrapper">
        <div class="spinner-icon"></div>
        <p v-if="text.length>0" class="spinner-text" :class="{transparentbg:transparent}">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import {watch, defineComponent} from "vue";

export default defineComponent({
  props: {
    modelValue: Boolean, //show
    text: {
      type: String, //% below spinner
      default: "",
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    background: {
      type: Boolean,
    }
  },
  setup(props) {
    const getStyle = () => {
      return "width: " + props.width + "; height: " + props.height + ";";
    };

    watch(() => props.modelValue, (val) => {
        if (!val) {
          document.onkeydown = function () {
            return true;
          };
        } else {
          document.onkeydown = function () {
            return false;
          };
        }
      }
    );

    return {
      getStyle,
    };
  },
});
</script>
<style scoped>
.loader {
  z-index: 7;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.loader.bg {
  background-color: white;
}

.loader.fixed {
  position: fixed;
}

.loader.absolute {
  position: absolute;
}

.blur {
  backdrop-filter: blur(1.4px);
  background-color: rgba(0, 0, 0, 0.01);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.spinner-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, 50%);
  z-index: 10;
  bottom: 50%;
  left: 50%;
}

.spinner-text {
  background-color: #e5e5e5;
  padding: 2px 6px;
  display: block;
  position: absolute;
  bottom: -100%;
  width: max-content;
}

.spinner-text.transparentbg {
  background-color: transparent;
}

.spinner-icon {
  /* width: 50px;
  height: 50px;
  border: 3px solid rgb(230,230,230);
  border-top: 3px solid #3742fa;
  animation: spin 0.8s linear infinite; */

  border: 2px solid rgb(230, 230, 230); /* Light grey */
  border-top: 2px solid rgba(0, 0, 0, 1); /* Black */
  /* border-top: 3px solid #3742fa; Blue */
  border-radius: 50%;
  width: 44px;
  height: 44px;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(0) rotate(0deg);
  }
  100% {
    transform: translate(0) rotate(359deg);
  }
}


.fade-enter-active {
  transition: opacity 0s ease;
}

.fade-leave-active {
  transition: opacity 1.0s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

