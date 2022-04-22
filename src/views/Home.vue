<template>
  <div ref="main" class="home">
    <section class="hero">
            <p ref="bgLogo" class="bg-logo"><img src="/logo_mark.svg"></p>
            <header ref="mainNav" id="mainNav" class="main-nav">
                <nav class="container flex align-center">
                    <div class="logo flex">
                        <img src="/logo.svg" alt="">
                    </div>
                    <div class="menu flex align-center">
                        <ul class="items  flex align-center">
                            <!-- <li class="item">
                                <a href="" class="link">ホーム</a>
                            </li>
                            <li class="item">
                                <a href="#forte" class="link" id="navForte">リアクツールの特徴</a>
                            </li>
                            <li class="item">
                                <a href="#forte" class="link" id="navPanel">管理画面</a>
                            </li>
                            <li class="item">
                                <a href="#feature" class="link" onclick="toggleHumburger()">機能一覧</a>
                            </li> -->
                        </ul>
                        <ul class="actions flex align-center justify-end">
                            <!-- <li class="item">
                                <a href="" class="link">お問い合わせ</a>
                            </li> -->
                            <li class="item button-primary">
                                <a href="https://panel.viterve.com/" class="link">ログイン</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <!-- <div id="hamburger" class="hamburger">
                    <span class="wrapper">
                        <span class="line"></span>
                    </span>
                </div> -->
            </header>
            <div class="hero-content container">
                <div class="text">
                    <h1 class="h1 wow fadeInUp">商談に必要な<br>
                        <span ref="copy" id="copy" class="copy">
                            <span class="rotating-copy">セッティング</span>
                            <span class="rotating-copy">予約</span>
                            <span class="rotating-copy">メール</span>
                            <span class="rotating-copy">状況</span>
                            <span ref="underline" id="underline" class="underline"></span>
                        </span>
                        を<br class="for-sp">コントロール
                    </h1>
                    <div class="lead wow fadeInUp" data-wow-delay="0.6s">
                        <p class="lead-text">
                            予約状況をアプリケーションで<br class="for-sp">まとめて管理。<br>
                            顧客とのコミュニケーションをより円滑にし、<br>
                            営業活動を強力にバックアップします。
                        </p>
                    </div>
                    <div class="features wow fadeInUp" data-wow-delay="0.9s">
                        <p class="p1">アカウントをお持ちの方は</p>
                        <button class="button flex justify-center align-center">
                            <a href="https://panel.viterve.com/">ログインへ</a>
                        </button>
                    </div>
                </div>
                <div class="mockup">
                    <div class="pc">
                        <img src="/hero-pc.png" alt="">
                        <!-- <div class="movie">
                            <video muted=""  src="./movie/hero-pc.mp4" id="pc-video"></video>
                        </div> -->
                    </div>
                    <!-- <div class="tablet">
                        <img src="./img/home/hero_tablet.png" alt="">
                        <div class="movie">
                            <video  muted=""  src="./movie/hero-tablet.mp4" id="tablet-video"></video>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>


        <footer class="home-footer">
            <div class="container flex align-start">
                <div class="logo flex">
                    <img src="/logo.svg" alt="">
                </div>
                <ul class="menu-items  flex justify-space-between align-center">
                    <!-- <li class="item">
                        <a href="" class="link">ホーム</a>
                    </li>
                    <li class="item">
                        <a href="#forte" class="link">リアクツールの特徴</a>
                    </li>
                    <li class="item">
                        <a href="#forte" class="link">管理画面</a>
                    </li>
                    <li class="item">
                        <a href="#feature" class="link">機能一覧</a>
                    </li> -->
                </ul>
                <ul class="menu-items actions flex justify-end">
                    <!-- <li class="item">
                        <a href="" class="link">お問い合わせ</a>
                    </li> -->
                    <li class="item button-primary">
                        <a href="https://panel.viterve.com/" class="link">ログイン</a>
                    </li>
                </ul>
            </div>
        </footer>
        <p class="copyright">Copyright © reactive design Co., LTD. All rights reserved</p>

  </div>
</template>

