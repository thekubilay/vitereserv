# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

&nbsp;  

# How to use Google Tag Manager with Vue 3（日本語版は↓）

First install the [Vue Google Tag Manager](https://www.npmjs.com/package/@gtm-support/vue-gtm) module from npm.

```npm
npm install @gtm-support/vue-gtm
```

## Setup in the Vue project

In the **main.ts** file add the following code.
First import the Vue Google Tag Manager module.

```js
import {createGtm} from '@gtm-support/vue-gtm'
```

and use it with the Vue-application. Google Tag Manager ID is requested from API dynamically (**main.ts**). The module is disabled at first to not send data twice when loading the application. It will be enabled dynamically in each component. (see next section)
```js
const service = new RequestService();
service.getRoom().then((response: any) => { // Axios request to API to get gtmid
  if(response && response.gtmid){ 
    app.use(createGtm({
      id: response.gtmid,　// The dynamic GTM ID 
      enabled: false, // Disabled at first
      vueRouter: router, // This will send the 'content view' event to the 
    }))
  }
  app.component('Dropdown', Dropdown)
  app.mount('#app')
}).catch(() => { 
  console.log("NT")
  app.component('Dropdown', Dropdown)
  app.mount('#app')
});
```
With this setting the 'content view' event will be send to the Google Tag Manager when the route of the application changes. 

## Add tracking to different Views(Pages)

To activate the module and start sending data to the Google Tag Manager, add the following code to all the Vue3 'View' pages that should be tracked. 
In **Viterve** this is added to the **Room.vue, Form.vue, Thanks.vue and Error.vue** files.
```js
import {useRoute} from "vue-router"
import {useGtm} from "@gtm-support/vue-gtm";
```
In the setup method add the following. (This checks if the gtm is active and enables the module if inactive.)
The module is disabled at first to not send data twice when loading the application.
```js
setup(){
  const route = useRoute();
  const gtm = useGtm();

  onMounted(() => {
    if(!gtm?.enabled()){
      gtm?.enable(true) //
    }else{
      gtm?.trackEvent({event: 'gtm.init_consent', 'content-view-name':route.name})
      gtm?.trackEvent({event: 'gtm.init'})
    }
  })
}
```
This sends two event to the Google Tag Manager system: the 'Consents' and the 'Initialization' event when the page is mounted. 
(Caution: The 'content view' event will also be send automatically when changing views)


## Additional

For more options see the official [site](https://www.npmjs.com/package/@gtm-support/vue-gtm).
<!-- The standard tracking code snippets does NOT need to be added to the **index.html** -->

&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  
&nbsp;  

# Google Tag ManagerをVue3で（日本語版）
# How to use Google tag manager with Vue 3（日本語版は↓）

First install the [Vue Google Tag Manager](https://www.npmjs.com/package/@gtm-support/vue-gtm) module from npm.

```npm
npm install @gtm-support/vue-gtm
```

## Setup in the Vue project

In the **main.ts** file add the following code.
First import the Vue Google Tag Manager module.

```js
import {createGtm} from '@gtm-support/vue-gtm'
```

and use it with the Vue-application. Google Tag Manager ID is requested from API dynamically (**main.ts**). The module is disabled at first to not send data twice when loading the application. It will be enabled dynamically in each component. (see next section)
```js
const service = new RequestService();
service.getRoom().then((response: any) => { // Axios request to API to get gtmid
  if(response && response.gtmid){ 
    app.use(createGtm({
      id: response.gtmid,　// The dynamic GTM ID 
      enabled: false, // Disabled at first
      vueRouter: router, // This will send the 'content view' event to the 
    }))
  }
  app.component('Dropdown', Dropdown)
  app.mount('#app')
}).catch(() => { 
  console.log("NT")
  app.component('Dropdown', Dropdown)
  app.mount('#app')
});
```
With this setting the 'content view' event will be send to the Google Tag Manager when the route of the application changes. 

## Add tracking to different Views(Pages)

To activate the module and start sending data to the Google Tag Manager, add the following code to all the Vue3 'View' pages that should be tracked. 
In **Viterve** this is added to the **Room.vue, Form.vue, Thanks.vue and Error.vue** files.
```js
import {useRoute} from "vue-router"
import {useGtm} from "@gtm-support/vue-gtm";
```
In the setup method add the following. (This checks if the gtm is active and enables the module if inactive.)
The module is disabled at first to not send data twice when loading the application.
```js
setup(){
  const route = useRoute();
  const gtm = useGtm();

  onMounted(() => {
    if(!gtm?.enabled()){
      gtm?.enable(true) //
    }else{
      gtm?.trackEvent({event: 'gtm.init_consent', 'content-view-name':route.name})
      gtm?.trackEvent({event: 'gtm.init'})
    }
  })
}
```
This sends two event to the Google Tag Manager system: the 'Consents' and the 'Initialization' event when the page is mounted. 
(Caution: The 'content view' event will also be send automatically when changing views)


## Additional

For more options see the official [site](https://www.npmjs.com/package/@gtm-support/vue-gtm).
<!-- The standard tracking code snippets does NOT need to be added to the **index.html** -->