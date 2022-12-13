<template>
  <footer id="app_footer" class="footer-container flex align-center justify-center">
    <div class="inner-footer flex-column justify-center">
      <!-- <section class="notes">
        <ul>
          <li>Lorem</li>
          <li>ipsum</li>
          <li>amet</li>
        </ul>
      </section> -->
      <!-- <section class="link-nav"></section> -->
      <section class="corporation-link text-center">
        <a :href="corporationLinkAddress" target="_blank" class="corporation-logo">
          <img :src="imgSrc" :alt="imgAlt" :width="imgWidth" :height="imgHeight">
        </a>
        <p class="corporation-name">{{ t('footerCompanyName') }}</p>
      </section>
      <section class="legal">
        <div class="copyright">
          <span class="word-keep">
            Copyright © TOKYU LAND CORPORATION All rights reserved.
          </span>
        </div> 
        <div class="legal-links">
          <a class="privacy-policy" href="https://www.tokyu-land.co.jp/about/privacy.html" target="_blank">{{ t('footerPrivacyPolicy') }}</a>
          <a class="terms-of-use" href="https://sumai.tokyu-land.co.jp/info/first.html" target="_blank">{{ t('footerBasicPolicy') }}</a>
        </div>
      </section>
    </div>
    <!-- <div class="corporation-link text-center">
      <a :href="corporationLinkAddress" target="_blank">
      <img :src="imgSrc" :alt="imgAlt" :width="imgWidth" :height="imgHeight">
      </a>
    </div> -->
    <!-- <div class="copyright">
      <span class="word-keep">
        Copyright © TOKYU LAND CORPORATION All rights reserved.
      </span>
    </div> -->
  </footer>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import logoImg from "/col.svg"
import { vocabularies } from '../utils/useVocabularies'

export default defineComponent({
  setup(){
    const { t } = vocabularies();
    const corporationLinkAddress = "https://www.tokyu-land.co.jp"
    const imgSrc = logoImg
    const imgAlt = "東急不動産"
    const imgWidth = "180"
    const imgHeight = "31"

    return {
      corporationLinkAddress,
      imgSrc, imgAlt, imgWidth, imgHeight,
      t,
    }
  }
})
</script>
<style scoped>
footer{
  display: flex;
  margin: auto 0 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: "Noto Sans CJK JP", "Yu Gothic", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji";
  font-size: 1.0rem;
  font-weight: 500;
  line-height: 1;
  color: #6E6E73;
  background-color: #f5f5f7;
  flex-shrink: 0;
  /* -webkit-font-feature-settings: "pkna";
  font-feature-settings: "pkna"; */
}
footer .inner-footer {
  max-width: 980px;
  width: 100%;
  margin: 0 auto;
  padding: 0 22px;
}

/* @media screen and (min-width: 415){

} */

footer .inner-footer section {
  padding: 17px 0 11px;
  width: 100%;
}
footer .inner-footer section.legal {
  padding-top: 7px;
  padding-bottom: 21px;
}
footer .inner-footer section:not(:first-of-type){
  border-top: solid 1px #d2d2d7;
}

footer .inner-footer section.legal .copyright {
  display: inline-block;
  margin-right: 30px;
  margin-top: 5px;
  font-size: 0.8rem;
  /* color: #6E6E73; */
}

footer .inner-footer section.legal .copyright span.word-keep{
  line-height: 1;
}

footer .legal-links{
  display: inline-block;
}

@media screen and (max-width: 415px){
  footer .inner-footer section.legal .legal-links {
    display: block;
    margin-top: 5px;
  }
  footer .inner-footer section.legal .copyright {
    display: block;
  }
}

footer .legal-links a {
  border-right: 1px solid #d2d2d7;
  color: #424245;
  font-size: 0.70rem;
  margin-right: 7px;
  padding-right: 10px;
  display: inline-block;
  margin-top: 5px;
  white-space: nowrap;
  position: relative;
  bottom: 1px;
}
footer .legal-links a:last-child {
  border: none;
  margin: 0;
  padding: 0;
}

footer section.notes ul {
  list-style: none;
  margin: 0;
}

footer section.notes ul li {
  font-size: 0.75rem;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -.01em;
  padding-bottom: 0.8rem;
}

footer section.corporation-link {
  padding: 22px 0px;
}
footer section.corporation-link a {
  display: block;
  padding: 10px;
  color: #006d9e;
  transition: opacity .8s ease-out;
  -webkit-tap-highlight-color: rgba(238, 223, 227, 0.2);
  text-decoration: none;
}

footer section.corporation-link .corporation-name {
  line-height: 1;
  font-size: 1.8rem;
  font-weight: 500;
  padding: 10px;
}

html[theme="light"] footer section.corporation-link .corporation-name{
  display: none;
}

</style>