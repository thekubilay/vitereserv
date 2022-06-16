<template>
  <footer class="footer-container">
    <div class="corporation-link text-center">
      <a :href="corporationLinkAddress" target="_blank">
      <img :src="imgSrc" :alt="imgAlt" :width="imgWidth" :height="imgHeight">
      </a>
    </div>
    <div class="copyright">
      <span class="word-keep">
        Copyright © TOKYU LAND CORPORATION All rights reserved.
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
export default defineComponent({
  setup(){
    const corporationLinkAddress = "https://www.tokyu-land.co.jp"
    const imgSrc = "/col.svg"
    const imgAlt = "東急不動産"
    const imgWidth = "180"
    const imgHeight = "31"

    return {
      corporationLinkAddress,
      imgSrc, imgAlt, imgWidth, imgHeight,
    }
  }
})
</script>
<style scoped>
footer{
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: "Noto Sans CJK JP", "Yu Gothic", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji";
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1;
  color: #333;
  flex-shrink: 0;
  /* -webkit-font-feature-settings: "pkna";
  font-feature-settings: "pkna"; */
}

footer .corporation-link {
  padding: 32px 16px;
}
footer .corporation-link a {
  color: #006d9e;
  transition: opacity .8s ease-out;
  -webkit-tap-highlight-color: rgba(238, 223, 227, 0.2);
  text-decoration: none;
}

footer .copyright {
  padding: 16px;
  background: #cbcbcb;
  font-family: acumin-pro-extra-condensed, sans-serif;
  font-size: 0.75rem;
  font-style: normal;
  text-align: center;
  letter-spacing: .1em;
}
</style>