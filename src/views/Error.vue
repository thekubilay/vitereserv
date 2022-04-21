<template>
  <div id="error" class="outer">
    <div class="container inner flex align-center justify-center">

        <section class="">
          <h1 class="error-header">お探しのページは<br class="for-sp">見つかりませんでした。</h1>
          <div class="error-number-c flex align-center justify-center">
            <span class="error-number">404</span>
          </div>
        </section>

    </div>
  </div>
</template>
<style scoped>
#error{
  height: 100%;
}
.container.inner {
  height: 100%;
}
.container section{
  padding: 40px 40px;
  background-color: white;
}
h1.error-header{
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
}
span.error-number{
  font-size: 20rem;
  font-weight: bold;
  max-width: 650px;
  color: #eaecee;
  background: white;
  display: inline-block;
}
</style>