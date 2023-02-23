<template>
  <div id="thanks" class="template__Wrapper outer">
    <div class="container inner">
      <h2 class="h2">{{ thanksTitle }}</h2>
      <div>
        <section class="message__Wrapper">
          <h3 v-if="thanksBody1" class="h3"><span v-html="thanksBody1"></span></h3>
          <p v-html="thanksBody2"></p>
        </section>
      </div>
      <div v-if="['746935619','600799837','520803050', '532783550'].includes(route.params.rid as string)" class="flex">
        <a href="https://sumai.tokyu-land.co.jp/e-salon/global/en/" class="btn ghost-btn">Home</a>
      </div>
      <div v-if="['219272972', '604030817', '304155620', '830235141'].includes(route.params.rid as string)" class="flex">
        <a href="https://sumai.tokyu-land.co.jp/e-salon/global/ch/" class="btn ghost-btn">Home</a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGtm } from '@gtm-support/vue-gtm';
import { onMounted, ref } from 'vue';
import {useRoute} from 'vue-router';
import { vocabularies } from '../utils/useVocabularies'

const gtm = useGtm();
const route = useRoute();
const { t } = vocabularies();
const thanksTitle = ref("");
const thanksBody1 = ref("")
const thanksBody2 = ref("")

onMounted(() => {
  if(!gtm?.enabled()){
    gtm?.enable(true)
  }else{
    window.dataLayer?.push({
      google_tag_params: {
        dynx_pagetype: 'other',
        dynx_device: 'pc'
      }
    });
    gtm?.trackEvent({event: 'gtm.init_consent', 'content-view-name':route.name});
    gtm?.trackEvent({event: 'gtm.init'});
    gtm?.trackEvent({event: 'gtm.js'});
    gtm?.trackEvent({event: 'gtm.dom'});
    gtm?.trackEvent({event: 'gtm.load'});
  }
  thanksTitle.value = t('thanksTitle');
  thanksBody1.value = t('thanksBody1');
  thanksBody2.value = t('thanksBody2');
  // reserve en
  if(['532783550','600799837'].includes(route.params.rid as string)){
    thanksTitle.value = "Thank you for reserving a model room tour.";
    thanksBody2.value = "We will send a confirmation email to the email address you entered <br>so that you can confirm the details of your reservation.<br><br>We look forward to seeing you on your model room tour.<br>We wish you safe travels on the day of the tour.";
  }
  // online en
  if(['520803050','746935619'].includes(route.params.rid as string)){
    thanksTitle.value = "Thank you for reserving an online consultation.";
    thanksBody2.value = "We will send a confirmation email to the email address you entered <br>so that you can confirm the details of your reservation.<br><br>We look forward to seeing you online on the day of your consultation.";
  }
  // reserve chinese
  if(['219272972', '830235141'].includes(route.params.rid as string)){
    thanksTitle.value = "多謝您預約參觀示範單位。";
    thanksBody2.value = "我們會向您已輸入的電郵地址，發出確認預約內容的郵件。<br><br>期待您預約參觀示範單位。<br>希望您當日一路順風。";
  }
  // online chinese
  if(['604030817', '304155620'].includes(route.params.rid as string)){
    thanksTitle.value = "多謝您預約在線查詢。";
    thanksBody2.value = "為確認預約內容，我們已向您登記了的電郵地址發出確認郵件。<br><br>期待在線上與您見面。";
  }
})
</script>
<style>
#thanks .ghost-btn {
    padding: 8px 24px;
    margin: auto;
    background: transparent;
    color: #3372FF;
    font-size: 1.2rem;
    font-weight: 700;
    border: 1px solid;
    border-radius: 40px;
    text-decoration: none;
    text-align: center;
    transition: background .3s ease-out, color .3s ease-out;
}
#thanks .ghost-btn:hover {
    color: #fff;
    background-color: #3372FF;
    border-color: #3372FF;
}
@media screen and (min-width: 768px){
  #thanks .ghost-btn {
    font-size: 1.2rem;
  }
}

</style>