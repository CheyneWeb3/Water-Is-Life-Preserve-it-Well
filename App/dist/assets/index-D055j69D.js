import{v as k,x as C,y as $,i as f,r as T,a as g,b as l,O as s}from"./index-Cj55t8Xw.js";import{n as O,c as w,o as P,r as m}from"./if-defined-Czu2zLbO.js";import{e as _,n as j}from"./ref-BQ_gIewY.js";import"./index-BqoH6h8g.js";const u=$({isLegalCheckboxChecked:!1}),b={state:u,subscribe(n){return C(u,()=>n(u))},subscribeKey(n,e){return k(u,n,e)},setIsLegalCheckboxChecked(n){u.isLegalCheckboxChecked=n}},R=f`
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    column-gap: var(--wui-spacing-1xs);
  }

  label > input[type='checkbox'] {
    height: 0;
    width: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }

  label > span {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
    min-width: var(--wui-spacing-xl);
    min-height: var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-3xs);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-010);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  label > span:hover,
  label > input[type='checkbox']:focus-visible + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  label input[type='checkbox']:checked + span {
    background-color: var(--wui-color-blue-base-90);
  }

  label > span > wui-icon {
    opacity: 0;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: opacity;
  }

  label > input[type='checkbox']:checked + span wui-icon {
    opacity: 1;
  }
`;var y=function(n,e,r,o){var i=arguments.length,t=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,r,o);else for(var a=n.length-1;a>=0;a--)(c=n[a])&&(t=(i<3?c(t):i>3?c(e,r,t):c(e,r))||t);return i>3&&t&&Object.defineProperty(e,r,t),t};let h=class extends g{constructor(){super(...arguments),this.inputElementRef=_(),this.checked=void 0}render(){return l`
      <label>
        <input
          ${j(this.inputElementRef)}
          ?checked=${P(this.checked)}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" color="inverse-100" size="xxs"></wui-icon>
        </span>
        <slot></slot>
      </label>
    `}dispatchChangeEvent(){var e;this.dispatchEvent(new CustomEvent("checkboxChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.checked,bubbles:!0,composed:!0}))}};h.styles=[T,R];y([O({type:Boolean})],h.prototype,"checked",void 0);h=y([w("wui-checkbox")],h);const U=f`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  wui-checkbox {
    padding: var(--wui-spacing-s);
  }
  a {
    text-decoration: none;
    color: var(--wui-color-fg-150);
    font-weight: 500;
  }
`;var x=function(n,e,r,o){var i=arguments.length,t=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,r,o);else for(var a=n.length-1;a>=0;a--)(c=n[a])&&(t=(i<3?c(t):i>3?c(e,r,t):c(e,r))||t);return i>3&&t&&Object.defineProperty(e,r,t),t};let p=class extends g{constructor(){super(),this.unsubscribe=[],this.checked=b.state.isLegalCheckboxChecked,this.unsubscribe.push(b.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var i;const{termsConditionsUrl:e,privacyPolicyUrl:r}=s.state,o=(i=s.state.features)==null?void 0:i.legalCheckbox;return!e&&!r||!o?null:l`
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="fg-250" variant="small-400" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `}andTemplate(){const{termsConditionsUrl:e,privacyPolicyUrl:r}=s.state;return e&&r?"and":""}termsTemplate(){const{termsConditionsUrl:e}=s.state;return e?l`<a rel="noreferrer" target="_blank" href=${e}>terms of service</a>`:null}privacyTemplate(){const{privacyPolicyUrl:e}=s.state;return e?l`<a rel="noreferrer" target="_blank" href=${e}>privacy policy</a>`:null}onCheckboxChange(){b.setIsLegalCheckboxChecked(!this.checked)}};p.styles=[U];x([m()],p.prototype,"checked",void 0);p=x([w("w3m-legal-checkbox")],p);const B=f`
  :host > wui-flex {
    background-color: var(--wui-color-gray-glass-005);
  }

  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: var(--wui-spacing-m);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
  }
`;var v=function(n,e,r,o){var i=arguments.length,t=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,r,o);else for(var a=n.length-1;a>=0;a--)(c=n[a])&&(t=(i<3?c(t):i>3?c(e,r,t):c(e,r))||t);return i>3&&t&&Object.defineProperty(e,r,t),t};let d=class extends g{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=s.state.remoteFeatures,this.unsubscribe.push(s.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var t;const{termsConditionsUrl:e,privacyPolicyUrl:r}=s.state,o=(t=s.state.features)==null?void 0:t.legalCheckbox;return!e&&!r||o?l`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `:l`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["m","s","s","s"]} justifyContent="center">
          <wui-text color="fg-250" variant="small-400" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `}andTemplate(){const{termsConditionsUrl:e,privacyPolicyUrl:r}=s.state;return e&&r?"and":""}termsTemplate(){const{termsConditionsUrl:e}=s.state;return e?l`<a href=${e}>Terms of Service</a>`:null}privacyTemplate(){const{privacyPolicyUrl:e}=s.state;return e?l`<a href=${e}>Privacy Policy</a>`:null}reownBrandingTemplate(e=!1){var r;return(r=this.remoteFeatures)!=null&&r.reownBranding?e?l`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:l`<wui-ux-by-reown></wui-ux-by-reown>`:null}};d.styles=[B];v([m()],d.prototype,"remoteFeatures",void 0);d=v([w("w3m-legal-footer")],d);export{b as O};
