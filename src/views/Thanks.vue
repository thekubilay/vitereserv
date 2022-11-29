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
      dynx_pagetype: 'other',
      dynx_device: 'pc'
    });
    gtm?.trackEvent({event: 'gtm.init_consent', 'content-view-name':route.name})
    gtm?.trackEvent({event: 'gtm.init'})
  }
  console.log(t('locale'))
  if(t('locale')==="ja"){
    thanksTitle.value = t('thanksTitle');
    thanksBody1.value = t('thanksBody1');
    thanksBody2.value = t('thanksBody2');
  }else{
    // reserve en
    if(route.params.rid === '600799837'){
      thanksTitle.value = "Thank you for reserving a model room tour.";
      thanksBody2.value = "We will send a confirmation email to the email address you entered <br>so that you can confirm the details of your reservation.<br><br>We look forward to seeing you on your model room tour.<br>We wish you safe travels on the day of the tour.";
    }
    // online en
    if(route.params.rid === '746935619'){
      thanksTitle.value = "Thank you for reserving an online consultation.";
      thanksBody2.value = "We will send a confirmation email to the email address you entered <br>so that you can confirm the details of your reservation.<br><br>We look forward to seeing you online on the day of your consultation.";
    }
  }
})
</script>