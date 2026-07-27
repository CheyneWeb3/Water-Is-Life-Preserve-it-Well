import{i as y,r as E,e as M,a as f,b as l,c as st,E as W,aR as m,t as p,cU as ge,p as b,S as oe,R as v,O as j,a2 as S,eh as X,q as w,a7 as ve,a6 as at,D as Ie,aQ as Ne,T as Oe,M as He,a5 as Fe}from"./index-DYV5x_W9.js";import{n as c,r as d,c as h,o as u,U as P}from"./if-defined-DCVUMdR3.js";import"./index-Dc77MzZp.js";import{n as lt}from"./index-BkK4-hv8.js";import"./index-DAotIAYd.js";import"./index-BTaMbO1G.js";import"./index-myT2kiCB.js";import"./index-BzabmC56.js";import"./index-D2Gt0fQT.js";import"./index-FMH72Syv.js";import"./index-BhKTDXf4.js";import"./index-BR_GCMwY.js";import{e as Ge,n as Xe}from"./ref-XGXaEEtr.js";import"./index-DyNjo7Me.js";import"./index-BGzr0PwH.js";import"./index-BbBRuVmB.js";const ct=y`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var k=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let T=class extends f{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,i)=>{var o;const n=i===this.activeTab;return l`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(i)}
          data-active=${n}
          data-testid="tab-${(o=e.label)==null?void 0:o.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?l`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,i){const n=this.buttons[this.activeTab],o=this.buttons[e],t=n==null?void 0:n.querySelector("wui-text"),r=o==null?void 0:o.querySelector("wui-text"),a=o==null?void 0:o.getBoundingClientRect(),g=r==null?void 0:r.getBoundingClientRect();n&&t&&!i&&e!==this.activeTab&&(t.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),n.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&a&&g&&r&&(e!==this.activeTab||i)&&(this.localTabWidth=`${Math.round(a.width+g.width)+6}px`,o.animate([{width:`${a.width+g.width}px`}],{duration:i?0:500,fill:"forwards",easing:"ease"}),r.animate([{opacity:1}],{duration:i?0:125,delay:i?0:200,fill:"forwards",easing:"ease"}))}};T.styles=[E,M,ct];k([c({type:Array})],T.prototype,"tabs",void 0);k([c()],T.prototype,"onTabChange",void 0);k([c({type:Array})],T.prototype,"buttons",void 0);k([c({type:Boolean})],T.prototype,"disabled",void 0);k([c()],T.prototype,"localTabWidth",void 0);k([d()],T.prototype,"activeTab",void 0);k([d()],T.prototype,"isDense",void 0);T=k([h("wui-tabs")],T);const dt=y`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var Qe=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let re=class extends f{constructor(){super(...arguments),this.inputElementRef=Ge(),this.checked=void 0}render(){return l`
      <label>
        <input
          ${Xe(this.inputElementRef)}
          type="checkbox"
          ?checked=${u(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){var e;this.dispatchEvent(new CustomEvent("switchChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.checked,bubbles:!0,composed:!0}))}};re.styles=[E,M,st,dt];Qe([c({type:Boolean})],re.prototype,"checked",void 0);re=Qe([h("wui-switch")],re);const ut=y`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var Je=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let se=class extends f{constructor(){super(...arguments),this.checked=void 0}render(){return l`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${u(this.checked)}></wui-switch>
      </button>
    `}};se.styles=[E,M,ut];Je([c({type:Boolean})],se.prototype,"checked",void 0);se=Je([h("wui-certified-switch")],se);const pt=y`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var Ye=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ae=class extends f{constructor(){super(...arguments),this.icon="copy"}render(){return l`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};ae.styles=[E,M,pt];Ye([c()],ae.prototype,"icon",void 0);ae=Ye([h("wui-input-element")],ae);const ht=y`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var ft=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let je=class extends f{constructor(){super(...arguments),this.inputComponentRef=Ge()}render(){return l`
      <wui-input-text
        ${Xe(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const e=this.inputComponentRef.value,i=e==null?void 0:e.inputElementRef.value;i&&(i.value="",i.focus(),i.dispatchEvent(new Event("input")))}};je.styles=[E,ht];je=ft([h("wui-search-bar")],je);const wt=y`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var Ze=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let le=class extends f{constructor(){super(...arguments),this.type="wallet"}render(){return l`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?l` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${lt}`:l`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};le.styles=[E,M,wt];Ze([c()],le.prototype,"type",void 0);le=Ze([h("wui-card-select-loader")],le);const mt=y`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var O=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let _=class extends f{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&P.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&P.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&P.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&P.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&P.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&P.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&P.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&P.getSpacingStyles(this.margin,3)};
    `,l`<slot></slot>`}};_.styles=[E,mt];O([c()],_.prototype,"gridTemplateRows",void 0);O([c()],_.prototype,"gridTemplateColumns",void 0);O([c()],_.prototype,"justifyItems",void 0);O([c()],_.prototype,"alignItems",void 0);O([c()],_.prototype,"justifyContent",void 0);O([c()],_.prototype,"alignContent",void 0);O([c()],_.prototype,"columnGap",void 0);O([c()],_.prototype,"rowGap",void 0);O([c()],_.prototype,"gap",void 0);O([c()],_.prototype,"padding",void 0);O([c()],_.prototype,"margin",void 0);_=O([h("wui-grid")],_);const bt=y`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var te=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let U=class extends f{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){var i,n;const e=((i=this.wallet)==null?void 0:i.badge_type)==="certified";return l`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${u(e?"certified":void 0)}
            >${(n=this.wallet)==null?void 0:n.name}</wui-text
          >
          ${e?l`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){var e,i;return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():l`
      <wui-wallet-image
        size="md"
        imageSrc=${u(this.imageSrc)}
        name=${(e=this.wallet)==null?void 0:e.name}
        .installed=${(i=this.wallet)==null?void 0:i.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return l`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=W.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await W.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};U.styles=bt;te([d()],U.prototype,"visible",void 0);te([d()],U.prototype,"imageSrc",void 0);te([d()],U.prototype,"imageLoading",void 0);te([c()],U.prototype,"wallet",void 0);U=te([h("w3m-all-wallets-list-item")],U);const gt=y`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var H=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Me="local-paginator";let D=class extends f{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!m.state.wallets.length,this.wallets=m.state.wallets,this.recommended=m.state.recommended,this.featured=m.state.featured,this.filteredWallets=m.state.filteredWallets,this.unsubscribe.push(m.subscribeKey("wallets",e=>this.wallets=e),m.subscribeKey("recommended",e=>this.recommended=e),m.subscribeKey("featured",e=>this.featured=e),m.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){var e;this.unsubscribe.forEach(i=>i()),(e=this.paginationObserver)==null||e.disconnect()}render(){return l`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){var i;this.loading=!0;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("wui-grid");e&&(await m.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,i){return[...Array(e)].map(()=>l`
        <wui-card-select-loader type="wallet" id=${u(i)}></wui-card-select-loader>
      `)}walletsTemplate(){var n;const e=((n=this.filteredWallets)==null?void 0:n.length)>0?p.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):p.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return ge.markWalletsAsInstalled(e).map(o=>l`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(o)}
          .wallet=${o}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:i,featured:n,count:o}=m.state,t=window.innerWidth<352?3:4,r=e.length+i.length;let g=Math.ceil(r/t)*t-r+t;return g-=e.length?n.length%t:0,o===0&&n.length>0?null:o===0||[...n,...e,...i].length<o?this.shimmerTemplate(g,Me):null}createPaginationObserver(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector(`#${Me}`);e&&(this.paginationObserver=new IntersectionObserver(([n])=>{if(n!=null&&n.isIntersecting&&!this.loading){const{page:o,count:t,wallets:r}=m.state;r.length<t&&m.fetchWalletsByPage({page:o+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){b.selectWalletConnector(e)}};D.styles=gt;H([d()],D.prototype,"loading",void 0);H([d()],D.prototype,"wallets",void 0);H([d()],D.prototype,"recommended",void 0);H([d()],D.prototype,"featured",void 0);H([d()],D.prototype,"filteredWallets",void 0);D=H([h("w3m-all-wallets-list")],D);const vt=y`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var ye=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let z=class extends f{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?l`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await m.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=m.state,i=ge.markWalletsAsInstalled(e);return e.length?l`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${i.map(n=>l`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(n)}
              .wallet=${n}
              data-testid="wallet-search-item-${n.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:l`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){b.selectWalletConnector(e)}};z.styles=vt;ye([d()],z.prototype,"loading",void 0);ye([c()],z.prototype,"query",void 0);ye([c()],z.prototype,"badge",void 0);z=ye([h("w3m-all-wallets-search")],z);var Le=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Q=class extends f{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=p.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return l`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?l`<w3m-all-wallets-search
            query=${this.search}
            badge=${u(this.badge)}
          ></w3m-all-wallets-search>`:l`<w3m-all-wallets-list badge=${u(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if(this.badge==="certified"){this.badge=void 0;return}this.badge="certified",oe.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return p.isMobile()?l`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){v.push("ConnectingWalletConnect")}};Le([d()],Q.prototype,"search",void 0);Le([d()],Q.prototype,"badge",void 0);Q=Le([h("w3m-all-wallets-view")],Q);const yt=y`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var et=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Re=4;let ce=class extends f{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<Re;return l`${this.walletImages.slice(0,Re).map(({src:i,walletName:n})=>l`
            <wui-wallet-image
              size="inherit"
              imageSrc=${i}
              name=${u(n)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(Re-this.walletImages.length)].map(()=>l` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};ce.styles=[E,yt];et([c({type:Array})],ce.prototype,"walletImages",void 0);ce=et([h("wui-all-wallets-image")],ce);const xt=y`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var R=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let x=class extends f{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return l`
      <button ?disabled=${this.disabled} tabindex=${u(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?l` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?l` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?l`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?l`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?l`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?l`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?l`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};x.styles=[E,M,xt];R([c({type:Array})],x.prototype,"walletImages",void 0);R([c()],x.prototype,"imageSrc",void 0);R([c()],x.prototype,"name",void 0);R([c()],x.prototype,"tagLabel",void 0);R([c()],x.prototype,"tagVariant",void 0);R([c()],x.prototype,"icon",void 0);R([c()],x.prototype,"walletIcon",void 0);R([c()],x.prototype,"tabIdx",void 0);R([c({type:Boolean})],x.prototype,"installed",void 0);R([c({type:Boolean})],x.prototype,"disabled",void 0);R([c({type:Boolean})],x.prototype,"showAllWallets",void 0);R([c({type:Boolean})],x.prototype,"loading",void 0);R([c({type:String})],x.prototype,"loadingSpinnerColor",void 0);x=R([h("wui-list-wallet")],x);var F=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let B=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.state.connectors,this.count=m.state.count,this.filteredCount=m.state.filteredWallets.length,this.isFetchingRecommendedWallets=m.state.isFetchingRecommendedWallets,this.unsubscribe.push(b.subscribeKey("connectors",e=>this.connectors=e),m.subscribeKey("count",e=>this.count=e),m.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),m.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(g=>g.id==="walletConnect"),{allWallets:i}=j.state;if(!e||i==="HIDE"||i==="ONLY_MOBILE"&&!p.isMobile())return null;const n=m.state.featured.length,o=this.count+n,t=o<10?o:Math.floor(o/10)*10,r=this.filteredCount>0?this.filteredCount:t;let a=`${r}`;return this.filteredCount>0?a=`${this.filteredCount}`:r<o&&(a=`${r}+`),l`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${a}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${u(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){S.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),v.push("AllWallets")}};F([c()],B.prototype,"tabIdx",void 0);F([d()],B.prototype,"connectors",void 0);F([d()],B.prototype,"count",void 0);F([d()],B.prototype,"filteredCount",void 0);F([d()],B.prototype,"isFetchingRecommendedWallets",void 0);B=F([h("w3m-all-wallets-widget")],B);var Pe=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let de=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.state.connectors,this.unsubscribe.push(b.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="ANNOUNCED");return e!=null&&e.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(X.showConnector).map(i=>l`
              <wui-list-wallet
                imageSrc=${u(W.getConnectorImage(i))}
                name=${i.name??"Unknown"}
                @click=${()=>this.onConnector(i)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${i.id}`}
                .installed=${!0}
                tabIdx=${u(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e.id==="walletConnect"?p.isMobile()?v.push("AllWallets"):v.push("ConnectingWalletConnect"):v.push("ConnectingExternal",{connector:e})}};Pe([c()],de.prototype,"tabIdx",void 0);Pe([d()],de.prototype,"connectors",void 0);de=Pe([h("w3m-connect-announced-widget")],de);var xe=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let J=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.state.connectors,this.loading=!1,this.unsubscribe.push(b.subscribeKey("connectors",e=>this.connectors=e)),p.isTelegram()&&p.isIos()&&(this.loading=!w.state.wcUri,this.unsubscribe.push(w.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{customWallets:e}=j.state;if(!(e!=null&&e.length))return this.style.cssText="display: none",null;const i=this.filterOutDuplicateWallets(e);return l`<wui-flex flexDirection="column" gap="xs">
      ${i.map(n=>l`
          <wui-list-wallet
            imageSrc=${u(W.getWalletImage(n))}
            name=${n.name??"Unknown"}
            @click=${()=>this.onConnectWallet(n)}
            data-testid=${`wallet-selector-${n.id}`}
            tabIdx=${u(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){const i=ve.getRecentWallets(),n=this.connectors.map(a=>{var g;return(g=a.info)==null?void 0:g.rdns}).filter(Boolean),o=i.map(a=>a.rdns).filter(Boolean),t=n.concat(o);if(t.includes("io.metamask.mobile")&&p.isMobile()){const a=t.indexOf("io.metamask.mobile");t[a]="io.metamask"}return e.filter(a=>!t.includes(String(a==null?void 0:a.rdns)))}onConnectWallet(e){this.loading||v.push("ConnectingWalletConnect",{wallet:e})}};xe([c()],J.prototype,"tabIdx",void 0);xe([d()],J.prototype,"connectors",void 0);xe([d()],J.prototype,"loading",void 0);J=xe([h("w3m-connect-custom-widget")],J);var De=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ue=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.state.connectors,this.unsubscribe.push(b.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const n=this.connectors.filter(o=>o.type==="EXTERNAL").filter(X.showConnector).filter(o=>o.id!==at.CONNECTOR_ID.COINBASE_SDK);return n!=null&&n.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(o=>l`
            <wui-list-wallet
              imageSrc=${u(W.getConnectorImage(o))}
              .installed=${!0}
              name=${o.name??"Unknown"}
              data-testid=${`wallet-selector-external-${o.id}`}
              @click=${()=>this.onConnector(o)}
              tabIdx=${u(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){v.push("ConnectingExternal",{connector:e})}};De([c()],ue.prototype,"tabIdx",void 0);De([d()],ue.prototype,"connectors",void 0);ue=De([h("w3m-connect-external-widget")],ue);var ke=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let pe=class extends f{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(e=>l`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${e.id}`}
              imageSrc=${u(W.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${u(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){b.selectWalletConnector(e)}};ke([c()],pe.prototype,"tabIdx",void 0);ke([c()],pe.prototype,"wallets",void 0);pe=ke([h("w3m-connect-featured-widget")],pe);var Ae=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let he=class extends f{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){const e=this.connectors.filter(X.showConnector);return e.length===0?(this.style.cssText="display: none",null):l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>l`
            <wui-list-wallet
              imageSrc=${u(W.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${u(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){b.setActiveConnector(e),v.push("ConnectingExternal",{connector:e})}};Ae([c()],he.prototype,"tabIdx",void 0);Ae([c()],he.prototype,"connectors",void 0);he=Ae([h("w3m-connect-injected-widget")],he);var Ue=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let fe=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.state.connectors,this.unsubscribe.push(b.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="MULTI_CHAIN"&&i.name!=="WalletConnect");return e!=null&&e.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>l`
            <wui-list-wallet
              imageSrc=${u(W.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${u(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){b.setActiveConnector(e),v.push("ConnectingMultiChain")}};Ue([c()],fe.prototype,"tabIdx",void 0);Ue([d()],fe.prototype,"connectors",void 0);fe=Ue([h("w3m-connect-multi-chain-widget")],fe);var Ce=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Y=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.state.connectors,this.loading=!1,this.unsubscribe.push(b.subscribeKey("connectors",e=>this.connectors=e)),p.isTelegram()&&p.isIos()&&(this.loading=!w.state.wcUri,this.unsubscribe.push(w.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const i=ve.getRecentWallets().filter(n=>!ge.isExcluded(n)).filter(n=>!this.hasWalletConnector(n)).filter(n=>this.isWalletCompatibleWithCurrentChain(n));return i.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(n=>l`
            <wui-list-wallet
              imageSrc=${u(W.getWalletImage(n))}
              name=${n.name??"Unknown"}
              @click=${()=>this.onConnectWallet(n)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${u(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){this.loading||b.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(i=>i.id===e.id||i.name===e.name)}isWalletCompatibleWithCurrentChain(e){const i=Ie.state.activeChain;return i&&e.chains?e.chains.some(n=>{const o=n.split(":")[0];return i===o}):!0}};Ce([c()],Y.prototype,"tabIdx",void 0);Ce([d()],Y.prototype,"connectors",void 0);Ce([d()],Y.prototype,"loading",void 0);Y=Ce([h("w3m-connect-recent-widget")],Y);var $e=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Z=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,p.isTelegram()&&p.isIos()&&(this.loading=!w.state.wcUri,this.unsubscribe.push(w.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const{connectors:e}=b.state,{customWallets:i,featuredWalletIds:n}=j.state,o=ve.getRecentWallets(),t=e.find($=>$.id==="walletConnect"),a=e.filter($=>$.type==="INJECTED"||$.type==="ANNOUNCED"||$.type==="MULTI_CHAIN").filter($=>$.name!=="Browser Wallet");if(!t)return null;if(n||i||!this.wallets.length)return this.style.cssText="display: none",null;const g=a.length+o.length,A=Math.max(0,2-g),I=ge.filterOutDuplicateWallets(this.wallets).slice(0,A);return I.length?l`
      <wui-flex flexDirection="column" gap="xs">
        ${I.map($=>l`
            <wui-list-wallet
              imageSrc=${u(W.getWalletImage($))}
              name=${($==null?void 0:$.name)??"Unknown"}
              @click=${()=>this.onConnectWallet($)}
              tabIdx=${u(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){if(this.loading)return;const i=b.getConnector(e.id,e.rdns);i?v.push("ConnectingExternal",{connector:i}):v.push("ConnectingWalletConnect",{wallet:e})}};$e([c()],Z.prototype,"tabIdx",void 0);$e([c()],Z.prototype,"wallets",void 0);$e([d()],Z.prototype,"loading",void 0);Z=$e([h("w3m-connect-recommended-widget")],Z);var We=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ee=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.state.connectors,this.connectorImages=Ne.state.connectorImages,this.unsubscribe.push(b.subscribeKey("connectors",e=>this.connectors=e),Ne.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(p.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find(n=>n.id==="walletConnect");if(!e)return this.style.cssText="display: none",null;const i=e.imageUrl||this.connectorImages[(e==null?void 0:e.imageId)??""];return l`
      <wui-list-wallet
        imageSrc=${u(i)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${u(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(e){b.setActiveConnector(e),v.push("ConnectingWalletConnect")}};We([c()],ee.prototype,"tabIdx",void 0);We([d()],ee.prototype,"connectors",void 0);We([d()],ee.prototype,"connectorImages",void 0);ee=We([h("w3m-connect-walletconnect-widget")],ee);const Ct=y`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var ie=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let q=class extends f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.state.connectors,this.recommended=m.state.recommended,this.featured=m.state.featured,this.unsubscribe.push(b.subscribeKey("connectors",e=>this.connectors=e),m.subscribeKey("recommended",e=>this.recommended=e),m.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:r,featured:a,external:g}=X.getConnectorsByType(this.connectors,this.recommended,this.featured);return X.getConnectorTypeOrder({custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:r,featured:a,external:g}).map(I=>{switch(I){case"injected":return l`
            ${t.length?l`<w3m-connect-multi-chain-widget
                  tabIdx=${u(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${n.length?l`<w3m-connect-announced-widget
                  tabIdx=${u(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?l`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${u(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return l`<w3m-connect-walletconnect-widget
            tabIdx=${u(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return l`<w3m-connect-recent-widget
            tabIdx=${u(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return l`<w3m-connect-featured-widget
            .wallets=${a}
            tabIdx=${u(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return l`<w3m-connect-custom-widget
            tabIdx=${u(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return l`<w3m-connect-external-widget
            tabIdx=${u(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return l`<w3m-connect-recommended-widget
            .wallets=${r}
            tabIdx=${u(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${I}`),null}})}};q.styles=Ct;ie([c()],q.prototype,"tabIdx",void 0);ie([d()],q.prototype,"connectors",void 0);ie([d()],q.prototype,"recommended",void 0);ie([d()],q.prototype,"featured",void 0);q=ie([h("w3m-connector-list")],q);const $t=y`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var _e=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let K=class extends f{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return l`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};K.styles=[E,M,$t];_e([c({type:Boolean})],K.prototype,"disabled",void 0);_e([c()],K.prototype,"label",void 0);_e([c()],K.prototype,"buttonLabel",void 0);K=_e([h("wui-cta-button")],K);const Wt=y`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var tt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let we=class extends f{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:i,play_store:n,chrome_store:o,homepage:t}=this.wallet,r=p.isMobile(),a=p.isIos(),g=p.isAndroid(),A=[i,n,t,o].filter(Boolean).length>1,I=P.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return A&&!r?l`
        <wui-cta-button
          label=${`Don't have ${I}?`}
          buttonLabel="Get"
          @click=${()=>v.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!A&&t?l`
        <wui-cta-button
          label=${`Don't have ${I}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:i&&a?l`
        <wui-cta-button
          label=${`Don't have ${I}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:n&&g?l`
        <wui-cta-button
          label=${`Don't have ${I}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&p.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&p.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&p.openHref(this.wallet.homepage,"_blank")}};we.styles=[Wt];tt([c({type:Object})],we.prototype,"wallet",void 0);we=tt([h("w3m-mobile-download-links")],we);const _t=y`
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

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
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
`;var L=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class C extends f{constructor(){var e,i,n,o,t;super(),this.wallet=(e=v.state.data)==null?void 0:e.wallet,this.connector=(i=v.state.data)==null?void 0:i.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=W.getWalletImage(this.wallet)??W.getConnectorImage(this.connector),this.name=((n=this.wallet)==null?void 0:n.name)??((o=this.connector)==null?void 0:o.name)??"Wallet",this.isRetrying=!1,this.uri=w.state.wcUri,this.error=w.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(w.subscribeKey("wcUri",r=>{var a;this.uri=r,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,(a=this.onConnect)==null||a.call(this))}),w.subscribeKey("wcError",r=>this.error=r)),(p.isTelegram()||p.isSafari())&&p.isIos()&&w.state.wcUri&&((t=this.onConnect)==null||t.call(this))}firstUpdated(){var e;(e=this.onAutoConnect)==null||e.call(this),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),w.setWcError(!1),clearTimeout(this.timeout)}render(){var n;(n=this.onRender)==null||n.call(this),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let i=`Continue in ${this.name}`;return this.error&&(i="Connection declined"),l`
      <wui-flex
        data-error=${u(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${u(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${i}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?l`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?l`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){var e;if(this.error&&!this.showRetry){this.showRetry=!0;const i=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button");i==null||i.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){var e,i;w.setWcError(!1),this.onRetry?(this.isRetrying=!0,(e=this.onRetry)==null||e.call(this)):(i=this.onConnect)==null||i.call(this)}loaderTemplate(){const e=Oe.state.themeVariables["--w3m-border-radius-master"],i=e?parseInt(e.replace("px",""),10):4;return l`<wui-loading-thumbnail radius=${i*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(p.copyToClopboard(this.uri),oe.showSuccess("Link copied"))}catch{oe.showError("Failed to copy")}}}C.styles=_t;L([d()],C.prototype,"isRetrying",void 0);L([d()],C.prototype,"uri",void 0);L([d()],C.prototype,"error",void 0);L([d()],C.prototype,"ready",void 0);L([d()],C.prototype,"showRetry",void 0);L([d()],C.prototype,"secondaryBtnLabel",void 0);L([d()],C.prototype,"secondaryLabel",void 0);L([d()],C.prototype,"isLoading",void 0);L([c({type:Boolean})],C.prototype,"isMobile",void 0);L([c()],C.prototype,"onRetry",void 0);var Be=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let me=class extends f{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return l`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(i=>i==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:i==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:i==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:i==="web"?{label:"Webapp",icon:"browser",platform:"web"}:i==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:i})=>i),e}onTabChange(e){var n;const i=this.platformTabs[e];i&&((n=this.onSelectPlatfrom)==null||n.call(this,i))}};Be([c({type:Array})],me.prototype,"platforms",void 0);Be([c()],me.prototype,"onSelectPlatfrom",void 0);me=Be([h("w3m-connecting-header")],me);var Rt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ze=class extends C{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),S.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){var e;try{this.error=!1;const{connectors:i}=b.state,n=i.find(o=>{var t,r,a;return o.type==="ANNOUNCED"&&((t=o.info)==null?void 0:t.rdns)===((r=this.wallet)==null?void 0:r.rdns)||o.type==="INJECTED"||o.name===((a=this.wallet)==null?void 0:a.name)});if(n)await w.connectExternal(n,n.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");He.close(),S.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:((e=this.wallet)==null?void 0:e.name)||"Unknown"}})}catch(i){S.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(i==null?void 0:i.message)??"Unknown"}}),this.error=!0}}};ze=Rt([h("w3m-connecting-wc-browser")],ze);var It=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ke=class extends C{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),S.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){var e;!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:i,name:n}=this.wallet,{redirect:o,href:t}=p.formatNativeUrl(i,this.uri);w.setWcLinking({name:n,href:t}),w.setRecentWallet(this.wallet),p.openHref(o,"_blank")}catch{this.error=!0}}};Ke=It([h("w3m-connecting-wc-desktop")],Ke);var G=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let N=class extends C{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=j.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{var e;if((e=this.wallet)!=null&&e.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:i,link_mode:n,name:o}=this.wallet,{redirect:t,redirectUniversalLink:r,href:a}=p.formatNativeUrl(i,this.uri,n);this.redirectDeeplink=t,this.redirectUniversalLink=r,this.target=p.isIframe()?"_top":"_self",w.setWcLinking({name:o,href:a}),w.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?p.openHref(this.redirectUniversalLink,this.target):p.openHref(this.redirectDeeplink,this.target)}catch(i){S.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:i instanceof Error?i.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=Fe.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(w.subscribeKey("wcUri",()=>{this.onHandleURI()})),S.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){var e;this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onTryAgain(){var e;w.setWcError(!1),(e=this.onConnect)==null||e.call(this)}};G([d()],N.prototype,"redirectDeeplink",void 0);G([d()],N.prototype,"redirectUniversalLink",void 0);G([d()],N.prototype,"target",void 0);G([d()],N.prototype,"preferUniversalLinks",void 0);G([d()],N.prototype,"isLoading",void 0);N=G([h("w3m-connecting-wc-mobile")],N);const Ot=y`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var jt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Se=class extends C{constructor(){var e;super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),S.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:((e=this.wallet)==null?void 0:e.name)??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.unsubscribe)==null||e.forEach(i=>i()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,i=this.wallet?this.wallet.name:void 0;return w.setWcLinking(void 0),w.setRecentWallet(this.wallet),l` <wui-qr-code
      size=${e}
      theme=${Oe.state.themeMode}
      uri=${this.uri}
      imageSrc=${u(W.getWalletImage(this.wallet))}
      color=${u(Oe.state.themeVariables["--w3m-qr-color"])}
      alt=${u(i)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return l`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};Se.styles=Ot;Se=jt([h("w3m-connecting-wc-qrcode")],Se);var St=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ve=class extends f{constructor(){var e;if(super(),this.wallet=(e=v.state.data)==null?void 0:e.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");S.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${u(W.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Ve=St([h("w3m-connecting-wc-unsupported")],Ve);var it=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Te=class extends C{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=Fe.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(w.subscribeKey("wcUri",()=>{this.updateLoadingState()})),S.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:i,name:n}=this.wallet,{redirect:o,href:t}=p.formatUniversalUrl(i,this.uri);w.setWcLinking({name:n,href:t}),w.setRecentWallet(this.wallet),p.openHref(o,"_blank")}catch{this.error=!0}}};it([d()],Te.prototype,"isLoading",void 0);Te=it([h("w3m-connecting-wc-web")],Te);var ne=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let V=class extends f{constructor(){var e;super(),this.wallet=(e=v.state.data)==null?void 0:e.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!j.state.siwx,this.remoteFeatures=j.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(j.subscribeKey("remoteFeatures",i=>this.remoteFeatures=i))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return l`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){var e;return(e=this.remoteFeatures)!=null&&e.reownBranding?l`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if(!(this.platform==="browser"||j.state.manualWCControl&&!e))try{const{wcPairingExpiry:i,status:n}=w.state;(e||j.state.enableEmbedded||p.isPairingExpired(i)||n==="connecting")&&(await w.connectWalletConnect(),this.isSiwxEnabled||He.close())}catch(i){S.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(i==null?void 0:i.message)??"Unknown"}}),w.setWcError(!0),oe.showError(i.message??"Connection error"),w.resetWcConnection(),v.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:e,desktop_link:i,webapp_link:n,injected:o,rdns:t}=this.wallet,r=o==null?void 0:o.map(({injected_id:rt})=>rt).filter(Boolean),a=[...t?[t]:r??[]],g=j.state.isUniversalProvider?!1:a.length,A=e,I=n,$=w.checkInstalled(a),qe=g&&$,ot=i&&!p.isMobile();qe&&!Ie.state.noAdapters&&this.platforms.push("browser"),A&&this.platforms.push(p.isMobile()?"mobile":"qrcode"),I&&this.platforms.push("web"),ot&&this.platforms.push("desktop"),!qe&&g&&!Ie.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return l`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return l`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return l`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return l`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return l`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return l`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?l`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){var n;const i=(n=this.shadowRoot)==null?void 0:n.querySelector("div");i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};ne([d()],V.prototype,"platform",void 0);ne([d()],V.prototype,"platforms",void 0);ne([d()],V.prototype,"isSiwxEnabled",void 0);ne([d()],V.prototype,"remoteFeatures",void 0);V=ne([h("w3m-connecting-wc-view")],V);var nt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let be=class extends f{constructor(){super(...arguments),this.isMobile=p.isMobile()}render(){if(this.isMobile){const{featured:e,recommended:i}=m.state,{customWallets:n}=j.state,o=ve.getRecentWallets(),t=e.length||i.length||(n==null?void 0:n.length)||o.length;return l`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${t?l`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return l`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};nt([d()],be.prototype,"isMobile",void 0);be=nt([h("w3m-connecting-wc-basic-view")],be);var Tt=function(s,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,n);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ee=class extends f{constructor(){var e;super(...arguments),this.wallet=(e=v.state.data)==null?void 0:e.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return l`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){var e;return(e=this.wallet)!=null&&e.chrome_store?l`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){var e;return(e=this.wallet)!=null&&e.app_store?l`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){var e;return(e=this.wallet)!=null&&e.play_store?l`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){var e;return(e=this.wallet)!=null&&e.homepage?l`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){var e;(e=this.wallet)!=null&&e.chrome_store&&p.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&p.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&p.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&p.openHref(this.wallet.homepage,"_blank")}};Ee=Tt([h("w3m-downloads-view")],Ee);const Si=Object.freeze(Object.defineProperty({__proto__:null,get W3mAllWalletsView(){return Q},get W3mConnectingWcBasicView(){return be},get W3mDownloadsView(){return Ee}},Symbol.toStringTag,{value:"Module"}));export{C as W,Q as a,be as b,V as c,Ee as d,Si as e};
