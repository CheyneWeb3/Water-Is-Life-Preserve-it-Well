import{i as g,r as w,e as y,a as v,b as h,w as f}from"./index-DYV5x_W9.js";import{n as l,c as m}from"./if-defined-DCVUMdR3.js";import{n as b}from"./index-BkK4-hv8.js";import"./index-DECD60AZ.js";const x=g`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 100%;
    background-color: var(--wui-color-accent-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-accent-glass-010);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  wui-tooltip {
    padding: 7px var(--wui-spacing-s) 8px var(--wui-spacing-s);
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0;
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }
  }
`;var p=function(i,t,o,r){var n=arguments.length,e=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(i,t,o,r);else for(var c=i.length-1;c>=0;c--)(a=i[c])&&(e=(n<3?a(e):n>3?a(t,o,e):a(t,o))||e);return n>3&&e&&Object.defineProperty(t,o,e),e};let d=class extends v{constructor(){super(...arguments),this.text="",this.icon="card"}render(){return h`<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`}};d.styles=[w,y,x];p([l()],d.prototype,"text",void 0);p([l()],d.prototype,"icon",void 0);d=p([m("wui-icon-button")],d);const z=f`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`,k=f`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`,S=g`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: var(--wui-color-gray-glass-002);
    border-radius: 100%;
    outline: 1px solid var(--wui-color-gray-glass-005);
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    fill: var(--wui-color-gray-glass-002);
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: var(--wui-color-gray-glass-002);
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`;var u=function(i,t,o,r){var n=arguments.length,e=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(i,t,o,r);else for(var c=i.length-1;c>=0;c--)(a=i[c])&&(e=(n<3?a(e):n>3?a(t,o,e):a(t,o))||e);return n>3&&e&&Object.defineProperty(t,o,e),e};let s=class extends v{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:k,md:b,lg:z},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText=`
      --local-width: var(--wui-spacing-3xl);
      --local-height: var(--wui-spacing-3xl);
      --local-icon-size: var(--wui-spacing-l);
    `):this.style.cssText=`

      --local-path: var(--wui-path-network-${this.size});
      --local-width:  var(--wui-width-network-${this.size});
      --local-height:  var(--wui-height-network-${this.size});
      --local-icon-size:  var(--wui-icon-size-network-${this.size});
    `,h`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?h`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:h`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};s.styles=[w,S];u([l()],s.prototype,"size",void 0);u([l()],s.prototype,"name",void 0);u([l({type:Object})],s.prototype,"networkImagesBySize",void 0);u([l()],s.prototype,"imageSrc",void 0);u([l({type:Boolean})],s.prototype,"selected",void 0);u([l({type:Boolean})],s.prototype,"round",void 0);s=u([m("wui-network-image")],s);
