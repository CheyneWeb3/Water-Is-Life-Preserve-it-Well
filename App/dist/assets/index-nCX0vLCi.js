import{i as m,r as S,e as _,a as f,b as c,D as l,E as C,O as b,aQ as ge,z as p,t as v,M as $,a2 as k,a7 as Ge,p as x,a6 as y,R as g,a5 as D,S as B,W as O,q as Q,aU as Vt,C as dt,a0 as Et,au as Mt,a3 as Ft,aN as Kt,cU as pt,aR as Ht,cV as Gt,aP as ht}from"./index-Cj55t8Xw.js";import{n as u,c as w,o as h,U as L,r as d,a as wt}from"./if-defined-Czu2zLbO.js";import"./index-D8V4uwVV.js";import"./index-Csq9Fpj-.js";import"./index-DF8-QWqn.js";import"./index-D8q-3dHv.js";import{W as jo}from"./index-BVKOWc34.js";import"./index-BdpClSSZ.js";import"./index-BD6m87Nn.js";import"./index-CxBe4V_a.js";import{W as qt}from"./basic-BIFgIvyc.js";import{a as Bo,b as Lo,c as zo,d as Vo}from"./basic-BIFgIvyc.js";import"./index-CU9X0iEU.js";import"./index-CVSkrPSy.js";import"./index-Cd_LGVcV.js";import"./index-CUVw89Q_.js";import{M as ft}from"./index-DOzF2bh_.js";import"./index-CSVVgQHv.js";import"./index-BJ4p_90e.js";import{e as Yt,n as Xt}from"./ref-BQ_gIewY.js";import"./index-wmqW_UCu.js";import{O as Oe}from"./index-D055j69D.js";import{e as Qt}from"./index-CWCCd-BA.js";import{N as Jt}from"./index-6meii4H8.js";import"./index-CnKVYuU-.js";import"./index-CpxMsrHP.js";import"./index-55FHG4oV.js";import"./index-DGekYBIK.js";import"./index-BDYvBNMf.js";import"./index-ri6M0fge.js";import"./index-tTOG_2M6.js";import"./index-BqoH6h8g.js";import"./ConstantsUtil-Dmg8YACJ.js";import"./index-BpRbl2yu.js";const Zt=m`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-color-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    background: var(--wui-color-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`;var V=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let R=class extends f{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.loading=!1,this.address="",this.profileName="",this.charsStart=4,this.charsEnd=6}render(){return c`
      <button
        ?disabled=${this.disabled}
        class=${h(this.balance?void 0:"local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address?L.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"}):null}
          </wui-text>
        </wui-flex>
      </button>
    `}balanceTemplate(){if(this.isUnsupportedChain)return c` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>`;if(this.balance){const e=this.networkSrc?c`<wui-image src=${this.networkSrc}></wui-image>`:c`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `,t=this.loading?c`<wui-loading-spinner size="md" color="fg-200"></wui-loading-spinner>`:c`<wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>`;return c`${e} ${t}`}return null}};R.styles=[S,_,Zt];V([u()],R.prototype,"networkSrc",void 0);V([u()],R.prototype,"avatarSrc",void 0);V([u()],R.prototype,"balance",void 0);V([u({type:Boolean})],R.prototype,"isUnsupportedChain",void 0);V([u({type:Boolean})],R.prototype,"disabled",void 0);V([u({type:Boolean})],R.prototype,"loading",void 0);V([u()],R.prototype,"address",void 0);V([u()],R.prototype,"profileName",void 0);V([u()],R.prototype,"charsStart",void 0);V([u()],R.prototype,"charsEnd",void 0);R=V([w("wui-account-button")],R);var T=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};class I extends f{constructor(){var e,t,n,o,i,a;super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.caipAddress=(e=l.getAccountData(this.namespace))==null?void 0:e.caipAddress,this.balanceVal=(t=l.getAccountData(this.namespace))==null?void 0:t.balance,this.balanceSymbol=(n=l.getAccountData(this.namespace))==null?void 0:n.balanceSymbol,this.profileName=(o=l.getAccountData(this.namespace))==null?void 0:o.profileName,this.profileImage=(i=l.getAccountData(this.namespace))==null?void 0:i.profileImage,this.network=(a=l.getNetworkData(this.namespace))==null?void 0:a.caipNetwork,this.networkImage=C.getNetworkImage(this.network),this.isSupported=b.state.allowUnsupportedChain?!0:l.state.activeChain?l.checkIfSupportedNetwork(l.state.activeChain):!0}firstUpdated(){const e=this.namespace;e?this.unsubscribe.push(l.subscribeChainProp("accountState",t=>{this.caipAddress=t==null?void 0:t.caipAddress,this.balanceVal=t==null?void 0:t.balance,this.balanceSymbol=t==null?void 0:t.balanceSymbol,this.profileName=t==null?void 0:t.profileName,this.profileImage=t==null?void 0:t.profileImage},e),l.subscribeChainProp("networkState",t=>{this.network=t==null?void 0:t.caipNetwork,this.isSupported=l.checkIfSupportedNetwork(e,t==null?void 0:t.caipNetwork),this.networkImage=C.getNetworkImage(t==null?void 0:t.caipNetwork)},e)):this.unsubscribe.push(ge.subscribeNetworkImages(()=>{this.networkImage=C.getNetworkImage(this.network)}),l.subscribeKey("activeCaipAddress",t=>{this.caipAddress=t}),p.subscribeKey("balance",t=>this.balanceVal=t),p.subscribeKey("balanceSymbol",t=>this.balanceSymbol=t),p.subscribeKey("profileName",t=>this.profileName=t),p.subscribeKey("profileImage",t=>this.profileImage=t),l.subscribeKey("activeCaipNetwork",t=>{this.network=t,this.networkImage=C.getNetworkImage(t),this.isSupported=t!=null&&t.chainNamespace?l.checkIfSupportedNetwork(t==null?void 0:t.chainNamespace):!0,this.fetchNetworkImage(t)}))}updated(){this.fetchNetworkImage(this.network)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!l.state.activeChain)return null;const e=this.balance==="show",t=typeof this.balanceVal!="string";return c`
      <wui-account-button
        .disabled=${!!this.disabled}
        .isUnsupportedChain=${b.state.allowUnsupportedChain?!1:!this.isSupported}
        address=${h(v.getPlainAddress(this.caipAddress))}
        profileName=${h(this.profileName)}
        networkSrc=${h(this.networkImage)}
        avatarSrc=${h(this.profileImage)}
        balance=${e?v.formatBalance(this.balanceVal,this.balanceSymbol):""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace?`-${this.namespace}`:""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${t}
      >
      </wui-account-button>
    `}onClick(){this.isSupported||b.state.allowUnsupportedChain?$.open({namespace:this.namespace}):$.open({view:"UnsupportedChain"})}async fetchNetworkImage(e){var t,n;(t=e==null?void 0:e.assets)!=null&&t.imageId&&(this.networkImage=await C.fetchNetworkImage((n=e==null?void 0:e.assets)==null?void 0:n.imageId))}}T([u({type:Boolean})],I.prototype,"disabled",void 0);T([u()],I.prototype,"balance",void 0);T([u()],I.prototype,"charsStart",void 0);T([u()],I.prototype,"charsEnd",void 0);T([u()],I.prototype,"namespace",void 0);T([d()],I.prototype,"caipAddress",void 0);T([d()],I.prototype,"balanceVal",void 0);T([d()],I.prototype,"balanceSymbol",void 0);T([d()],I.prototype,"profileName",void 0);T([d()],I.prototype,"profileImage",void 0);T([d()],I.prototype,"network",void 0);T([d()],I.prototype,"networkImage",void 0);T([d()],I.prototype,"isSupported",void 0);let gt=class extends I{};gt=T([w("w3m-account-button")],gt);let mt=class extends I{};mt=T([w("appkit-account-button")],mt);const ei=m`
  :host {
    display: block;
    width: max-content;
  }
`;var M=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};class j extends f{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.caipAddress=l.state.activeCaipAddress}firstUpdated(){this.namespace?this.unsubscribe.push(l.subscribeChainProp("accountState",e=>{this.caipAddress=e==null?void 0:e.caipAddress},this.namespace)):this.unsubscribe.push(l.subscribeKey("activeCaipAddress",e=>this.caipAddress=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.caipAddress?c`
          <appkit-account-button
            .disabled=${!!this.disabled}
            balance=${h(this.balance)}
            .charsStart=${h(this.charsStart)}
            .charsEnd=${h(this.charsEnd)}
            namespace=${h(this.namespace)}
          >
          </appkit-account-button>
        `:c`
          <appkit-connect-button
            size=${h(this.size)}
            label=${h(this.label)}
            loadingLabel=${h(this.loadingLabel)}
            namespace=${h(this.namespace)}
          ></appkit-connect-button>
        `}}j.styles=ei;M([u({type:Boolean})],j.prototype,"disabled",void 0);M([u()],j.prototype,"balance",void 0);M([u()],j.prototype,"size",void 0);M([u()],j.prototype,"label",void 0);M([u()],j.prototype,"loadingLabel",void 0);M([u()],j.prototype,"charsStart",void 0);M([u()],j.prototype,"charsEnd",void 0);M([u()],j.prototype,"namespace",void 0);M([d()],j.prototype,"caipAddress",void 0);let bt=class extends j{};bt=M([w("w3m-button")],bt);let xt=class extends j{};xt=M([w("appkit-button")],xt);const ti=m`
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-color-gray-glass-010);
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`;var it=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let ye=class extends f{constructor(){super(...arguments),this.size="md",this.loading=!1}render(){const e=this.size==="md"?"paragraph-600":"small-600";return c`
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading?"accent-100":"inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `}loadingTemplate(){return this.loading?c`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`:null}};ye.styles=[S,_,ti];it([u()],ye.prototype,"size",void 0);it([u({type:Boolean})],ye.prototype,"loading",void 0);ye=it([w("wui-connect-button")],ye);var te=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};class ie extends f{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=$.state.open,this.loading=this.namespace?$.state.loadingNamespaceMap.get(this.namespace):$.state.loading,this.unsubscribe.push($.subscribe(e=>{this.open=e.open,this.loading=this.namespace?e.loadingNamespaceMap.get(this.namespace):e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`
      <wui-connect-button
        size=${h(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace?`-${this.namespace}`:""}`}
      >
        ${this.loading?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?$.close():this.loading||$.open({view:"Connect",namespace:this.namespace})}}te([u()],ie.prototype,"size",void 0);te([u()],ie.prototype,"label",void 0);te([u()],ie.prototype,"loadingLabel",void 0);te([u()],ie.prototype,"namespace",void 0);te([d()],ie.prototype,"open",void 0);te([d()],ie.prototype,"loading",void 0);let vt=class extends ie{};vt=te([w("w3m-connect-button")],vt);let yt=class extends ie{};yt=te([w("appkit-connect-button")],yt);const ii=m`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }
`;var Le=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let le=class extends f{constructor(){super(...arguments),this.imageSrc=void 0,this.isUnsupportedChain=void 0,this.disabled=!1}render(){return c`
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.isUnsupportedChain?c`
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `:this.imageSrc?c`<wui-image src=${this.imageSrc}></wui-image>`:c`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};le.styles=[S,_,ii];Le([u()],le.prototype,"imageSrc",void 0);Le([u({type:Boolean})],le.prototype,"isUnsupportedChain",void 0);Le([u({type:Boolean})],le.prototype,"disabled",void 0);le=Le([w("wui-network-button")],le);const ni=m`
  :host {
    display: block;
    width: max-content;
  }
`;var X=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};class H extends f{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=l.state.activeCaipNetwork,this.networkImage=C.getNetworkImage(this.network),this.caipAddress=l.state.activeCaipAddress,this.loading=$.state.loading,this.isSupported=b.state.allowUnsupportedChain?!0:l.state.activeChain?l.checkIfSupportedNetwork(l.state.activeChain):!0,this.unsubscribe.push(ge.subscribeNetworkImages(()=>{this.networkImage=C.getNetworkImage(this.network)}),l.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),l.subscribeKey("activeCaipNetwork",e=>{var t;this.network=e,this.networkImage=C.getNetworkImage(e),this.isSupported=e!=null&&e.chainNamespace?l.checkIfSupportedNetwork(e.chainNamespace):!0,C.fetchNetworkImage((t=e==null?void 0:e.assets)==null?void 0:t.imageId)}),$.subscribeKey("loading",e=>this.loading=e))}firstUpdated(){var e,t;C.fetchNetworkImage((t=(e=this.network)==null?void 0:e.assets)==null?void 0:t.imageId)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.network?l.checkIfSupportedNetwork(this.network.chainNamespace):!0;return c`
      <wui-network-button
        .disabled=${!!(this.disabled||this.loading)}
        .isUnsupportedChain=${b.state.allowUnsupportedChain?!1:!e}
        imageSrc=${h(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `}getLabel(){return this.network?!this.isSupported&&!b.state.allowUnsupportedChain?"Switch Network":this.network.name:this.label?this.label:this.caipAddress?"Unknown Network":"Select Network"}onClick(){this.loading||(k.sendEvent({type:"track",event:"CLICK_NETWORKS"}),$.open({view:"Networks"}))}}H.styles=ni;X([u({type:Boolean})],H.prototype,"disabled",void 0);X([u({type:String})],H.prototype,"label",void 0);X([d()],H.prototype,"network",void 0);X([d()],H.prototype,"networkImage",void 0);X([d()],H.prototype,"caipAddress",void 0);X([d()],H.prototype,"loading",void 0);X([d()],H.prototype,"isSupported",void 0);let Ct=class extends H{};Ct=X([w("w3m-network-button")],Ct);let kt=class extends H{};kt=X([w("appkit-network-button")],kt);const oi=m`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-accent-glass-010);
  }

  button:hover {
    background-color: var(--wui-color-accent-glass-015) !important;
  }

  button:active {
    background-color: var(--wui-color-accent-glass-020) !important;
  }
`;var ze=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let ue=class extends f{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return c`
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `}};ue.styles=[S,_,oi];ze([u()],ue.prototype,"label",void 0);ze([u()],ue.prototype,"description",void 0);ze([u()],ue.prototype,"icon",void 0);ue=ze([w("wui-notice-card")],ue);var _t=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let qe=class extends f{constructor(){super(),this.unsubscribe=[],this.socialProvider=Ge.getConnectedSocialProvider(),this.socialUsername=Ge.getConnectedSocialUsername(),this.namespace=l.state.activeChain,this.unsubscribe.push(l.subscribeKey("activeChain",e=>{this.namespace=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=x.getConnectorId(this.namespace),t=x.getAuthConnector();if(!t||e!==y.CONNECTOR_ID.AUTH)return this.style.cssText="display: none",null;const n=t.provider.getEmail()??"";return!n&&!this.socialUsername?(this.style.cssText="display: none",null):c`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider??"mail"}
        iconSize=${this.socialProvider?"xxl":"sm"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${()=>{this.onGoToUpdateEmail(n,this.socialProvider)}}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(n)}</wui-text>
      </wui-list-item>
    `}onGoToUpdateEmail(e,t){t||g.push("UpdateEmailWallet",{email:e,redirectView:"Account"})}getAuthName(e){return this.socialUsername?this.socialProvider==="discord"&&this.socialUsername.endsWith("0")?this.socialUsername.slice(0,-1):this.socialUsername:e.length>30?`${e.slice(0,-3)}...`:e}};_t([d()],qe.prototype,"namespace",void 0);qe=_t([w("w3m-account-auth-button")],qe);var G=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let z=class extends f{constructor(){super(),this.usubscribe=[],this.networkImages=ge.state.networkImages,this.address=p.state.address,this.profileImage=p.state.profileImage,this.profileName=p.state.profileName,this.network=l.state.activeCaipNetwork,this.preferredAccountTypes=p.state.preferredAccountTypes,this.disconnecting=!1,this.loading=!1,this.switched=!1,this.text="",this.usubscribe.push(p.subscribe(e=>{e.address&&(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.preferredAccountTypes=e.preferredAccountTypes)}),p.subscribeKey("preferredAccountTypes",e=>this.preferredAccountTypes=e),l.subscribeKey("activeCaipNetwork",e=>{e!=null&&e.id&&(this.network=e)}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){var t,n,o;if(!this.address)throw new Error("w3m-account-settings-view: No account provided");const e=this.networkImages[((n=(t=this.network)==null?void 0:t.assets)==null?void 0:n.imageId)??""];return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${["0","xl","m","xl"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${h(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${L.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${["0","l","m","l"]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${e?"image":"icon"}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${h(e)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${((o=this.network)==null?void 0:o.name)??"Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}chooseNameButtonTemplate(){var i;const e=(i=this.network)==null?void 0:i.chainNamespace,t=x.getConnectorId(e),n=x.getAuthConnector();return!l.checkIfNamesSupported()||!n||t!==y.CONNECTOR_ID.AUTH||this.profileName?null:c`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${!0}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `}authCardTemplate(){var i;const e=(i=this.network)==null?void 0:i.chainNamespace,t=x.getConnectorId(e),n=x.getAuthConnector(),{origin:o}=location;return!n||t!==y.CONNECTOR_ID.AUTH||o.includes(D.SECURE_SITE)?null:c`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}isAllowedNetworkSwitch(){const e=l.getAllRequestedCaipNetworks(),t=e?e.length>1:!1,n=e==null?void 0:e.find(({id:o})=>{var i;return o===((i=this.network)==null?void 0:i.id)});return t||!n}onCopyAddress(){try{this.address&&(v.copyToClopboard(this.address),B.showSuccess("Address copied"))}catch{B.showError("Failed to copy")}}togglePreferredAccountBtnTemplate(){var i,a;const e=(i=this.network)==null?void 0:i.chainNamespace,t=l.checkIfSmartAccountEnabled(),n=x.getConnectorId(e);return!x.getAuthConnector()||n!==y.CONNECTOR_ID.AUTH||!t?null:(this.switched||(this.text=((a=this.preferredAccountTypes)==null?void 0:a[e])===O.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your smart account"),c`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${!0}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `)}onChooseName(){g.push("ChooseAccountName")}async changePreferredAccountType(){var i,a;const e=(i=this.network)==null?void 0:i.chainNamespace,t=l.checkIfSmartAccountEnabled(),n=((a=this.preferredAccountTypes)==null?void 0:a[e])===O.ACCOUNT_TYPES.SMART_ACCOUNT||!t?O.ACCOUNT_TYPES.EOA:O.ACCOUNT_TYPES.SMART_ACCOUNT;x.getAuthConnector()&&(this.loading=!0,await Q.setPreferredAccountType(n,e),this.text=n===O.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your smart account",this.switched=!0,Vt.resetSend(),this.loading=!1,this.requestUpdate())}onNetworks(){this.isAllowedNetworkSwitch()&&g.push("Networks")}async onDisconnect(){try{this.disconnecting=!0,await Q.disconnect(),$.close()}catch{k.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),B.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onGoToUpgradeView(){k.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),g.push("UpgradeEmailWallet")}};G([d()],z.prototype,"address",void 0);G([d()],z.prototype,"profileImage",void 0);G([d()],z.prototype,"profileName",void 0);G([d()],z.prototype,"network",void 0);G([d()],z.prototype,"preferredAccountTypes",void 0);G([d()],z.prototype,"disconnecting",void 0);G([d()],z.prototype,"loading",void 0);G([d()],z.prototype,"switched",void 0);G([d()],z.prototype,"text",void 0);z=G([w("w3m-account-settings-view")],z);const ai=m`
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`;var se=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let q=class extends f{constructor(){super(...arguments),this.avatarSrc=void 0,this.profileName="",this.address="",this.icon="mail"}render(){const e=l.state.activeChain,n=x.getConnectorId(e)===y.CONNECTOR_ID.AUTH;return c`<button data-testid="wui-profile-button" @click=${this.handleClick}>
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${n?this.getIconTemplate(this.icon):""}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${L.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name="copy" id="copy-address"></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`}handleClick(e){var t,n;if(e.target instanceof HTMLElement&&e.target.id==="copy-address"){(t=this.onCopyClick)==null||t.call(this,e);return}(n=this.onProfileClick)==null||n.call(this,e)}getIconTemplate(e){return c`
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="${e||"networkPlaceholder"}"
      ></wui-icon-box>
    `}};q.styles=[S,_,ai];se([u()],q.prototype,"avatarSrc",void 0);se([u()],q.prototype,"profileName",void 0);se([u()],q.prototype,"address",void 0);se([u()],q.prototype,"icon",void 0);se([u()],q.prototype,"onProfileClick",void 0);se([u()],q.prototype,"onCopyClick",void 0);q=se([w("wui-profile-button-v2")],q);const ri=m`
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-s);
    height: 48px;
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: 24px;
    transition: background-color 0.2s linear;
  }

  .account-button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`;var P=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let N=class extends f{constructor(){var e;super(),this.unsubscribe=[],this.caipAddress=p.state.caipAddress,this.address=v.getPlainAddress(p.state.caipAddress),this.allAccounts=p.state.allAccounts,this.profileImage=p.state.profileImage,this.profileName=p.state.profileName,this.disconnecting=!1,this.balance=p.state.balance,this.balanceSymbol=p.state.balanceSymbol,this.features=b.state.features,this.remoteFeatures=b.state.remoteFeatures,this.namespace=l.state.activeChain,this.chainId=(e=l.state.activeCaipNetwork)==null?void 0:e.id,this.unsubscribe.push(p.subscribeKey("caipAddress",t=>{this.address=v.getPlainAddress(t),this.caipAddress=t}),p.subscribeKey("balance",t=>this.balance=t),p.subscribeKey("balanceSymbol",t=>this.balanceSymbol=t),p.subscribeKey("profileName",t=>this.profileName=t),p.subscribeKey("profileImage",t=>this.profileImage=t),b.subscribeKey("features",t=>this.features=t),b.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t),p.subscribeKey("allAccounts",t=>{this.allAccounts=t}),b.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t),l.subscribeKey("activeChain",t=>this.namespace=t),l.subscribeKey("activeCaipNetwork",t=>{var n;if(t){const[o,i]=((n=t==null?void 0:t.caipNetworkId)==null?void 0:n.split(":"))||[];o&&i&&(this.namespace=o,this.chainId=i)}}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.caipAddress)return null;const e=l.state.activeChain!==y.CHAIN.SOLANA&&this.allAccounts.length>1;return c`<wui-flex
        flexDirection="column"
        .padding=${["0","xl","m","xl"]}
        alignItems="center"
        gap="l"
      >
        ${e?this.multiAccountTemplate():this.singleAccountTemplate()}
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${v.formatBalance(this.balance,this.balanceSymbol)}
          </wui-text>
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${["0","s","s","s"]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${!1}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`}onrampTemplate(){var n;if(!this.namespace)return null;const e=(n=this.remoteFeatures)==null?void 0:n.onramp,t=D.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);return!e||!t?null:c`
      <wui-list-item
        data-testid="w3m-account-default-onramp-button"
        iconVariant="blue"
        icon="card"
        ?chevron=${!0}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy crypto</wui-text>
      </wui-list-item>
    `}orderedFeaturesTemplate(){var t;return(((t=this.features)==null?void 0:t.walletFeaturesOrder)||D.DEFAULT_FEATURES.walletFeaturesOrder).map(n=>{switch(n){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}activityTemplate(){var t;return this.namespace&&((t=this.remoteFeatures)==null?void 0:t.activity)&&D.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace)?c` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>`:null}swapsTemplate(){var n;const e=(n=this.remoteFeatures)==null?void 0:n.swaps,t=l.state.activeChain===y.CHAIN.EVM;return!e||!t?null:c`
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${!0}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
    `}sendTemplate(){var o;const e=(o=this.features)==null?void 0:o.send,t=l.state.activeChain,n=D.SEND_SUPPORTED_NAMESPACES.includes(t);return!e||!n?null:c`
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${!0}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `}authCardTemplate(){const e=l.state.activeChain,t=x.getConnectorId(e),n=x.getAuthConnector(),{origin:o}=location;return!n||t!==y.CONNECTOR_ID.AUTH||o.includes(D.SECURE_SITE)?null:c`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}handleSwitchAccountsView(){g.push("SwitchAddress")}handleClickPay(){g.push("OnRampProviders")}handleClickSwap(){g.push("Swap")}handleClickSend(){g.push("WalletSend")}explorerBtnTemplate(){return p.state.addressExplorerUrl?c`
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}singleAccountTemplate(){return c`
      <wui-avatar
        alt=${h(this.caipAddress)}
        address=${h(v.getPlainAddress(this.caipAddress))}
        imageSrc=${h(this.profileImage===null?void 0:this.profileImage)}
        data-testid="single-account-avatar"
      ></wui-avatar>
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex gap="3xs" alignItems="center" justifyContent="center">
          <wui-text variant="large-600" color="fg-100">
            ${this.profileName?L.getTruncateString({string:this.profileName,charsStart:20,charsEnd:0,truncate:"end"}):L.getTruncateString({string:this.address||"",charsStart:4,charsEnd:4,truncate:"middle"})}
          </wui-text>
          <wui-icon-link
            size="md"
            icon="copy"
            iconColor="fg-200"
            @click=${this.onCopyAddress}
          ></wui-icon-link> </wui-flex
      ></wui-flex>
    `}multiAccountTemplate(){if(!this.address)throw new Error("w3m-account-view: No account provided");const e=this.allAccounts.find(n=>n.address===this.address),t=p.state.addressLabels.get(this.address);return this.namespace==="bip122"?this.btcAccountsTemplate():c`
      <wui-profile-button-v2
        .onProfileClick=${this.handleSwitchAccountsView.bind(this)}
        address=${h(this.address)}
        icon="${(e==null?void 0:e.type)===O.ACCOUNT_TYPES.SMART_ACCOUNT&&l.state.activeChain===y.CHAIN.EVM?"lightbulb":"mail"}"
        avatarSrc=${h(this.profileImage?this.profileImage:void 0)}
        profileName=${h(t||this.profileName)}
        .onCopyClick=${this.onCopyAddress.bind(this)}
      ></wui-profile-button-v2>
    `}btcAccountsTemplate(){return c`<wui-flex gap="m" alignItems="center" flexDirection="column">
      <wui-avatar
        .imageSrc=${h(this.profileImage?this.profileImage:void 0)}
        alt=${this.address}
        address=${this.address}
      ></wui-avatar>
      <wui-tabs
        .tabs=${[{label:"Payment"},{label:"Ordinals"}]}
        .onTabChange=${e=>{var t;return p.setCaipAddress(`bip122:${this.chainId}:${((t=this.allAccounts[e])==null?void 0:t.address)||""}`,this.namespace)}}
      ></wui-tabs>
      <wui-flex gap="xs" alignItems="center" justifyContent="center">
        <wui-text variant="large-600" color="fg-100">
          ${L.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        </wui-text>
        <wui-icon-link
          size="md"
          icon="copy"
          iconColor="fg-200"
          @click=${this.onCopyAddress}
        ></wui-icon-link>
      </wui-flex>
    </wui-flex>`}onCopyAddress(){try{this.address&&(v.copyToClopboard(this.address),B.showSuccess("Address copied"))}catch{B.showError("Failed to copy")}}onTransactions(){var t;const e=l.state.activeChain;k.sendEvent({type:"track",event:"CLICK_TRANSACTIONS",properties:{isSmartAccount:((t=p.state.preferredAccountTypes)==null?void 0:t[e])===O.ACCOUNT_TYPES.SMART_ACCOUNT}}),g.push("Transactions")}async onDisconnect(){try{this.disconnecting=!0,await Q.disconnect(),$.close()}catch{k.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),B.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onExplorer(){const e=p.state.addressExplorerUrl;e&&v.openHref(e,"_blank")}onGoToUpgradeView(){k.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),g.push("UpgradeEmailWallet")}};N.styles=ri;P([d()],N.prototype,"caipAddress",void 0);P([d()],N.prototype,"address",void 0);P([d()],N.prototype,"allAccounts",void 0);P([d()],N.prototype,"profileImage",void 0);P([d()],N.prototype,"profileName",void 0);P([d()],N.prototype,"disconnecting",void 0);P([d()],N.prototype,"balance",void 0);P([d()],N.prototype,"balanceSymbol",void 0);P([d()],N.prototype,"features",void 0);P([d()],N.prototype,"remoteFeatures",void 0);P([d()],N.prototype,"namespace",void 0);P([d()],N.prototype,"chainId",void 0);N=P([w("w3m-account-default-widget")],N);const si=m`
  span {
    font-weight: 500;
    font-size: 40px;
    color: var(--wui-color-fg-100);
    line-height: 130%; /* 52px */
    letter-spacing: -1.6px;
    text-align: center;
  }

  .pennies {
    color: var(--wui-color-fg-200);
  }
`;var nt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Ce=class extends f{constructor(){super(...arguments),this.dollars="0",this.pennies="00"}render(){return c`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`}};Ce.styles=[S,si];nt([u()],Ce.prototype,"dollars",void 0);nt([u()],Ce.prototype,"pennies",void 0);Ce=nt([w("wui-balance")],Ce);const ci=m`
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`;var me=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let J=class extends f{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.profileName="",this.address="",this.icon="chevronBottom"}render(){return c`<button data-testid="wui-profile-button">
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${this.networkImageTemplate()}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${L.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name=${this.icon}></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`}networkImageTemplate(){return this.networkSrc?c`<wui-image src=${this.networkSrc}></wui-image>`:c`
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};J.styles=[S,_,ci];me([u()],J.prototype,"networkSrc",void 0);me([u()],J.prototype,"avatarSrc",void 0);me([u()],J.prototype,"profileName",void 0);me([u()],J.prototype,"address",void 0);me([u()],J.prototype,"icon",void 0);J=me([w("wui-profile-button")],J);const li=m`
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);

    color: var(--wui-color-bg-100);
    position: relative;
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;var Ve=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let de=class extends f{constructor(){super(...arguments),this.placement="top",this.variant="fill",this.message=""}render(){return this.dataset.variant=this.variant,c`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${this.variant==="fill"?"cursor":"cursorTransparent"}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`}};de.styles=[S,_,li];Ve([u()],de.prototype,"placement",void 0);Ve([u()],de.prototype,"variant",void 0);Ve([u()],de.prototype,"message",void 0);de=Ve([w("wui-tooltip")],de);const ui={getTabsByNamespace(r){var t;return!!r&&r===y.CHAIN.EVM?((t=b.state.remoteFeatures)==null?void 0:t.activity)===!1?dt.ACCOUNT_TABS.filter(n=>n.label!=="Activity"):dt.ACCOUNT_TABS:[]}},di=m`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;var pi=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Ye=class extends f{render(){return c`<w3m-activity-list page="account"></w3m-activity-list>`}};Ye.styles=di;Ye=pi([w("w3m-account-activity-widget")],Ye);const hi=m`
  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;var wi=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Xe=class extends f{render(){return c`${this.nftTemplate()}`}nftTemplate(){return c` <wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="wallet"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text
          variant="paragraph-500"
          align="center"
          color="fg-100"
          data-testid="nft-template-title"
          >Coming soon</wui-text
        >
        <wui-text
          variant="small-400"
          align="center"
          color="fg-200"
          data-testid="nft-template-description"
          >Stay tuned for our upcoming NFT feature</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)} data-testid="link-receive-funds"
        >Receive funds</wui-link
      >
    </wui-flex>`}onReceiveClick(){g.push("WalletReceive")}};Xe.styles=hi;Xe=wi([w("w3m-account-nfts-widget")],Xe);const fi=m`
  button {
    width: 100%;
    display: flex;
    gap: var(--wui-spacing-s);
    align-items: center;
    justify-content: flex-start;
    padding: var(--wui-spacing-s) var(--wui-spacing-m) var(--wui-spacing-s) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
  }

  wui-flex {
    width: auto;
  }
`;var ne=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let K=class extends f{constructor(){super(...arguments),this.icon="card",this.text="",this.description="",this.tag=void 0,this.iconBackgroundColor="accent-100",this.iconColor="accent-100",this.disabled=!1}render(){return c`
      <button ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          <wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text></wui-flex
        >
      </button>
    `}titleTemplate(){return this.tag?c` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`:c`<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`}};K.styles=[S,_,fi];ne([u()],K.prototype,"icon",void 0);ne([u()],K.prototype,"text",void 0);ne([u()],K.prototype,"description",void 0);ne([u()],K.prototype,"tag",void 0);ne([u()],K.prototype,"iconBackgroundColor",void 0);ne([u()],K.prototype,"iconColor",void 0);ne([u({type:Boolean})],K.prototype,"disabled",void 0);K=ne([w("wui-list-description")],K);const gi=m`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`;var ot=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let ke=class extends f{constructor(){super(),this.unsubscribe=[],this.tokenBalance=p.state.tokenBalance,this.remoteFeatures=b.state.remoteFeatures,this.unsubscribe.push(p.subscribe(e=>{this.tokenBalance=e.tokenBalance}),b.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`${this.tokenTemplate()}`}tokenTemplate(){var e;return this.tokenBalance&&((e=this.tokenBalance)==null?void 0:e.length)>0?c`<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>`:c` <wui-flex flexDirection="column" gap="xs"
      >${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Transfer tokens on your wallet"
        icon="arrowBottomCircle"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="receive-funds"
      ></wui-list-description
    ></wui-flex>`}onRampTemplate(){var e;return(e=this.remoteFeatures)!=null&&e.onramp?c`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="buy-crypto"
      ></wui-list-description>`:c``}tokenItemTemplate(){var e;return(e=this.tokenBalance)==null?void 0:e.map(t=>c`<wui-list-token
          tokenName=${t.name}
          tokenImageUrl=${t.iconUrl}
          tokenAmount=${t.quantity.numeric}
          tokenValue=${t.value}
          tokenCurrency=${t.symbol}
        ></wui-list-token>`)}onReceiveClick(){g.push("WalletReceive")}onBuyClick(){var t;const e=l.state.activeChain;k.sendEvent({type:"track",event:"SELECT_BUY_CRYPTO",properties:{isSmartAccount:((t=p.state.preferredAccountTypes)==null?void 0:t[e])===O.ACCOUNT_TYPES.SMART_ACCOUNT}}),g.push("OnRampProviders")}};ke.styles=gi;ot([d()],ke.prototype,"tokenBalance",void 0);ot([d()],ke.prototype,"remoteFeatures",void 0);ke=ot([w("w3m-account-tokens-widget")],ke);const mi=m`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * var(--wui-spacing-2l));
  }

  wui-promo + wui-profile-button {
    margin-top: var(--wui-spacing-2l);
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;var F=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};const bi=48,xi=430;let W=class extends f{constructor(){super(),this.unsubscribe=[],this.address=p.state.address,this.profileImage=p.state.profileImage,this.profileName=p.state.profileName,this.network=l.state.activeCaipNetwork,this.currentTab=p.state.currentTab,this.tokenBalance=p.state.tokenBalance,this.features=b.state.features,this.remoteFeatures=b.state.remoteFeatures,this.networkImage=C.getNetworkImage(this.network),this.unsubscribe.push(ge.subscribeNetworkImages(()=>{this.networkImage=C.getNetworkImage(this.network)}),p.subscribe(e=>{e.address?(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.currentTab=e.currentTab,this.tokenBalance=e.tokenBalance):$.close()}),l.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=C.getNetworkImage(this.network)}),b.subscribeKey("features",e=>this.features=e),b.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.watchSwapValues()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearInterval(this.watchTokenBalance)}firstUpdated(){p.fetchTokenBalance()}render(){if(!this.address)throw new Error("w3m-account-view: No account provided");return c`<wui-flex
      flexDirection="column"
      .padding=${["0","xl","m","xl"]}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-profile-button
        @click=${this.onProfileButtonClick.bind(this)}
        address=${h(this.address)}
        networkSrc=${h(this.networkImage)}
        icon="chevronBottom"
        avatarSrc=${h(this.profileImage?this.profileImage:void 0)}
        profileName=${h(this.profileName??void 0)}
        data-testid="w3m-profile-button"
      ></wui-profile-button>

      ${this.tokenBalanceTemplate()} ${this.orderedWalletFeatures()} ${this.tabsTemplate()}
      ${this.listContentTemplate()}
    </wui-flex>`}orderedWalletFeatures(){var n;const e=((n=this.features)==null?void 0:n.walletFeaturesOrder)||D.DEFAULT_FEATURES.walletFeaturesOrder;return e.every(o=>{var i,a;return o==="send"||o==="receive"?!((i=this.features)!=null&&i[o]):o==="swaps"||o==="onramp"?!((a=this.remoteFeatures)!=null&&a[o]):!0})?null:c`<wui-flex gap="s">
      ${e.map(o=>{switch(o){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"receive":return this.receiveTemplate();case"send":return this.sendTemplate();default:return null}})}
    </wui-flex>`}onrampTemplate(){var t;return((t=this.remoteFeatures)==null?void 0:t.onramp)?c`
      <w3m-tooltip-trigger text="Buy">
        <wui-icon-button
          data-testid="wallet-features-onramp-button"
          @click=${this.onBuyClick.bind(this)}
          icon="card"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}swapsTemplate(){var n;const e=(n=this.remoteFeatures)==null?void 0:n.swaps,t=l.state.activeChain===y.CHAIN.EVM;return!e||!t?null:c`
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `}receiveTemplate(){var t;return((t=this.features)==null?void 0:t.receive)?c`
      <w3m-tooltip-trigger text="Receive">
        <wui-icon-button
          data-testid="wallet-features-receive-button"
          @click=${this.onReceiveClick.bind(this)}
          icon="arrowBottomCircle"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}sendTemplate(){var o;const e=(o=this.features)==null?void 0:o.send,t=l.state.activeChain,n=D.SEND_SUPPORTED_NAMESPACES.includes(t);return!e||!n?null:c`
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `}watchSwapValues(){this.watchTokenBalance=setInterval(()=>p.fetchTokenBalance(e=>this.onTokenBalanceError(e)),1e4)}onTokenBalanceError(e){e instanceof Error&&e.cause instanceof Response&&e.cause.status===y.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE&&clearInterval(this.watchTokenBalance)}listContentTemplate(){return this.currentTab===0?c`<w3m-account-tokens-widget></w3m-account-tokens-widget>`:this.currentTab===1?c`<w3m-account-nfts-widget></w3m-account-nfts-widget>`:this.currentTab===2?c`<w3m-account-activity-widget></w3m-account-activity-widget>`:c`<w3m-account-tokens-widget></w3m-account-tokens-widget>`}tokenBalanceTemplate(){var e;if(this.tokenBalance&&((e=this.tokenBalance)==null?void 0:e.length)>=0){const t=v.calculateBalance(this.tokenBalance),{dollars:n="0",pennies:o="00"}=v.formatTokenBalance(t);return c`<wui-balance dollars=${n} pennies=${o}></wui-balance>`}return c`<wui-balance dollars="0" pennies="00"></wui-balance>`}tabsTemplate(){const e=ui.getTabsByNamespace(l.state.activeChain);if(e.length===0)return null;const t=v.isMobile()&&window.innerWidth<xi;let n="104px";return t?n=`${(window.innerWidth-bi)/e.length}px`:e.length===2?n="156px":n="104px",c`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${n}
      .tabs=${e}
    ></wui-tabs>`}onTabChange(e){p.setCurrentTab(e)}onProfileButtonClick(){const{allAccounts:e}=p.state;e.length>1?g.push("Profile"):g.push("AccountSettings")}onBuyClick(){g.push("OnRampProviders")}onSwapClick(){var t,n,o,i;const e=l.state.activeChain;(t=this.network)!=null&&t.caipNetworkId&&!D.SWAP_SUPPORTED_NETWORKS.includes((n=this.network)==null?void 0:n.caipNetworkId)?g.push("UnsupportedChain",{swapUnsupportedChain:!0}):(k.sendEvent({type:"track",event:"OPEN_SWAP",properties:{network:((o=this.network)==null?void 0:o.caipNetworkId)||"",isSmartAccount:((i=p.state.preferredAccountTypes)==null?void 0:i[e])===O.ACCOUNT_TYPES.SMART_ACCOUNT}}),g.push("Swap"))}onReceiveClick(){g.push("WalletReceive")}onSendClick(){var t,n;const e=l.state.activeChain;k.sendEvent({type:"track",event:"OPEN_SEND",properties:{network:((t=this.network)==null?void 0:t.caipNetworkId)||"",isSmartAccount:((n=p.state.preferredAccountTypes)==null?void 0:n[e])===O.ACCOUNT_TYPES.SMART_ACCOUNT}}),g.push("WalletSend")}};W.styles=mi;F([d()],W.prototype,"watchTokenBalance",void 0);F([d()],W.prototype,"address",void 0);F([d()],W.prototype,"profileImage",void 0);F([d()],W.prototype,"profileName",void 0);F([d()],W.prototype,"network",void 0);F([d()],W.prototype,"currentTab",void 0);F([d()],W.prototype,"tokenBalance",void 0);F([d()],W.prototype,"features",void 0);F([d()],W.prototype,"remoteFeatures",void 0);F([d()],W.prototype,"networkImage",void 0);W=F([w("w3m-account-wallet-features-widget")],W);var Ot=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Qe=class extends f{constructor(){super(),this.unsubscribe=[],this.namespace=l.state.activeChain,this.unsubscribe.push(l.subscribeKey("activeChain",e=>{this.namespace=e}))}render(){if(!this.namespace)return null;const e=x.getConnectorId(this.namespace),t=x.getAuthConnector();return c`
      ${t&&e===y.CONNECTOR_ID.AUTH?this.walletFeaturesTemplate():this.defaultTemplate()}
    `}walletFeaturesTemplate(){return c`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`}defaultTemplate(){return c`<w3m-account-default-widget></w3m-account-default-widget>`}};Ot([d()],Qe.prototype,"namespace",void 0);Qe=Ot([w("w3m-account-view")],Qe);const vi=m`
  button {
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-avatar {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    box-shadow: 0 0 0 0;
  }
  .address {
    color: var(--wui-color-fg-base-100);
  }
  .address-description {
    text-transform: capitalize;
    color: var(--wui-color-fg-base-200);
  }

  wui-icon-box {
    position: relative;
    right: 15px;
    top: 15px;
    border: 2px solid var(--wui-color-bg-150);
    background-color: var(--wui-color-bg-125);
  }
`;var Te=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let oe=class extends f{constructor(){super(...arguments),this.accountAddress="",this.accountType="",this.labels=p.state.addressLabels,this.caipNetwork=l.state.activeCaipNetwork,this.socialProvider=Ge.getConnectedSocialProvider(),this.balance=0,this.fetchingBalance=!0,this.shouldShowIcon=!1,this.selected=!1}connectedCallback(){var e;super.connectedCallback(),Et.getBalance(this.accountAddress,(e=this.caipNetwork)==null?void 0:e.caipNetworkId).then(t=>{let n=this.balance;t.balances.length>0&&(n=t.balances.reduce((o,i)=>o+((i==null?void 0:i.value)||0),0)),this.balance=n,this.fetchingBalance=!1,this.requestUpdate()}).catch(()=>{this.fetchingBalance=!1,this.requestUpdate()})}render(){const e=this.getLabel(),t=l.state.activeChain,n=x.getConnectorId(t);return this.shouldShowIcon=n===y.CONNECTOR_ID.AUTH,c`
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        .padding=${["0","0","s","1xs"]}
      >
        <wui-flex gap="md" alignItems="center">
          <wui-avatar address=${this.accountAddress}></wui-avatar>
          ${this.shouldShowIcon?c`<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="fg-300"
                icon=${this.accountType===O.ACCOUNT_TYPES.EOA?this.socialProvider??"mail":"lightbulb"}
                background="fg-300"
              ></wui-icon-box>`:c`<wui-flex .padding="${["0","0","0","s"]}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${L.getTruncateString({string:this.accountAddress,charsStart:4,charsEnd:6,truncate:"middle"})}</wui-text
            >
            <wui-text class="address-description" variant="small-400">${e}</wui-text></wui-flex
          >
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          <slot name="action"></slot>
          ${this.fetchingBalance?c`<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`:c` <wui-text variant="small-400">$${this.balance.toFixed(2)}</wui-text>`}
        </wui-flex>
      </wui-flex>
    `}getLabel(){var o;let e=(o=this.labels)==null?void 0:o.get(this.accountAddress);const t=l.state.activeChain,n=x.getConnectorId(t);return!e&&n===y.CONNECTOR_ID.AUTH?e=`${this.accountType==="eoa"?this.socialProvider??"Email":"Smart"} Account`:e||(e="EOA"),e}};oe.styles=[S,_,vi];Te([u()],oe.prototype,"accountAddress",void 0);Te([u()],oe.prototype,"accountType",void 0);Te([u({type:Boolean})],oe.prototype,"selected",void 0);Te([u({type:Function})],oe.prototype,"onSelect",void 0);oe=Te([w("wui-list-account")],oe);const yi=m`
  wui-flex {
    width: 100%;
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;

    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #47a1ff;
  }

  .account-settings-button {
    padding: calc(var(--wui-spacing-m) - 1px) var(--wui-spacing-2l);
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .account-settings-button:hover {
    background: var(--wui-color-gray-glass-005);
  }
`;var be=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Z=class extends f{constructor(){super(),this.usubscribe=[],this.address=p.state.address,this.profileImage=p.state.profileImage,this.profileName=p.state.profileName,this.accounts=p.state.allAccounts,this.loading=!1,this.usubscribe.push(p.subscribeKey("address",e=>{e?this.address=e:$.close()})),this.usubscribe.push(p.subscribeKey("profileImage",e=>{this.profileImage=e})),this.usubscribe.push(p.subscribeKey("profileName",e=>{this.profileName=e}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-profile-view: No account provided");return c`
      <wui-flex flexDirection="column" gap="l" .padding=${["0","xl","m","xl"]}>
        <wui-flex flexDirection="column" alignItems="center" gap="l">
          <wui-avatar
            alt=${this.address}
            address=${this.address}
            imageSrc=${h(this.profileImage)}
            size="2lg"
          ></wui-avatar>
          <wui-flex flexDirection="column" alignItems="center">
            <wui-flex gap="3xs" alignItems="center" justifyContent="center">
              <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
                ${this.profileName?L.getTruncateString({string:this.profileName,charsStart:20,charsEnd:0,truncate:"end"}):L.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
              </wui-text>
              <wui-icon-link
                size="md"
                icon="copy"
                iconColor="fg-200"
                @click=${this.onCopyAddress}
              ></wui-icon-link>
            </wui-flex>
          </wui-flex>
        </wui-flex>
        <wui-flex
          data-testid="account-settings-button"
          justifyContent="center"
          alignItems="center"
          class="account-settings-button"
          @click=${()=>g.push("AccountSettings")}
        >
          <wui-text variant="paragraph-500" color="fg-100">Account Settings</wui-text>
        </wui-flex>
        ${this.accountsTemplate()}
      </wui-flex>
    `}accountsTemplate(){return c`<wui-flex flexDirection="column">
      <wui-flex .padding=${["3xs","m","s","s"]}>
        <wui-text color="fg-200" variant="paragraph-400">Your accounts</wui-text>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxs">
        ${this.accounts.map(e=>this.accountTemplate(e))}
      </wui-flex>
    </wui-flex>`}async onSwitchAccount(e){var o;const t=(o=l.state.activeCaipNetwork)==null?void 0:o.chainNamespace;if(this.loading=!0,x.getAuthConnector()){const i=e.type;await Q.setPreferredAccountType(i,t)}p.setShouldUpdateToAddress(e.address,t),this.loading=!1}accountTemplate(e){return c`<wui-list-account accountAddress=${e.address} accountType=${e.type}>
      ${e.address===this.address?"":c`<wui-button
            slot="action"
            textVariant="small-600"
            size="md"
            variant="accent"
            @click=${()=>this.onSwitchAccount(e)}
            .loading=${this.loading}
            >Switch</wui-button
          >`}
    </wui-list-account>`}onCopyAddress(){try{this.address&&(v.copyToClopboard(this.address),B.showSuccess("Address copied"))}catch{B.showError("Failed to copy")}}};Z.styles=yi;be([d()],Z.prototype,"address",void 0);be([d()],Z.prototype,"profileImage",void 0);be([d()],Z.prototype,"profileName",void 0);be([d()],Z.prototype,"accounts",void 0);be([d()],Z.prototype,"loading",void 0);Z=be([w("w3m-profile-view")],Z);const Ci=m`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-m);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`;var Me=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let pe=class extends f{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size=""}render(){return c`
      <wui-flex gap="1xs" alignItems="center">
        <wui-avatar size=${this.size} imageSrc=${this.imageSrc}></wui-avatar>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};pe.styles=[S,_,Ci];Me([u()],pe.prototype,"imageSrc",void 0);Me([u()],pe.prototype,"text",void 0);Me([u()],pe.prototype,"size",void 0);pe=Me([w("wui-banner-img")],pe);const ki=m`
  wui-avatar {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    box-shadow: 0 0 0 0;
  }

  wui-icon-box {
    position: relative;
    right: 15px;
    top: 15px;
    border: 2px solid var(--wui-color-bg-150);
    background-color: var(--wui-color-bg-125);
  }
`;var at=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let $e=class extends f{constructor(){super(),this.metadata=b.state.metadata,this.allAccounts=p.state.allAccounts||[],this.balances={},this.labels=p.state.addressLabels,this.currentAddress=p.state.address||"",this.caipNetwork=l.state.activeCaipNetwork,p.subscribeKey("allAccounts",e=>{this.allAccounts=e})}connectedCallback(){super.connectedCallback(),this.allAccounts.forEach(e=>{var t;Et.getBalance(e.address,(t=this.caipNetwork)==null?void 0:t.caipNetworkId).then(n=>{let o=this.balances[e.address]||0;n.balances.length>0&&(o=n.balances.reduce((i,a)=>i+((a==null?void 0:a.value)||0),0)),this.balances[e.address]=o,this.requestUpdate()})})}getAddressIcon(e){return e==="smartAccount"?"lightbulb":"mail"}render(){var e,t;return c`
      <wui-flex justifyContent="center" .padding=${["xl","0","xl","0"]}>
        <wui-banner-img
          imageSrc=${h((e=this.metadata)==null?void 0:e.icons[0])}
          text=${h((t=this.metadata)==null?void 0:t.url)}
          size="sm"
        ></wui-banner-img>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxl" .padding=${["l","xl","xl","xl"]}>
        ${this.allAccounts.map((n,o)=>this.getAddressTemplate(n,o))}
      </wui-flex>
    `}getAddressTemplate(e,t){var s,A,ve,_e;const n=(s=this.labels)==null?void 0:s.get(e.address),o=l.state.activeChain,a=x.getConnectorId(o)===y.CONNECTOR_ID.AUTH;return c`
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        data-testid="switch-address-item"
      >
        <wui-flex alignItems="center">
          <wui-avatar address=${e.address}></wui-avatar>
          ${a?c`<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="glass-002"
                background="gray"
                icon="${this.getAddressIcon(e.type)}"
                ?border=${!0}
              ></wui-icon-box>`:c`<wui-flex .padding="${["0","0","0","s"]}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${n||L.getTruncateString({string:e.address,charsStart:4,charsEnd:6,truncate:"middle"})}</wui-text
            >
            <wui-text class="address-description" variant="small-400">
              ${typeof this.balances[e.address]=="number"?`$${(A=this.balances[e.address])==null?void 0:A.toFixed(2)}`:c`<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          ${((ve=e.address)==null?void 0:ve.toLowerCase())===((_e=this.currentAddress)==null?void 0:_e.toLowerCase())?"":c`
                <wui-button
                  data-testid=${`w3m-switch-address-button-${t}`}
                  textVariant="small-600"
                  size="md"
                  variant="accent"
                  @click=${()=>this.onSwitchAddress(e.address)}
                  >Switch to</wui-button
                >
              `}
        </wui-flex>
      </wui-flex>
    `}onSwitchAddress(e){const t=l.state.activeCaipNetwork,n=t==null?void 0:t.chainNamespace,o=`${n}:${t==null?void 0:t.id}:${e}`;p.setCaipAddress(o,n),$.close()}};$e.styles=ki;at([d()],$e.prototype,"allAccounts",void 0);at([d()],$e.prototype,"balances",void 0);$e=at([w("w3m-switch-address-view")],$e);const $i=m`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 16.5px var(--wui-spacing-l) 16.5px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;var Fe=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let he=class extends f{constructor(){super(...arguments),this.text="",this.disabled=!1,this.tabIdx=void 0}render(){return c`
      <button ?disabled=${this.disabled} tabindex=${h(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `}};he.styles=[S,_,$i];Fe([u()],he.prototype,"text",void 0);Fe([u({type:Boolean})],he.prototype,"disabled",void 0);Fe([u()],he.prototype,"tabIdx",void 0);he=Fe([w("wui-list-button")],he);const Ai=m`
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var Ie=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let ae=class extends f{constructor(){super(...arguments),this.unsubscribe=[],this.formRef=Yt(),this.email="",this.loading=!1,this.error=""}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){var e;(e=this.formRef.value)==null||e.addEventListener("keydown",t=>{t.key==="Enter"&&this.onSubmitEmail(t)})}render(){return c`
      <form ${Xt(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${h(this.tabIdx)}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `}submitButtonTemplate(){return!this.loading&&this.email.length>3?c`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?c`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}templateError(){return this.error?c`<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>`:null}onEmailInputChange(e){this.email=e.detail.trim(),this.error=""}async onSubmitEmail(e){if(!y.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(n=>n===l.state.activeChain)){const n=l.getFirstCaipNetworkSupportsAuthConnector();if(n){g.push("SwitchNetwork",{network:n});return}}try{if(this.loading)return;this.loading=!0,e.preventDefault();const n=x.getAuthConnector();if(!n)throw new Error("w3m-email-login-widget: Auth connector not found");const{action:o}=await n.provider.connectEmail({email:this.email});k.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),o==="VERIFY_OTP"?(k.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),g.push("EmailVerifyOtp",{email:this.email})):o==="VERIFY_DEVICE"?g.push("EmailVerifyDevice",{email:this.email}):o==="CONNECT"&&(await Q.connectExternal(n,l.state.activeChain),g.replace("Account"))}catch(n){const o=v.parseError(n);o!=null&&o.includes("Invalid email")?this.error="Invalid email. Try again.":B.showError(n)}finally{this.loading=!1}}onFocusEvent(){k.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};ae.styles=Ai;Ie([u()],ae.prototype,"tabIdx",void 0);Ie([d()],ae.prototype,"email",void 0);Ie([d()],ae.prototype,"loading",void 0);Ie([d()],ae.prototype,"error",void 0);ae=Ie([w("w3m-email-login-widget")],ae);const Si=m`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 56px;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var Ke=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let we=class extends f{constructor(){super(...arguments),this.logo="google",this.disabled=!1,this.tabIdx=void 0}render(){return c`
      <button ?disabled=${this.disabled} tabindex=${h(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `}};we.styles=[S,_,Si];Ke([u()],we.prototype,"logo",void 0);Ke([u({type:Boolean})],we.prototype,"disabled",void 0);Ke([u()],we.prototype,"tabIdx",void 0);we=Ke([w("wui-logo-select")],we);const Ni=m`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var ce=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};const $t=2,At=6;let Y=class extends f{constructor(){super(),this.unsubscribe=[],this.walletGuide="get-started",this.tabIdx=void 0,this.connectors=x.state.connectors,this.remoteFeatures=b.state.remoteFeatures,this.authConnector=this.connectors.find(e=>e.type==="AUTH"),this.isPwaLoading=!1,this.unsubscribe.push(x.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(t=>t.type==="AUTH")}),b.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `}topViewTemplate(){var n;const e=this.walletGuide==="explore";let t=(n=this.remoteFeatures)==null?void 0:n.socials;return!t&&e?(t=D.DEFAULT_SOCIALS,this.renderTopViewContent(t)):t?this.renderTopViewContent(t):null}renderTopViewContent(e){return e.length===2?c` <wui-flex gap="xs">
        ${e.slice(0,$t).map(t=>c`<wui-logo-select
              data-testid=${`social-selector-${t}`}
              @click=${()=>{this.onSocialClick(t)}}
              logo=${t}
              tabIdx=${h(this.tabIdx)}
              ?disabled=${this.isPwaLoading}
            ></wui-logo-select>`)}
      </wui-flex>`:c` <wui-list-social
      data-testid=${`social-selector-${e[0]}`}
      @click=${()=>{this.onSocialClick(e[0])}}
      logo=${h(e[0])}
      align="center"
      name=${`Continue with ${e[0]}`}
      tabIdx=${h(this.tabIdx)}
      ?disabled=${this.isPwaLoading}
    ></wui-list-social>`}bottomViewTemplate(){var o;let e=(o=this.remoteFeatures)==null?void 0:o.socials;const t=this.walletGuide==="explore";return(!this.authConnector||!e||e.length===0)&&t&&(e=D.DEFAULT_SOCIALS),!e||e.length<=$t?null:e&&e.length>At?c`<wui-flex gap="xs">
        ${e.slice(1,At-1).map(i=>c`<wui-logo-select
              data-testid=${`social-selector-${i}`}
              @click=${()=>{this.onSocialClick(i)}}
              logo=${i}
              tabIdx=${h(this.tabIdx)}
              ?focusable=${this.tabIdx!==void 0&&this.tabIdx>=0}
              ?disabled=${this.isPwaLoading}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${h(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`:e?c`<wui-flex gap="xs">
      ${e.slice(1,e.length).map(i=>c`<wui-logo-select
            data-testid=${`social-selector-${i}`}
            @click=${()=>{this.onSocialClick(i)}}
            logo=${i}
            tabIdx=${h(this.tabIdx)}
            ?focusable=${this.tabIdx!==void 0&&this.tabIdx>=0}
            ?disabled=${this.isPwaLoading}
          ></wui-logo-select>`)}
    </wui-flex>`:null}onMoreSocialsClick(){g.push("ConnectSocials")}async onSocialClick(e){if(!y.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(n=>n===l.state.activeChain)){const n=l.getFirstCaipNetworkSupportsAuthConnector();if(n){g.push("SwitchNetwork",{network:n});return}}e&&await Qt(e)}async handlePwaFrameLoad(){var e;if(v.isPWA()){this.isPwaLoading=!0;try{((e=this.authConnector)==null?void 0:e.provider)instanceof Mt&&await this.authConnector.provider.init()}catch(t){Ft.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:t.message},"error")}finally{this.isPwaLoading=!1}}}};Y.styles=Ni;ce([u()],Y.prototype,"walletGuide",void 0);ce([u()],Y.prototype,"tabIdx",void 0);ce([d()],Y.prototype,"connectors",void 0);ce([d()],Y.prototype,"remoteFeatures",void 0);ce([d()],Y.prototype,"authConnector",void 0);ce([d()],Y.prototype,"isPwaLoading",void 0);Y=ce([w("w3m-social-login-widget")],Y);const Ti=m`
  wui-flex {
    width: 100%;
  }

  .wallet-guide {
    width: 100%;
  }

  .chip-box {
    width: fit-content;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }
`;var rt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Ae=class extends f{constructor(){super(...arguments),this.walletGuide="get-started"}render(){return this.walletGuide==="explore"?c`<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://walletguide.walletconnect.network"
              title="Find one on WalletGuide"
            ></wui-chip>
          </wui-flex>
        </wui-flex>`:c`<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          .padding=${["s","0","s","0"]}
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
            tabIdx=${h(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`}onGetStarted(){g.push("Create")}};Ae.styles=Ti;rt([u()],Ae.prototype,"tabIdx",void 0);rt([u()],Ae.prototype,"walletGuide",void 0);Ae=rt([w("w3m-wallet-guide")],Ae);var Rt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Je=class extends f{constructor(){super(...arguments),this.tabIdx=void 0}render(){return c`
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${h(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${h(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `}};Rt([u()],Je.prototype,"tabIdx",void 0);Je=Rt([w("w3m-wallet-login-list")],Je);const Ii=m`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var U=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};const Ei=470;let E=class extends f{constructor(){var e,t;super(),this.unsubscribe=[],this.connectors=x.state.connectors,this.authConnector=this.connectors.find(n=>n.type==="AUTH"),this.features=b.state.features,this.remoteFeatures=b.state.remoteFeatures,this.enableWallets=b.state.enableWallets,this.noAdapters=l.state.noAdapters,this.walletGuide="get-started",this.checked=Oe.state.isLegalCheckboxChecked,this.isEmailEnabled=((e=this.remoteFeatures)==null?void 0:e.email)&&!l.state.noAdapters,this.isSocialEnabled=((t=this.remoteFeatures)==null?void 0:t.socials)&&this.remoteFeatures.socials.length>0&&!l.state.noAdapters,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors),this.unsubscribe.push(x.subscribeKey("connectors",n=>{this.connectors=n,this.authConnector=this.connectors.find(o=>o.type==="AUTH"),this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)}),b.subscribeKey("features",n=>{this.features=n}),b.subscribeKey("remoteFeatures",n=>{this.remoteFeatures=n,this.setEmailAndSocialEnableCheck(this.noAdapters,this.remoteFeatures)}),b.subscribeKey("enableWallets",n=>this.enableWallets=n),l.subscribeKey("noAdapters",n=>this.setEmailAndSocialEnableCheck(n,this.remoteFeatures)),Oe.subscribeKey("isLegalCheckboxChecked",n=>this.checked=n))}disconnectedCallback(){var t,n;this.unsubscribe.forEach(o=>o()),(t=this.resizeObserver)==null||t.disconnect();const e=(n=this.shadowRoot)==null?void 0:n.querySelector(".connect");e==null||e.removeEventListener("scroll",this.handleConnectListScroll.bind(this))}firstUpdated(){var t,n;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".connect");e&&(requestAnimationFrame(this.handleConnectListScroll.bind(this)),e==null||e.addEventListener("scroll",this.handleConnectListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleConnectListScroll()}),(n=this.resizeObserver)==null||n.observe(e),this.handleConnectListScroll())}render(){var ut;const{termsConditionsUrl:e,privacyPolicyUrl:t}=b.state,n=(ut=b.state.features)==null?void 0:ut.legalCheckbox,a=!!(e||t)&&!!n&&this.walletGuide==="get-started"&&!this.checked,s={connect:!0,disabled:a},A=b.state.enableWalletGuide,ve=this.enableWallets,_e=this.isSocialEnabled||this.authConnector,zt=a?-1:void 0;return c`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${wt(s)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${_e&&ve&&A&&this.walletGuide==="get-started"?["3xs","s","0","s"]:["3xs","s","s","s"]}
          >
            ${this.renderConnectMethod(zt)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(a)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `}setEmailAndSocialEnableCheck(e,t){this.isEmailEnabled=(t==null?void 0:t.email)&&!e,this.isSocialEnabled=(t==null?void 0:t.socials)&&t.socials.length>0&&!e,this.remoteFeatures=t,this.noAdapters=e}checkIfAuthEnabled(e){const t=e.filter(o=>o.type===Kt.CONNECTOR_TYPE_AUTH).map(o=>o.chain);return y.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(o=>t.includes(o))}renderConnectMethod(e){const t=pt.getConnectOrderMethod(this.features,this.connectors);return c`${t.map((n,o)=>{switch(n){case"email":return c`${this.emailTemplate(e)} ${this.separatorTemplate(o,"email")}`;case"social":return c`${this.socialListTemplate(e)}
          ${this.separatorTemplate(o,"social")}`;case"wallet":return c`${this.walletListTemplate(e)}
          ${this.separatorTemplate(o,"wallet")}`;default:return null}})}`}checkMethodEnabled(e){switch(e){case"wallet":return this.enableWallets;case"social":return this.isSocialEnabled&&this.isAuthEnabled;case"email":return this.isEmailEnabled&&this.isAuthEnabled;default:return null}}checkIsThereNextMethod(e){const n=pt.getConnectOrderMethod(this.features,this.connectors)[e+1];return n?this.checkMethodEnabled(n)?n:this.checkIsThereNextMethod(e+1):void 0}separatorTemplate(e,t){const n=this.checkIsThereNextMethod(e),o=this.walletGuide==="explore";switch(t){case"wallet":return this.enableWallets&&n&&!o?c`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;case"email":{const i=n==="social";return this.isAuthEnabled&&this.isEmailEnabled&&!i&&n?c`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`:null}case"social":{const i=n==="email";return this.isAuthEnabled&&this.isSocialEnabled&&!i&&n?c`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null}default:return null}}emailTemplate(e){return!this.isEmailEnabled||!this.isAuthEnabled?null:c`<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${h(e)}
    ></w3m-email-login-widget>`}socialListTemplate(e){return!this.isSocialEnabled||!this.isAuthEnabled?null:c`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${h(e)}
    ></w3m-social-login-widget>`}walletListTemplate(e){var s,A;const t=this.enableWallets,n=((s=this.features)==null?void 0:s.emailShowWallets)===!1,o=(A=this.features)==null?void 0:A.collapseWallets,i=n||o;return!t||(v.isTelegram()&&(v.isSafari()||v.isIos())&&Q.connectWalletConnect().catch(ve=>({})),this.walletGuide==="explore")?null:this.isAuthEnabled&&(this.isEmailEnabled||this.isSocialEnabled)&&i?c`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${h(e)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`:c`<w3m-wallet-login-list tabIdx=${h(e)}></w3m-wallet-login-list>`}guideTemplate(e=!1){if(!b.state.enableWalletGuide)return null;const n={guide:!0,disabled:e},o=e?-1:void 0;return!this.authConnector&&!this.isSocialEnabled?null:c`
      ${this.walletGuide==="explore"&&!l.state.noAdapters?c`<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>`:null}
      <w3m-wallet-guide
        class=${wt(n)}
        tabIdx=${h(o)}
        walletGuide=${this.walletGuide}
      ></w3m-wallet-guide>
    `}legalCheckboxTemplate(){return this.walletGuide==="explore"?null:c`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`}handleConnectListScroll(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector(".connect");if(!e)return;e.scrollHeight>Ei?(e.style.setProperty("--connect-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 40px,
          black calc(100% - 40px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--connect-scroll--top-opacity",ft.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",ft.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--connect-mask-image","none"),e.style.setProperty("--connect-scroll--top-opacity","0"),e.style.setProperty("--connect-scroll--bottom-opacity","0"))}onContinueWalletClick(){g.push("ConnectWallets")}};E.styles=Ii;U([d()],E.prototype,"connectors",void 0);U([d()],E.prototype,"authConnector",void 0);U([d()],E.prototype,"features",void 0);U([d()],E.prototype,"remoteFeatures",void 0);U([d()],E.prototype,"enableWallets",void 0);U([d()],E.prototype,"noAdapters",void 0);U([u()],E.prototype,"walletGuide",void 0);U([d()],E.prototype,"checked",void 0);U([d()],E.prototype,"isEmailEnabled",void 0);U([d()],E.prototype,"isSocialEnabled",void 0);U([d()],E.prototype,"isAuthEnabled",void 0);E=U([w("w3m-connect-view")],E);var _i=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let St=class extends qt{constructor(){if(super(),this.externalViewUnsubscribe=[],!this.connector)throw new Error("w3m-connecting-view: No connector provided");k.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:"browser"}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1,this.externalViewUnsubscribe.push(l.subscribeKey("activeCaipAddress",e=>{e&&$.close()}))}disconnectedCallback(){this.externalViewUnsubscribe.forEach(e=>e())}async onConnectProxy(){try{this.error=!1,this.connector&&(this.connector.id!==y.CONNECTOR_ID.COINBASE_SDK||!this.error)&&(await Q.connectExternal(this.connector,this.connector.chain),k.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.connector.name||"Unknown"}}))}catch(e){k.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(e==null?void 0:e.message)??"Unknown"}}),this.error=!0}}};St=_i([w("w3m-connecting-external-view")],St);const Oi=m`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`;var Wt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Re=class extends f{constructor(){super(),this.unsubscribe=[],this.activeConnector=x.state.activeConnector,this.unsubscribe.push(x.subscribeKey("activeConnector",e=>this.activeConnector=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var e;return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["m","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${h(C.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["0","s","0","s"]}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${(e=this.activeConnector)==null?void 0:e.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["xs","0","xs","0"]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `}networksTemplate(){var e,t;return(t=(e=this.activeConnector)==null?void 0:e.connectors)==null?void 0:t.map(n=>n.name?c`
            <wui-list-wallet
              imageSrc=${h(C.getChainImage(n.chain))}
              name=${y.CHAIN_NAME_MAP[n.chain]}
              @click=${()=>this.onConnector(n)}
              data-testid="wui-list-chain-${n.chain}"
            ></wui-list-wallet>
          `:null)}onConnector(e){var n,o;const t=(o=(n=this.activeConnector)==null?void 0:n.connectors)==null?void 0:o.find(i=>i.chain===e.chain);if(!t){B.showError("Failed to find connector");return}t.id==="walletConnect"?v.isMobile()?g.push("AllWallets"):g.push("ConnectingWalletConnect"):g.push("ConnectingExternal",{connector:t})}};Re.styles=Oi;Wt([d()],Re.prototype,"activeConnector",void 0);Re=Wt([w("w3m-connecting-multi-chain-view")],Re);const Ri=m`
  .continue-button-container {
    width: 100%;
  }
`;var Pt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let We=class extends f{constructor(){super(...arguments),this.loading=!1}render(){return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{v.openHref(Jt.URLS.FAQ,"_blank")}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return c` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          icon="id"
          size="xl"
          iconSize="xxl"
          iconColor="fg-200"
          backgroundColor="fg-200"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return c`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`}handleContinue(){var t;const e=l.state.activeChain;g.push("RegisterAccountName"),k.sendEvent({type:"track",event:"OPEN_ENS_FLOW",properties:{isSmartAccount:((t=p.state.preferredAccountTypes)==null?void 0:t[e])===O.ACCOUNT_TYPES.SMART_ACCOUNT}})}};We.styles=Ri;Pt([d()],We.prototype,"loading",void 0);We=Pt([w("w3m-choose-account-name-view")],We);var Wi=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};const Pi="https://walletconnect.com/explorer";let Nt=class extends f{render(){return c`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${()=>{v.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></wui-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){const{recommended:e,featured:t}=Ht.state,{customWallets:n}=b.state;return[...t,...n??[],...e].slice(0,4).map(i=>c`
        <wui-list-wallet
          name=${i.name??"Unknown"}
          tagVariant="main"
          imageSrc=${h(C.getWalletImage(i))}
          @click=${()=>{v.openHref(i.homepage??Pi,"_blank")}}
        ></wui-list-wallet>
      `)}};Nt=Wi([w("w3m-get-wallet-view")],Nt);var Dt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Ze=class extends f{constructor(){super(...arguments),this.data=[]}render(){return c`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(e=>c`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map(t=>c`<wui-visual name=${t}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${e.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${e.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `}};Dt([u({type:Array})],Ze.prototype,"data",void 0);Ze=Dt([w("w3m-help-widget")],Ze);var Di=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};const ji=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}];let Tt=class extends f{render(){return c`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${ji}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){k.sendEvent({type:"track",event:"CLICK_GET_WALLET"}),g.push("GetWallet")}};Tt=Di([w("w3m-what-is-a-wallet-view")],Tt);const Ui=m`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var jt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Pe=class extends f{constructor(){super(),this.unsubscribe=[],this.checked=Oe.state.isLegalCheckboxChecked,this.unsubscribe.push(Oe.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var A;const{termsConditionsUrl:e,privacyPolicyUrl:t}=b.state,n=(A=b.state.features)==null?void 0:A.legalCheckbox,i=!!(e||t)&&!!n,a=i&&!this.checked,s=a?-1:void 0;return c`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${i?["0","s","s","s"]:"s"}
        gap="xs"
        class=${h(a?"disabled":void 0)}
      >
        <w3m-wallet-login-list tabIdx=${h(s)}></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};Pe.styles=Ui;jt([d()],Pe.prototype,"checked",void 0);Pe=jt([w("w3m-connect-wallets-view")],Pe);const Bi=m`
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var Li=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let et=class extends f{render(){return c`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};et.styles=[S,Bi];et=Li([w("wui-loading-hexagon")],et);const zi=m`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`;var st=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Se=class extends f{constructor(){var e;super(),this.network=(e=g.state.data)==null?void 0:e.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw new Error("w3m-network-switch-view: No network provided");this.onShowRetry();const e=this.getLabel(),t=this.getSubLabel();return c`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","3xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${h(C.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:c`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${!0}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${e}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `}getSubLabel(){const e=l.state.activeChain,t=x.getConnectorId(e);return x.getAuthConnector()&&t===y.CONNECTOR_ID.AUTH?"":this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet"}getLabel(){var o;const e=l.state.activeChain,t=x.getConnectorId(e);return x.getAuthConnector()&&t===y.CONNECTOR_ID.AUTH?`Switching to ${((o=this.network)==null?void 0:o.name)??"Unknown"} network...`:this.error?"Switch declined":"Approve in wallet"}onShowRetry(){var e;if(this.error&&!this.showRetry){this.showRetry=!0;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button");t==null||t.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onSwitchNetwork(){var e;try{this.error=!1,l.state.activeChain!==((e=this.network)==null?void 0:e.chainNamespace)&&l.setIsSwitchingNamespace(!0),this.network&&l.switchActiveNetwork(this.network)}catch{this.error=!0}}};Se.styles=zi;st([d()],Se.prototype,"showRetry",void 0);st([d()],Se.prototype,"error",void 0);Se=st([w("w3m-network-switch-view")],Se);const Vi=m`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button[data-transparent='true'] {
    pointer-events: none;
    background-color: transparent;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: 100%;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`;var xe=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let ee=class extends f{constructor(){super(...arguments),this.imageSrc="",this.name="",this.disabled=!1,this.selected=!1,this.transparent=!1}render(){return c`
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `}checkmarkTemplate(){return this.selected?c`<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>`:null}templateNetworkImage(){return this.imageSrc?c`<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>`:this.imageSrc?null:c`<wui-network-image
        ?round=${!0}
        size="md"
        name=${this.name}
      ></wui-network-image>`}};ee.styles=[S,_,Vi];xe([u()],ee.prototype,"imageSrc",void 0);xe([u()],ee.prototype,"name",void 0);xe([u({type:Boolean})],ee.prototype,"disabled",void 0);xe([u({type:Boolean})],ee.prototype,"selected",void 0);xe([u({type:Boolean})],ee.prototype,"transparent",void 0);ee=xe([w("wui-list-network")],ee);const Mi=m`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`;var Ee=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let re=class extends f{constructor(){super(),this.unsubscribe=[],this.network=l.state.activeCaipNetwork,this.requestedCaipNetworks=l.getCaipNetworks(),this.search="",this.onDebouncedSearch=v.debounce(e=>{this.search=e},100),this.unsubscribe.push(ge.subscribeNetworkImages(()=>this.requestUpdate()),l.subscribeKey("activeCaipNetwork",e=>this.network=e),l.subscribe(()=>{this.requestedCaipNetworks=l.getAllRequestedCaipNetworks()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${["0","s","s","s"]}
        flexDirection="column"
        gap="xs"
      >
        ${this.networksTemplate()}
      </wui-flex>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `}templateSearchInput(){return c`
      <wui-flex gap="xs" .padding=${["0","s","s","s"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onNetworkHelp(){k.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),g.push("WhatIsANetwork")}networksTemplate(){var n;const e=l.getAllApprovedCaipNetworkIds(),t=v.sortRequestedNetworks(e,this.requestedCaipNetworks);return this.search?this.filteredNetworks=t==null?void 0:t.filter(o=>{var i;return(i=o==null?void 0:o.name)==null?void 0:i.toLowerCase().includes(this.search.toLowerCase())}):this.filteredNetworks=t,(n=this.filteredNetworks)==null?void 0:n.map(o=>{var i;return c`
        <wui-list-network
          .selected=${((i=this.network)==null?void 0:i.id)===o.id}
          imageSrc=${h(C.getNetworkImage(o))}
          type="network"
          name=${o.name??o.id}
          @click=${()=>this.onSwitchNetwork(o)}
          .disabled=${this.getNetworkDisabled(o)}
          data-testid=${`w3m-network-switch-${o.name??o.id}`}
        ></wui-list-network>
      `})}getNetworkDisabled(e){const t=e.chainNamespace,n=p.getCaipAddress(t),o=l.getAllApprovedCaipNetworkIds(),i=l.getNetworkProp("supportsAllNetworks",t)!==!1,a=x.getConnectorId(t),s=x.getAuthConnector(),A=a===y.CONNECTOR_ID.AUTH&&s;return!n||i||A?!1:!(o!=null&&o.includes(e.caipNetworkId))}onSwitchNetwork(e){Gt.onSwitchNetwork({network:e})}};re.styles=Mi;Ee([d()],re.prototype,"network",void 0);Ee([d()],re.prototype,"requestedCaipNetworks",void 0);Ee([d()],re.prototype,"filteredNetworks",void 0);Ee([d()],re.prototype,"search",void 0);re=Ee([w("w3m-networks-view")],re);const Fi=m`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }

  .capitalize {
    text-transform: capitalize;
  }
`;var Ut=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};const Ki={eip155:"eth",solana:"solana",bip122:"bitcoin",polkadot:void 0};let De=class extends f{constructor(){var e,t;super(...arguments),this.unsubscribe=[],this.switchToChain=(e=g.state.data)==null?void 0:e.switchToChain,this.caipNetwork=(t=g.state.data)==null?void 0:t.network,this.activeChain=l.state.activeChain}firstUpdated(){this.unsubscribe.push(l.subscribeKey("activeChain",e=>this.activeChain=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.switchToChain?y.CHAIN_NAME_MAP[this.switchToChain]:"supported";if(!this.switchToChain)return null;const t=y.CHAIN_NAME_MAP[this.switchToChain];return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${h(Ki[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${t}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${t}</span></wui-text
          >
          <wui-text variant="small-400" color="fg-200" align="center">
            Connected wallet doesn't support connecting to ${e} chain. You
            need to connect with a different wallet.
          </wui-text>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `}async switchActiveChain(){this.switchToChain&&(l.setIsSwitchingNamespace(!0),x.setFilterByNamespace(this.switchToChain),this.caipNetwork?await l.switchActiveNetwork(this.caipNetwork):l.setActiveNamespace(this.switchToChain),g.reset("Connect"))}};De.styles=Fi;Ut([u()],De.prototype,"activeChain",void 0);De=Ut([w("w3m-switch-active-chain-view")],De);var Hi=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};const Gi=[{images:["network","layers","system"],title:"The system’s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}];let It=class extends f{render(){return c`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Gi}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${()=>{v.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};It=Hi([w("w3m-what-is-a-network-view")],It);const qi=m`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var Bt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let je=class extends f{constructor(){var e;super(),this.swapUnsupportedChain=(e=g.state.data)==null?void 0:e.swapUnsupportedChain,this.unsubscribe=[],this.disconecting=!1,this.unsubscribe.push(ge.subscribeNetworkImages(()=>this.requestUpdate()))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["m","xl","xs","xl"]}
          alignItems="center"
          gap="xl"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="s" gap="xs">
          ${this.networksTemplate()}
        </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="s" gap="xs">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}descriptionTemplate(){return this.swapUnsupportedChain?c`
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `:c`
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `}networksTemplate(){const e=l.getAllRequestedCaipNetworks(),t=l.getAllApprovedCaipNetworkIds(),n=v.sortRequestedNetworks(t,e);return(this.swapUnsupportedChain?n.filter(i=>D.SWAP_SUPPORTED_NETWORKS.includes(i.caipNetworkId)):n).map(i=>c`
        <wui-list-network
          imageSrc=${h(C.getNetworkImage(i))}
          name=${i.name??"Unknown"}
          @click=${()=>this.onSwitchNetwork(i)}
        >
        </wui-list-network>
      `)}async onDisconnect(){try{this.disconecting=!0,await Q.disconnect(),$.close()}catch{k.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),B.showError("Failed to disconnect")}finally{this.disconecting=!1}}async onSwitchNetwork(e){const t=p.state.caipAddress,n=l.getAllApprovedCaipNetworkIds(),o=l.getNetworkProp("supportsAllNetworks",e.chainNamespace),i=g.state.data;t?n!=null&&n.includes(e.caipNetworkId)?await l.switchActiveNetwork(e):o?g.push("SwitchNetwork",{...i,network:e}):g.push("SwitchNetwork",{...i,network:e}):t||(l.setActiveCaipNetwork(e),g.push("Connect"))}};je.styles=qi;Bt([d()],je.prototype,"disconecting",void 0);je=Bt([w("w3m-unsupported-chain-view")],je);const Yi=m`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`;var ct=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Ne=class extends f{constructor(){super(...arguments),this.icon="externalLink",this.text=""}render(){return c`
      <wui-flex gap="1xs" alignItems="center">
        <wui-icon-box
          size="sm"
          iconcolor="fg-200"
          backgroundcolor="fg-200"
          icon=${this.icon}
          background="transparent"
        ></wui-icon-box>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};Ne.styles=[S,_,Yi];ct([u()],Ne.prototype,"icon",void 0);ct([u()],Ne.prototype,"text",void 0);Ne=ct([w("wui-banner")],Ne);const Xi=m`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var Lt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Ue=class extends f{constructor(){super(),this.unsubscribe=[],this.preferredAccountTypes=p.state.preferredAccountTypes,this.unsubscribe.push(p.subscribeKey("preferredAccountTypes",e=>{this.preferredAccountTypes=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c` <wui-flex
      flexDirection="column"
      .padding=${["xs","s","m","s"]}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){var s;const e=l.getAllRequestedCaipNetworks(),t=l.getAllApprovedCaipNetworkIds(),n=l.state.activeCaipNetwork,o=l.checkIfSmartAccountEnabled();let i=v.sortRequestedNetworks(t,e);if(o&&((s=this.preferredAccountTypes)==null?void 0:s[n==null?void 0:n.chainNamespace])===O.ACCOUNT_TYPES.SMART_ACCOUNT){if(!n)return null;i=[n]}return i.filter(A=>A.chainNamespace===(n==null?void 0:n.chainNamespace)).map(A=>c`
        <wui-list-network
          imageSrc=${h(C.getNetworkImage(A))}
          name=${A.name??"Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `)}};Ue.styles=Xi;Lt([d()],Ue.prototype,"preferredAccountTypes",void 0);Ue=Lt([w("w3m-wallet-compatible-networks-view")],Ue);const Qi=m`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`;var He=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let fe=class extends f{render(){return this.style.cssText=`--local-border-radius: ${this.borderRadiusFull?"1000px":"20px"}; background-color: var(--wui-color-modal-bg);`,c`${this.templateVisual()}`}templateVisual(){return this.imageSrc?c`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:c`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};fe.styles=[S,Qi];He([u()],fe.prototype,"imageSrc",void 0);He([u()],fe.prototype,"alt",void 0);He([u({type:Boolean})],fe.prototype,"borderRadiusFull",void 0);fe=He([w("wui-visual-thumbnail")],fe);const Ji=m`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var Zi=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let tt=class extends f{constructor(){var e,t;super(...arguments),this.dappImageUrl=(e=b.state.metadata)==null?void 0:e.icons,this.walletImageUrl=(t=p.state.connectedWalletInfo)==null?void 0:t.icon}firstUpdated(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelectorAll("wui-visual-thumbnail");e!=null&&e[0]&&this.createAnimation(e[0],"translate(18px)"),e!=null&&e[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){var e;return c`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${(e=this.dappImageUrl)==null?void 0:e[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,t){e.animate([{transform:"translateX(0px)"},{transform:t}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};tt.styles=Ji;tt=Zi([w("w3m-siwx-sign-message-thumbnails")],tt);var lt=function(r,e,t,n){var o=arguments.length,i=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let Be=class extends f{constructor(){var e;super(...arguments),this.dappName=(e=b.state.metadata)==null?void 0:e.name,this.isCancelling=!1,this.isSigning=!1}render(){return c`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling?"Cancelling...":"Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0,await ht.requestSignMessage().finally(()=>this.isSigning=!1)}async onCancel(){this.isCancelling=!0,await ht.cancelSignMessage().finally(()=>this.isCancelling=!1)}};lt([d()],Be.prototype,"isCancelling",void 0);lt([d()],Be.prototype,"isSigning",void 0);Be=lt([w("w3m-siwx-sign-message-view")],Be);export{mt as AppKitAccountButton,xt as AppKitButton,yt as AppKitConnectButton,kt as AppKitNetworkButton,gt as W3mAccountButton,z as W3mAccountSettingsView,Qe as W3mAccountView,Bo as W3mAllWalletsView,bt as W3mButton,We as W3mChooseAccountNameView,vt as W3mConnectButton,E as W3mConnectView,Pe as W3mConnectWalletsView,St as W3mConnectingExternalView,Re as W3mConnectingMultiChainView,Lo as W3mConnectingWcBasicView,zo as W3mConnectingWcView,Vo as W3mDownloadsView,Nt as W3mGetWalletView,Ct as W3mNetworkButton,Se as W3mNetworkSwitchView,re as W3mNetworksView,Z as W3mProfileView,jo as W3mRouter,Be as W3mSIWXSignMessageView,De as W3mSwitchActiveChainView,$e as W3mSwitchAddressView,je as W3mUnsupportedChainView,Ue as W3mWalletCompatibleNetworksView,It as W3mWhatIsANetworkView,Tt as W3mWhatIsAWalletView};