<script lang="ts" setup>
  import {ref, onMounted } from "vue"
  // import { WOW } from "wowjs";

  const rotatingCopys = ref<HTMLElement[]|[]>([])
  const rotatingCopysLength = ref<number|null>(null)
  const underline = ref<HTMLElement|null>(null);
  const copy = ref<HTMLElement|null>(null);
  const bgLogo = ref<HTMLElement|null>(null)
  const rotatingIdx = ref<number>(0)
  const mainNav = ref<HTMLElement|null>(null)
  const main = ref<HTMLElement|null>(null)

  function resizeCopy(num:number):void {
      // const copyBCR = rotatingCopys[num].getBoundingClientRect();
      let copySize:any = null;
      if(rotatingCopys.value && rotatingCopys.value.length > 0){
        copySize = {width: rotatingCopys.value[num].clientWidth, height: rotatingCopys.value[num].clientHeight}
      }
      if(copy.value && copySize){
        copy.value.style.width = copySize.width ? String(copySize.width)+ "px" : "0px";
        copy.value.style.height = copySize.height ? String(copySize.height-5)+ "px" : "0px";
      }
      setTimeout(() => {
        if(underline.value && copySize){
          underline.value.style.width = copySize.width + "px"
        }
      },500)
  }
  function changeCopy():void {
    if(underline.value){
      underline.value.style.width = 0 + "px"
    }
    if(rotatingCopysLength.value){
      let num:number = rotatingIdx.value % rotatingCopysLength.value
      if (rotatingCopys.value[num].classList.contains('is-visible')) {
          rotatingCopys.value[num].classList.remove('is-visible')
      }
      rotatingCopys.value[num].classList.add('was-visible')
      num = (rotatingIdx.value + 1) % rotatingCopysLength.value
      if (rotatingCopys.value[num].classList.contains('was-visible')) {
          rotatingCopys.value[num].classList.remove('was-visible')
      }
      rotatingCopys.value[num].classList.add('is-visible')
      resizeCopy(num)
      rotatingIdx.value++
    }
  }
  function toggleHumburger():void {
    if(mainNav.value){
      mainNav.value.classList.toggle("open");
    }
  }


  onMounted(() => {
    // new WOW().init();
    const htmlTag = document.querySelector('html')
    if(htmlTag){
        htmlTag.style.fontSize = "1rem";
    }
    setInterval(() => {
        changeCopy()
    }, 3000);
      // setTimeout(() => {tabLine.style.opacity = "1"}, 300)
      // gsap.fromTo(bgLogo,
      //     {y:0},
      //     {
      //         y: 200,
      //         ease: 'none',
      //         scrollTrigger: {
      //             trigger: bgLogo,
      //             start: 'top top', 
      //             end: () => 'bottom top',
      //             scrub: 1,
      //             anticipatePin: 1,
      //             invalidateOnRefresh: true,
      //         },
      //     });
    rotatingCopys.value = Array.from(document.querySelectorAll('.rotating-copy'))
    if(rotatingCopys.value && rotatingCopys.value.length > 0){
        rotatingCopysLength.value = rotatingCopys.value.length
    }
    if(rotatingCopys.value && rotatingCopys.value.length>0){
        rotatingCopys.value[0].classList.add('is-visible')
    }
    resizeCopy(0);
    if(main.value){
        main.value.style.opacity = "1"
    }
  })
</script>

