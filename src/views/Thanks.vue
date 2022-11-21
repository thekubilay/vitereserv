<template>
  <div id="thanks" class="template__Wrapper outer">
    <div class="container inner">
      <h2 class="h2">{{ t('thanksTitle') }}</h2>
      <div>
        <section class="message__Wrapper">
          <h3 class="h3"><span v-html="t('thanksBody1')"></span></h3>
          <p v-html="t('thanksBody2')"></p>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGtm } from '@gtm-support/vue-gtm';
import { onMounted } from 'vue';
import {useRoute} from 'vue-router';
import { vocabularies } from '../utils/useVocabularies'

const gtm = useGtm();
const route = useRoute();
const { t } = vocabularies();

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
})
</script>