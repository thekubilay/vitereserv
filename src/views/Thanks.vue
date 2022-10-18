<template>
  <div id="thanks" class="template__Wrapper outer">
    <div class="container inner">
      <h2 class="h2">ありがとうございました。</h2>
      <div>
        <section class="message__Wrapper">
          <h3 class="h3"><span>オンライン相談の申し込みが<br class="for-sp">完了しました。</span></h3>
          <p>ご予約の日時などをメール送信致しましたので<br class="for-sp">ご確認ください。</p>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGtm } from '@gtm-support/vue-gtm';
import { onMounted } from 'vue';
import {useRoute} from 'vue-router';
const gtm = useGtm();
const route = useRoute();
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