<style scoped>
@-webkit-keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(20px);
    -ms-transform: translateY(20px);
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes fade{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

@keyframes homeTextFadesIn{
	from{
		opacity:0;
        transform:translateY(50%)
	}
	to{
		opacity:1;
        transform:translateY(0)
	}
}
@keyframes homeTextFadesOut{
	from{
		opacity:1;
        transform:translateY(0)
	}
	to{
		opacity:0;
        transform:translateY(-50%)
	}
}



html { scroll-behavior: smooth;}
img {
    max-width: 100%;
    max-height: 100%;
}
video{
    width: 100%;
    height: auto;
}
ul {
    padding: 0;
    margin: 0;
}
.h2 {
    font-size: 2.4rem;
    font-weight: bold;
}
.h3 {
    font-size: 2.6rem;
    font-weight: bold;
}
.container {
    max-width: 1300px;
    width: 90%;
    margin: auto;
}

.home {
    display: block;
    width: 100%;
    font-family: 'Noto Sans JP',Poppins,-apple-system, BlinkMacSystemFont,Segoe UI, Roboto,Oxygen, Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    color: #333;
    overflow: hidden;
    opacity: 0;
    transition: opacity 1.5s;
    animation: fade 1.5s;
}
.home > .hero {
    position: relative;
    width: 100%;
	/* height: 100vh; */
    padding-bottom: 30px;
	background-color: rgb(213,213,238);
    background: linear-gradient(93deg, rgba(213,213,238,1) 0%, rgba(179,180,241,1) 90%);
}
/*.home > .hero > .bgText1 {
    position: absolute;
    font-size: 18rem;
    font-weight: bold;
    font-style: italic;
    line-height: 1;
    color: #fff;
    opacity: .3;
    top: 180px;
    right: 0;
}
.home > .hero > .bgText2 {
    position: absolute;
    font-size: 18rem;
    font-weight: bold;
    font-style: italic;
    line-height: 1;
    color: #fff;
    opacity: .3;
    bottom: -20px;
    left: 0;
}*/
.home > .hero > .bg-logo {
    position: absolute;
    right: -40%;
    bottom: 0;
    width: 90%;
    mix-blend-mode: multiply;
    opacity: 0.3;
    -webkit-filter:drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));
    -moz-filter:drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));
    -ms-filter:drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));
    filter:drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));
}
.home > .hero > .main-nav {
    position: relative;
    z-index: 999;
    width: 100%;
}
.home > .hero > .main-nav > .container {
    height: 4rem;
}
.home > .hero > .main-nav > .container > .logo {
    height: auto;
    width: 130px;
}
.home > .hero > .main-nav > .container > .menu {
    height: 100%;
    width: calc(100% - 120px);
    flex: 1;
}
.home > .hero > .main-nav > .container > .menu > .items {
    flex: 1;
    width: 70%;
    padding-left: 30px;
}
.home > .hero > .main-nav > .container > .menu  .item > .link {
    display: block;
    width: 100%;
    height: 100%;
    font-weight: 500;
    padding-left: 1rem;
    padding-right: 1rem;
    transition: all .3s;
}
.home > .hero > .main-nav > .container > .menu > .actions {
    width: 30%;
}
.home > .hero > .main-nav > .container > .menu > .actions > .item.button-primary {
    overflow: hidden;
}
.home > .hero > .main-nav > .container > .menu > .actions > .item.button-primary > .link {
    position: relative;
    z-index: 0;
    display: block;
    color: #fff;
    padding: 0.5rem 1.6rem;
    line-height: 1.25;
    border: 1px solid #333;
    box-sizing: border-box;
    overflow: hidden;
}
.home > .hero > .main-nav > .container > .menu > .actions > .item.button-primary > .link:hover {
    color: #333;
}
.home > .hero > .main-nav > .container > .menu > .actions > .item.button-primary > .link::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    transition: .3s;
}
.home > .hero > .main-nav > .container > .menu > .actions > .item.button-primary > .link:hover::before {
    width: 100%;
}
.home > .hero > .main-nav > .container > .menu > .actions > .item.button-primary > .link::after {
    content: "";
    position: absolute;
    z-index: -2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #333
}


