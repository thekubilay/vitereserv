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
const gtm = useGtm();
onMounted(() => {
  if(!gtm?.enabled()){
    gtm?.enable(true)
  }else{
    gtm?.trackEvent({event: 'gtm.init_consent'})
    gtm?.trackEvent({event: 'gtm.init'})
  }
})
</script>