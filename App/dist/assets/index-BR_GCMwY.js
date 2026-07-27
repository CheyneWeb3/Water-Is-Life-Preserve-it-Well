import{i as c,r as u,e as f,a as x,b as w}from"./index-DYV5x_W9.js";import{c as d}from"./if-defined-DCVUMdR3.js";import{R as m}from"./ConstantsUtil-Dmg8YACJ.js";const p=c`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`;var y=function(r,t,n,o){var i=arguments.length,e=i<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,n):o,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(r,t,n,o);else for(var a=r.length-1;a>=0;a--)(l=r[a])&&(e=(i<3?l(e):i>3?l(t,n,e):l(t,n))||e);return i>3&&e&&Object.defineProperty(t,n,e),e};let s=class extends x{render(){return w`
      <a
        data-testid="ux-branding-reown"
        href=${m}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${["0","0","l","0"]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};s.styles=[u,f,p];s=y([d("wui-ux-by-reown")],s);