.home > .hero > .main-nav > .hamburger{
    position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    right: 15px;
    width: 20px;
    height: 20px;
    margin: auto;
    cursor: pointer;
    display: none;
}
.home > .hero > .main-nav > .hamburger::after {
    content: "";
    width: 0;
    height: 0;
    background-color: rgb(255 229 181);
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    /* will-change: width, height; */
    transition: transform .25s ease, width .25s ease, height .25s ease;
}
.home > .hero > .main-nav.open > .hamburger::after {
    width: 100vmax;
    height: 100vmax;
    transform: scale(5);
    transition-duration: 1s;
}
.home > .hero > .main-nav > .hamburger > .wrapper {
    position: relative;
    z-index: 100;
    display: inline-block;
    width: 100%;
    height: 100%;
}
.home > .hero > .main-nav > .hamburger > .wrapper span,
.home > .hero > .main-nav > .hamburger > .wrapper span::before,
.home > .hero > .main-nav > .hamburger > .wrapper span::after {
    width: 20px;
    height: 2px;
    background-color: #333;
    border-radius: 0px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
}
.home > .hero > .main-nav > .hamburger > .wrapper span.line {
    top: 0;
    bottom: 0;
    margin: auto;
    transition-duration: 0.22s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.home > .hero > .main-nav > .hamburger > .wrapper span::before {
    content: "";
    display: block;
    top: -9px;
    transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
}
.home > .hero > .main-nav > .hamburger > .wrapper span::after {
    content: "";
    display: block;
    bottom: -9px;
    transition: bottom 0.1s 0.25s ease-in, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}


.home > .hero > .main-nav.open > .hamburger > .wrapper span:before{
    top: 0;
    opacity: 0;
    transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
}
.home > .hero > .main-nav.open > .hamburger > .wrapper span.line{
    transform: rotate(225deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
.home > .hero > .main-nav.open > .hamburger > .wrapper span:after{
        bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.1s ease-out, transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
}







.home > .hero > .hero-content {
    position: relative;
    padding-top: 5rem;
}
.home > .hero > .hero-content > .text {
    max-width: 50rem;
    overflow: hidden;
}
.home > .hero > .hero-content > .text > .h1 {
    font-size: 3.3rem;
    line-height: 4rem;
}
.home > .hero > .hero-content > .text > .h1 > .copy {
    position: relative;
    display: inline-block;
}
.home > .hero > .hero-content > .text > .h1 > .copy > .rotating-copy {
    position: absolute;
    bottom: -15%;
    left: 0;
    white-space: nowrap;
    z-index: 1;
    opacity: 0;
    transform: translateY(100%);
    animation-timing-function: cubic-bezier(.19,1,.22,1);
}
.home > .hero > .hero-content > .text > .h1 > .copy > .underline {
    position: absolute;
    height: 16%;
    left: 0;
    bottom: -13%;
    border-radius: 2px;
    background-color: #fdf660;
    transition: width .4s cubic-bezier(.19,1,.22,1);
    width: 0;
}

.home > .hero > .hero-content > .text > .h1 > .copy > .rotating-copy.was-visible {
    animation-name: homeTextFadesOut;
    animation-duration: .4s;
    animation-fill-mode: both;
}
.home > .hero > .hero-content > .text > .h1 > .copy > .rotating-copy.is-visible {
    animation-name: homeTextFadesIn;
    animation-delay: 250ms;
    animation-duration: .4s;
    animation-fill-mode: both;
}
.home > .hero > .hero-content > .text > .lead {
    margin-top: 30px;
    font-size: 1.2rem;
    line-height: 1.8;
}

.home > .hero > .hero-content > .text > .features {
    position: relative;
    width: 34vw;
    max-width: 28rem;
    margin-top: 30px;
}
.home > .hero > .hero-content > .text > .features > .p1 {
    font-size: 0.9rem;
    color: #5d5d5d;;
    margin-bottom: 10px;
}
.home > .hero > .hero-content > .text > .features > .button {
    position: absolute;
    right: 35px;
    top: 0;
    margin: 0 auto;
    /* width: 100px; */
    font-size: 18px;
    background-color: #333;
    transition: 0.3s;
}
.home > .hero > .hero-content > .text > .features > .button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 10px;
    height: 1px;
    background-color: #fff;
    transition: 0.3s;
}
.home > .hero > .hero-content > .text > .features > .button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -40px;
    transform: translateY(-50%);
    width: 40px;
    height: 1px;
    background-color: #333;
    transition: 0.3s;
}
.home > .hero > .hero-content > .text > .features > .button:hover::before {
    background-color: #333;
    z-index: 2;
}
.home > .hero > .hero-content > .text > .features > .button:hover::after {
    left: 0px;
    width: 0px;
}
.home > .hero > .hero-content > .text > .features > .button a {
    position: relative;
    z-index: 0;
    display: block;
    width: 100%;
    height: 100%;
    padding: 2px 10px 4px 30px;
    color: #fff;
    transition: 0.3s ease;
}
.home > .hero > .hero-content > .text > .features > .button a:hover {
    color: #333;
}
.home > .hero > .hero-content > .text > .features > .button > a::before {
    position: absolute;
    z-index: -1;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
    border: 1px solid #333;
    box-sizing: border-box;
    transition: 0.3s .1s ease;
}
.home > .hero > .hero-content > .text > .features > .button > a:hover::before {
    width: 100%;
}
.home > .hero > .hero-content > .text > .features > .button > a::after {
    position: absolute;
    z-index: -2;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background: #333;
    box-sizing: border-box;
}
/* .home > .hero > .hero-content > .text > .features > .grid  {
    display: grid;
    grid-auto-rows: 80px;
    grid-template-columns: repeat(6, 1fr);
    align-items: center;
}
.home > .hero > .hero-content > .text > .features > .grid > .icon {
    max-width: 42px;
    height: 42px;
} */

.home > .hero > .hero-content > .mockup {
    /* position: absolute;
    z-index: 100;
    right: 0;
    bottom: -370px;
    opacity: 0;
    animation: fadeInUp 0.6s 0.9s forwards; */
    position: relative;
    margin-left: 37%;
    margin-left: 37vw;
}
.home > .hero > .hero-content > .mockup > .pc {
    position:  relative;
    width: 55vw;
    max-width: 660px;
    margin-top: -22%;
}

.home > .hero > .hero-content > .mockup > .pc > .movie {
    position:  absolute;
    top: 3%;
    right: 0;
    left: 0;
    margin:  auto;
    width: 94%;
    height: auto;
}
.hero-content > .mockup > .tablet {
    position: absolute;
    left: -200px;
    bottom: -50px;
    width: 32vw;
    max-width: 430px;
}
.home > .hero > .hero-content > .mockup > .tablet > .movie {
    position:  absolute;
    top: 4%;
    right: 0;
    left: 0;
    margin:  auto;
    width: 73%;
    height: auto;
}



.home > .home-footer {
    position: relative;
    width: 100%;
    padding: 30px 0 30px;
    background-color: #F5F5F7;
}
.home > .home-footer > .container > .logo {
    padding-right: 60px;
    height: auto;
    width: 170px;
}
.home > .home-footer > .container > .menu-items {
    width: calc(50% - 95px);
}
.home > .home-footer > .container > .menu-items > .item {
    width: 25%;
    margin: 0 0 0px;
    text-align: center;
    overflow: hidden;
}
.home > .home-footer > .container > .menu-items > .item.button-primary {
    display: block;
    background-color: #000;
}
.home > .home-footer > .container > .menu-items > .item.button-primary > .link {
    position: relative;
    z-index: 0;
    display: block;
    line-height: 1.25;
    color: #fff;
    padding: 0.5rem 0.6rem;
}
.home > .home-footer > .container > .menu-items > .item.button-primary > .link:hover {
    color: #333;
}
.home > .home-footer > .container > .menu-items > .item.button-primary > .link::after {
    position: absolute;
    z-index: -1;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
    border: 1px solid #333;
    box-sizing: border-box;
    transition: all 0.3s ease;
}
.home > .home-footer > .container > .menu-items > .item.button-primary > .link:hover::after {
    width: 100%;
}
.home > .home-footer > .container > .menu-items > .item.button-primary > .link::before {
    position: absolute;
    z-index: -2;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #333;
}

.home > .copyright {
    position: relative;
    width: 100%;
    background-color: #fff;
    font-size: .9rem;
    padding: 20px 010px;
    text-align: center;
}

/* .loading {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background:#fff;
    color:#000;
    overflow: hidden;
}
.loading > .img {
    position: absolute;
    width: 80px;
    height: 80px;
} */
/* .loading > .img2 {
    position: absolute;
    width: 1px;
    height: 1px;
    transition: all 1.5s ;
} */
.for-pc{display: block;}
.for-sp{display: none;}


@media (max-width: 1080px) {
    .home > .hero > .hero-content > .text > .features > .button::after {
        display: none;
    }
}

@media (max-width: 992px) {
    .for-pc{display: none;}
    .for-sp{display: block;}
    .h2 {
        font-size: 1.6rem;
    }
    .h3 {
        font-size: 1.4rem;
    }

    .home > .hero > .bg-logo {
        right: -70%;
        width: 160%;
    }

    .home > .hero > .bgText1 {
        font-size: 12rem;
        top: 230px;
    }
    .home > .hero > .bgText2 {
        display: none;
    }
    .home > .hero > .main-nav {
        position: fixed;
        background-color: #fff;
    }
    .home > .hero > .main-nav > .container > .menu {
        opacity: 0;
    }
    .home > .hero > .main-nav > .hamburger {
        display: block;
    }

    .home > .hero > .main-nav.open > .container > .menu {
        z-index: 110;
        display: block;
        opacity: 1;
        animation: fade 1s linear 0s;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
    }
    .home > .hero > .main-nav.open > .container > .menu > .items {
        display: block;
        width: 100%;
        padding-left: 0;
    }
    .home > .hero > .main-nav > .container > .menu .item > .link {
        padding: 1rem;
    }
    .home > .hero > .main-nav.open > .container > .menu > .actions {
        display: block;
        width: 100%;
    }
    .home > .hero > .main-nav.open > .container > .menu > .actions > .item.button-primary > .link {
        padding: 1rem;
    }

    .home > .hero > .hero-content > .text > .h1 {
        font-size: 2rem;
        line-height: 2.8rem;
    }
    .home > .hero > .hero-content > .text > .h1 > .copy > .rotating-copy {
        bottom: -16%;
    }
    .home > .hero > .hero-content > .text > .lead {
        margin-top: 15px;
        font-size: 1rem;
    }
    .home > .hero > .hero-content > .text > .features {
        display: none;
    }
    .home > .hero > .hero-content > .mockup {
        width: 100%;
        bottom: -280px;
        bottom: 0;
        margin: 5% auto ;
    }
    .home > .hero > .hero-content > .mockup > .pc {
        width: 80%;
        margin: 5% auto;
    }
    .hero-content > .mockup > .tablet {
        left: -5%;
        bottom: -40px;
        width: 57%;
    }
    .home > .forte {
        padding-top: 180px;
        padding-top: 42vw;
        padding-bottom: 80px;
    }
    .home > .forte > .h2 {
        margin-bottom: 30px;
    }
    .home > .forte > .tabs-wrapper {
        margin-bottom: 30px;
    }
    .home > .forte > .forte-items > .forte-item {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        flex-direction: initial;
    }
    .home > .forte > .forte-items > .forte-item.block {
        display: flex;
    }
    .home > .forte > .forte-items > .forte-item > .text {
        width: 50%;
    }
    .home > .forte > .forte-items > .forte-item > p {
        display: block;
        width: 40%;
        padding: 3% 5%;
    }
    .home > .forte > .forte-items > .forte-item > .text > .h3 {
        text-align: left;
        margin: 0 auto 10px;
    }
    .home > .forte > .forte-items > .forte-item .pic {
        position: relative;
        margin-top: 20px;
        height: auto;
        width: 100%;
    }
    .home > .forte > .forte-items > .forte-item > .text > .p1 {
        font-size: 0.8rem;
        text-align: left;
    }
    .home > .banner-yellow > .container {
        display: block;
    }
    .home > .banner-yellow > .container > .pic {
        padding-top: 50px;
        width: 100%;
    }
    .home > .banner-yellow > .container > .text {
        margin-left: 0;
        padding-top: 10px;
        width: 100%;
    }
    .home > .banner-yellow > .container > .text > .p2 {
        line-height: 1.5;
        margin-top: 10px;
        font-size: .9rem;
        padding-bottom: 50px;
    }
    .home > .features {
        padding: 60px 0;
    }
    .home > .features > .title {
        display: block;
    }
    .home > .features > .title > .pic {
        width: 70%;
        margin: 10px 0 0 30%;
    }
    .home > .features > .feature-items > .grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(6, 1fr);
        row-gap: 10px;
        column-gap: 10px;
    }
    .home > .features > .feature-items > .grid > .feature-item {
        padding: 20px 0;
    }
    .home > .features > .feature-items > .grid > .feature-item > .icon {
        min-width: 40px;
        height: 40px;
        margin-bottom: 10px;
    }
    .home > .home-footer > .container {
        display: block;
    }
    .home > .home-footer > .container > .menu-items {
        width: 100%;
        flex-wrap: wrap;
    }
    .home > .home-footer > .container > .menu-items > .item {
        width: 50%;
        margin: 10px auto 10px 0;
        text-align: left;
    }
    .home > .home-footer > .container > .menu-items > .item.button-primary {
        width: 100%;
        text-align: center;
    }
    .home > .copyright {
        font-size: 0.7rem;
        padding: 20px 0px;
    }



    /*temporary css*/
    .home > .hero > .main-nav > .container > .menu {
        opacity: 1;
    }
    .home > .hero > .main-nav > .container > .menu > .actions {
        width: 100%;
    }

}
</style>