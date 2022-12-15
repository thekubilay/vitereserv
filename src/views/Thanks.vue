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
      <div v-if="route.params.rid!=='635834411'" class="flex">
        <a href="https://sumai.tokyu-land.co.jp/e-salon/global/en/" class="btn ghost-btn">Home</a>
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
    // window.dataLayer?.push({
    //   dynx_pagetype: 'other',
    //   dynx_device: 'pc'
    // });
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