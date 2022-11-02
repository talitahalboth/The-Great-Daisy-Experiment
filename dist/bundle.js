(()=>{var t={222:t=>{class e{constructor(t="",e="",i=0,r=10){this.setColorGradient=(i,r)=>{t=o(i),e=o(r)},this.setMidpoint=(t,e)=>{i=t,r=e},this.getColor=i=>{if(i)return"#"+n(i,t.substring(0,2),e.substring(0,2))+n(i,t.substring(2,4),e.substring(2,4))+n(i,t.substring(4,6),e.substring(4,6))};const n=(t,e,n)=>{t<i?t=i:t>r&&(t=r);const o=r-i,s=parseInt(e,16),a=(parseInt(n,16)-s)/o,h=Math.round(a*(t-i)+s);return h<16?"0"+h.toString(16):h.toString(16)},o=t=>t.substring(t.length-6,t.length)}}t.exports=class{constructor(t="",i=10,r=["",""],n=[]){const o=o=>{if(o.length<2)throw new Error(`setColorGradient should have more than ${o.length} color`);{const s=i/(o.length-1),a=new e,h=0,l=0+s;a.setColorGradient(o[0],o[1]),a.setMidpoint(h,l),t=[a],n=[{lower:h,upper:l}];for(let i=1;i<o.length-1;i++){const r=new e,a=0+s*i,h=0+s*(i+1);r.setColorGradient(o[i],o[i+1]),r.setMidpoint(a,h),t[i]=r,n[i]={lower:a,upper:h}}r=o}};this.setColorGradient=(...t)=>(o(t),this),this.getColors=()=>{const e=[];for(let r=0;r<n.length;r++){const o=n[r],s=0===o.lower?1:Math.ceil(o.lower),a=o.upper===i?o.upper+1:Math.ceil(o.upper);for(let i=s;i<a;i++)e.push(t[r].getColor(i))}return e},this.getColor=e=>{if(isNaN(e))throw new TypeError("getColor should be a number");if(e<=0)throw new TypeError(`getColor should be greater than ${e}`);{const r=e+1,n=(i-0)/t.length,o=Math.min(Math.floor((Math.max(e,0)-0)/n),t.length-1);return t[o].getColor(r)}},this.setMidpoint=t=>{if(isNaN(t)||!(t>=0))throw t<=0?new RangeError(`midPoint should be greater than ${t}`):new RangeError("midPoint should be a number");return i=t,o(r),this}}}}},e={};function i(r){var n=e[r];if(void 0!==n)return n.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,i),o.exports}i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=["#fdd647","#fceeb5"],e=["#c4dfb9","#e8d3b8","#fdfe78"],r="#ffffff";function n(t,e,i){var r,n,o=i.fov,s=i.viewDist,a=i.w,h=i.h;r=i.angle*Math.PI/180;var l=s*(e-h)/(Math.cos(r)*o+(n=Math.sin(r))*(h-e));return[(t-a)/(o/(s+l*n)),l]}function o(t,e,i){var r,n,o,s=i.fov,a=i.viewDist,h=i.w,l=i.h;return r=i.angle*Math.PI/180,n=Math.cos(r),[t*(o=s/(a+e*Math.sin(r)))+h,e*n*o+l]}var s,a,h,l,c,u=function(){return u=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},u.apply(this,arguments)},p=function(t,e,i,r){var n=o(t,e,i),s=o(t+1,e,i),a=Math.abs(s[0]-n[0]);return{x:n[0],y:n[1],w:-a,h:-a*r}},d=function(){function t(t,e,i,r,o,s){this.img=r;var a=r.height/r.width;this.iniX=t,this.iniY=e;var h=j(t,e,k,o),l=n(t,e,u(u({},s),{viewDist:i}));this.properties=p(l[0],l[1],u(u({},s),{viewDist:i}),a);var c=n(t,h,u(u({},s),{viewDist:i})),d=p(c[0],c[1],u(u({},s),{viewDist:i}),a);this.properties.h=Math.abs(d.h),this.properties.w=Math.abs(d.w)}return t.prototype.changeProperties=function(t){var e=n(this.iniX,this.iniY,t),i=p(e[0],e[1],t,this.img.height/this.img.width);this.properties=i},t.prototype.draw=function(t){t.beginPath(),t.drawImage(this.img,Math.floor(this.properties.x-this.properties.w/2),Math.floor(this.properties.y-this.properties.h/1.5),Math.floor(this.properties.w),Math.floor(this.properties.h)),t.closePath()},t}(),g=function(){function t(){this.areasSum=0}return t.prototype.updateAreasSum=function(t){this.areasSum=t.reduce((function(t,e){return t+e.areaProportionalToHeight}),0)},t.prototype.updateyCoordinates=function(t,e){this.yCoordinates=t.map((function(t){return t.rangeCombined.pos[e]+t.height}))},t.prototype.getHillIndex=function(t,e){for(var i=0,r=e[0].areaProportionalToHeight,n=1;n<e.length;n++)t>r&&i++,r+=e[n].areaProportionalToHeight;return i},t.prototype.createDaisyAtIndex=function(t,e,i,r){var n=i[i.length-1].offsetHeight,o={x:e,y:W(i[t].lowestYAxis-10,t-1>=0?i[t-1].highestYAxis:T+n+10)};if(o.y>this.yCoordinates[t]){var s=D(o.x,o.y,k,i[t].slopeAngle),a=new d(o.x,s,t*N+I,r,i[t].slopeAngle,O);z(i[t].daisies,a)}},t}();function f(t,e){var i,r=Object.keys(e);for(i=0;i<r.length;i++)t=t.replace(new RegExp("\\{"+r[i]+"\\}","gi"),e[r[i]]);return t}function _(t){var e,i,r;if(!t)throw new Error("cannot create a random attribute name for an undefined object");e="ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",i="";do{for(i="",r=0;r<12;r++)i+=e[Math.floor(Math.random()*e.length)]}while(t[i]);return i}function m(t){var e={alphabetic:"alphabetic",hanging:"hanging",top:"text-before-edge",bottom:"text-after-edge",middle:"central"};return e[t]||e.alphabetic}c=function(t,e){var i,r,n,o={};for(t=t.split(","),e=e||10,i=0;i<t.length;i+=2)r="&"+t[i+1]+";",n=parseInt(t[i],e),o[r]="&#"+n+";";return o["\\xa0"]="&#160;",o}("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32),s={strokeStyle:{svgAttr:"stroke",canvas:"#000000",svg:"none",apply:"stroke"},fillStyle:{svgAttr:"fill",canvas:"#000000",svg:null,apply:"fill"},lineCap:{svgAttr:"stroke-linecap",canvas:"butt",svg:"butt",apply:"stroke"},lineJoin:{svgAttr:"stroke-linejoin",canvas:"miter",svg:"miter",apply:"stroke"},miterLimit:{svgAttr:"stroke-miterlimit",canvas:10,svg:4,apply:"stroke"},lineWidth:{svgAttr:"stroke-width",canvas:1,svg:1,apply:"stroke"},globalAlpha:{svgAttr:"opacity",canvas:1,svg:1,apply:"fill stroke"},font:{canvas:"10px sans-serif"},shadowColor:{canvas:"#000000"},shadowOffsetX:{canvas:0},shadowOffsetY:{canvas:0},shadowBlur:{canvas:0},textAlign:{canvas:"start"},textBaseline:{canvas:"alphabetic"},lineDash:{svgAttr:"stroke-dasharray",canvas:[],svg:null,apply:"stroke"}},h=function(t,e){this.__root=t,this.__ctx=e},h.prototype.addColorStop=function(t,e){var i,r=this.__ctx.__createElement("stop");r.setAttribute("offset",t),-1!==e.indexOf("rgba")?(i=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi.exec(e),r.setAttribute("stop-color",f("rgb({r},{g},{b})",{r:i[1],g:i[2],b:i[3]})),r.setAttribute("stop-opacity",i[4])):r.setAttribute("stop-color",e),this.__root.appendChild(r)},l=function(t,e){this.__root=t,this.__ctx=e},(a=function(t){var e,i={width:500,height:500,enableMirroring:!1};if(arguments.length>1?((e=i).width=arguments[0],e.height=arguments[1]):e=t||i,!(this instanceof a))return new a(e);this.width=e.width||i.width,this.height=e.height||i.height,this.enableMirroring=void 0!==e.enableMirroring?e.enableMirroring:i.enableMirroring,this.canvas=this,this.__document=e.document||document,e.ctx?this.__ctx=e.ctx:(this.__canvas=this.__document.createElement("canvas"),this.__ctx=this.__canvas.getContext("2d")),this.__setDefaultStyles(),this.__stack=[this.__getStyleState()],this.__groupStack=[],this.__root=this.__document.createElementNS("http://www.w3.org/2000/svg","svg"),this.__root.setAttribute("version",1.1),this.__root.setAttribute("xmlns","http://www.w3.org/2000/svg"),this.__root.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),this.__root.setAttribute("width",this.width),this.__root.setAttribute("height",this.height),this.__ids={},this.__defs=this.__document.createElementNS("http://www.w3.org/2000/svg","defs"),this.__root.appendChild(this.__defs),this.__currentElement=this.__document.createElementNS("http://www.w3.org/2000/svg","g"),this.__root.appendChild(this.__currentElement)}).prototype.__createElement=function(t,e,i){void 0===e&&(e={});var r,n,o=this.__document.createElementNS("http://www.w3.org/2000/svg",t),s=Object.keys(e);for(i&&(o.setAttribute("fill","none"),o.setAttribute("stroke","none")),r=0;r<s.length;r++)n=s[r],o.setAttribute(n,e[n]);return o},a.prototype.__setDefaultStyles=function(){var t,e,i=Object.keys(s);for(t=0;t<i.length;t++)this[e=i[t]]=s[e].canvas},a.prototype.__applyStyleState=function(t){var e,i,r=Object.keys(t);for(e=0;e<r.length;e++)this[i=r[e]]=t[i]},a.prototype.__getStyleState=function(){var t,e,i={},r=Object.keys(s);for(t=0;t<r.length;t++)i[e=r[t]]=this[e];return i},a.prototype.__applyStyleToCurrentElement=function(t){var e=this.__currentElement,i=this.__currentElementsToStyle;i&&(e.setAttribute(t,""),e=i.element,i.children.forEach((function(e){e.setAttribute(t,"")})));var r,n,o,a,c,u=Object.keys(s);for(r=0;r<u.length;r++)if(n=s[u[r]],o=this[u[r]],n.apply)if(o instanceof l){if(o.__ctx)for(;o.__ctx.__defs.childNodes.length;)a=o.__ctx.__defs.childNodes[0].getAttribute("id"),this.__ids[a]=a,this.__defs.appendChild(o.__ctx.__defs.childNodes[0]);e.setAttribute(n.apply,f("url(#{id})",{id:o.__root.getAttribute("id")}))}else if(o instanceof h)e.setAttribute(n.apply,f("url(#{id})",{id:o.__root.getAttribute("id")}));else if(-1!==n.apply.indexOf(t)&&n.svg!==o)if("stroke"!==n.svgAttr&&"fill"!==n.svgAttr||-1===o.indexOf("rgba")){var p=n.svgAttr;if("globalAlpha"===u[r]&&(p=t+"-"+n.svgAttr,e.getAttribute(p)))continue;e.setAttribute(p,o)}else{c=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi.exec(o),e.setAttribute(n.svgAttr,f("rgb({r},{g},{b})",{r:c[1],g:c[2],b:c[3]}));var d=c[4],g=this.globalAlpha;null!=g&&(d*=g),e.setAttribute(n.svgAttr+"-opacity",d)}},a.prototype.__closestGroupOrSvg=function(t){return"g"===(t=t||this.__currentElement).nodeName||"svg"===t.nodeName?t:this.__closestGroupOrSvg(t.parentNode)},a.prototype.getSerializedSvg=function(t){var e,i,r,n,o,s=(new XMLSerializer).serializeToString(this.__root);if(/xmlns="http:\/\/www\.w3\.org\/2000\/svg".+xmlns="http:\/\/www\.w3\.org\/2000\/svg/gi.test(s)&&(s=s.replace('xmlns="http://www.w3.org/2000/svg','xmlns:xlink="http://www.w3.org/1999/xlink')),t)for(e=Object.keys(c),i=0;i<e.length;i++)r=e[i],n=c[r],(o=new RegExp(r,"gi")).test(s)&&(s=s.replace(o,n));return s},a.prototype.getSvg=function(){return this.__root},a.prototype.save=function(){var t=this.__createElement("g"),e=this.__closestGroupOrSvg();this.__groupStack.push(e),e.appendChild(t),this.__currentElement=t,this.__stack.push(this.__getStyleState())},a.prototype.restore=function(){this.__currentElement=this.__groupStack.pop(),this.__currentElementsToStyle=null,this.__currentElement||(this.__currentElement=this.__root.childNodes[1]);var t=this.__stack.pop();this.__applyStyleState(t)},a.prototype.__addTransform=function(t){var e=this.__closestGroupOrSvg();if(e.childNodes.length>0){"path"===this.__currentElement.nodeName&&(this.__currentElementsToStyle||(this.__currentElementsToStyle={element:e,children:[]}),this.__currentElementsToStyle.children.push(this.__currentElement),this.__applyCurrentDefaultPath());var i=this.__createElement("g");e.appendChild(i),this.__currentElement=i}var r=this.__currentElement.getAttribute("transform");r?r+=" ":r="",r+=t,this.__currentElement.setAttribute("transform",r)},a.prototype.scale=function(t,e){void 0===e&&(e=t),this.__addTransform(f("scale({x},{y})",{x:t,y:e}))},a.prototype.rotate=function(t){var e=180*t/Math.PI;this.__addTransform(f("rotate({angle},{cx},{cy})",{angle:e,cx:0,cy:0}))},a.prototype.translate=function(t,e){this.__addTransform(f("translate({x},{y})",{x:t,y:e}))},a.prototype.transform=function(t,e,i,r,n,o){this.__addTransform(f("matrix({a},{b},{c},{d},{e},{f})",{a:t,b:e,c:i,d:r,e:n,f:o}))},a.prototype.beginPath=function(){var t;this.__currentDefaultPath="",this.__currentPosition={},t=this.__createElement("path",{},!0),this.__closestGroupOrSvg().appendChild(t),this.__currentElement=t},a.prototype.__applyCurrentDefaultPath=function(){var t=this.__currentElement;"path"===t.nodeName?t.setAttribute("d",this.__currentDefaultPath):console.error("Attempted to apply path command to node",t.nodeName)},a.prototype.__addPathCommand=function(t){this.__currentDefaultPath+=" ",this.__currentDefaultPath+=t},a.prototype.moveTo=function(t,e){"path"!==this.__currentElement.nodeName&&this.beginPath(),this.__currentPosition={x:t,y:e},this.__addPathCommand(f("M {x} {y}",{x:t,y:e}))},a.prototype.closePath=function(){this.__currentDefaultPath&&this.__addPathCommand("Z")},a.prototype.lineTo=function(t,e){this.__currentPosition={x:t,y:e},this.__currentDefaultPath.indexOf("M")>-1?this.__addPathCommand(f("L {x} {y}",{x:t,y:e})):this.__addPathCommand(f("M {x} {y}",{x:t,y:e}))},a.prototype.bezierCurveTo=function(t,e,i,r,n,o){this.__currentPosition={x:n,y:o},this.__addPathCommand(f("C {cp1x} {cp1y} {cp2x} {cp2y} {x} {y}",{cp1x:t,cp1y:e,cp2x:i,cp2y:r,x:n,y:o}))},a.prototype.quadraticCurveTo=function(t,e,i,r){this.__currentPosition={x:i,y:r},this.__addPathCommand(f("Q {cpx} {cpy} {x} {y}",{cpx:t,cpy:e,x:i,y:r}))};var v=function(t){var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]);return[t[0]/e,t[1]/e]};a.prototype.arcTo=function(t,e,i,r,n){var o=this.__currentPosition&&this.__currentPosition.x,s=this.__currentPosition&&this.__currentPosition.y;if(void 0!==o&&void 0!==s){if(n<0)throw new Error("IndexSizeError: The radius provided ("+n+") is negative.");if(o===t&&s===e||t===i&&e===r||0===n)this.lineTo(t,e);else{var a=v([o-t,s-e]),h=v([i-t,r-e]);if(a[0]*h[1]!=a[1]*h[0]){var l=a[0]*h[0]+a[1]*h[1],c=Math.acos(Math.abs(l)),u=v([a[0]+h[0],a[1]+h[1]]),p=n/Math.sin(c/2),d=t+p*u[0],g=e+p*u[1],f=[-a[1],a[0]],_=[h[1],-h[0]],m=function(t){var e=t[0];return t[1]>=0?Math.acos(e):-Math.acos(e)},w=m(f),y=m(_);this.lineTo(d+f[0]*n,g+f[1]*n),this.arc(d,g,n,w,y)}else this.lineTo(t,e)}}},a.prototype.stroke=function(){"path"===this.__currentElement.nodeName&&this.__currentElement.setAttribute("paint-order","fill stroke markers"),this.__applyCurrentDefaultPath(),this.__applyStyleToCurrentElement("stroke")},a.prototype.fill=function(){"path"===this.__currentElement.nodeName&&this.__currentElement.setAttribute("paint-order","stroke fill markers"),this.__applyCurrentDefaultPath(),this.__applyStyleToCurrentElement("fill")},a.prototype.rect=function(t,e,i,r){"path"!==this.__currentElement.nodeName&&this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+r),this.lineTo(t,e+r),this.lineTo(t,e),this.closePath()},a.prototype.fillRect=function(t,e,i,r){var n;n=this.__createElement("rect",{x:t,y:e,width:i,height:r},!0),this.__closestGroupOrSvg().appendChild(n),this.__currentElement=n,this.__applyStyleToCurrentElement("fill")},a.prototype.strokeRect=function(t,e,i,r){var n;n=this.__createElement("rect",{x:t,y:e,width:i,height:r},!0),this.__closestGroupOrSvg().appendChild(n),this.__currentElement=n,this.__applyStyleToCurrentElement("stroke")},a.prototype.__clearCanvas=function(){for(var t=this.__closestGroupOrSvg().getAttribute("transform"),e=this.__root.childNodes[1],i=e.childNodes,r=i.length-1;r>=0;r--)i[r]&&e.removeChild(i[r]);this.__currentElement=e,this.__groupStack=[],t&&this.__addTransform(t)},a.prototype.clearRect=function(t,e,i,r){if(0!==t||0!==e||i!==this.width||r!==this.height){var n,o=this.__closestGroupOrSvg();n=this.__createElement("rect",{x:t,y:e,width:i,height:r,fill:"#FFFFFF"},!0),o.appendChild(n)}else this.__clearCanvas()},a.prototype.createLinearGradient=function(t,e,i,r){var n=this.__createElement("linearGradient",{id:_(this.__ids),x1:t+"px",x2:i+"px",y1:e+"px",y2:r+"px",gradientUnits:"userSpaceOnUse"},!1);return this.__defs.appendChild(n),new h(n,this)},a.prototype.createRadialGradient=function(t,e,i,r,n,o){var s=this.__createElement("radialGradient",{id:_(this.__ids),cx:r+"px",cy:n+"px",r:o+"px",fx:t+"px",fy:e+"px",gradientUnits:"userSpaceOnUse"},!1);return this.__defs.appendChild(s),new h(s,this)},a.prototype.__parseFont=function(){var t=/^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z0-9]+?)\s*$/i.exec(this.font),e={style:t[1]||"normal",size:t[4]||"10px",family:t[6]||"sans-serif",weight:t[3]||"normal",decoration:t[2]||"normal",href:null};return"underline"===this.__fontUnderline&&(e.decoration="underline"),this.__fontHref&&(e.href=this.__fontHref),e},a.prototype.__wrapTextLink=function(t,e){if(t.href){var i=this.__createElement("a");return i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t.href),i.appendChild(e),i}return e},a.prototype.__applyText=function(t,e,i,r){var n,o,s=this.__parseFont(),a=this.__closestGroupOrSvg(),h=this.__createElement("text",{"font-family":s.family,"font-size":s.size,"font-style":s.style,"font-weight":s.weight,"text-decoration":s.decoration,x:e,y:i,"text-anchor":(n=this.textAlign,o={left:"start",right:"end",center:"middle",start:"start",end:"end"},o[n]||o.start),"dominant-baseline":m(this.textBaseline)},!0);h.appendChild(this.__document.createTextNode(t)),this.__currentElement=h,this.__applyStyleToCurrentElement(r),a.appendChild(this.__wrapTextLink(s,h))},a.prototype.fillText=function(t,e,i){this.__applyText(t,e,i,"fill")},a.prototype.strokeText=function(t,e,i){this.__applyText(t,e,i,"stroke")},a.prototype.measureText=function(t){return this.__ctx.font=this.font,this.__ctx.measureText(t)},a.prototype.arc=function(t,e,i,r,n,o){if(r!==n){(r%=2*Math.PI)==(n%=2*Math.PI)&&(n=(n+2*Math.PI-.001*(o?-1:1))%(2*Math.PI));var s,a=t+i*Math.cos(n),h=e+i*Math.sin(n),l=t+i*Math.cos(r),c=e+i*Math.sin(r),u=o?0:1,p=n-r;p<0&&(p+=2*Math.PI),s=o?p>Math.PI?0:1:p>Math.PI?1:0,this.lineTo(l,c),this.__addPathCommand(f("A {rx} {ry} {xAxisRotation} {largeArcFlag} {sweepFlag} {endX} {endY}",{rx:i,ry:i,xAxisRotation:0,largeArcFlag:s,sweepFlag:u,endX:a,endY:h})),this.__currentPosition={x:a,y:h}}},a.prototype.clip=function(){var t=this.__closestGroupOrSvg(),e=this.__createElement("clipPath"),i=_(this.__ids),r=this.__createElement("g");this.__applyCurrentDefaultPath(),t.removeChild(this.__currentElement),e.setAttribute("id",i),e.appendChild(this.__currentElement),this.__defs.appendChild(e),t.setAttribute("clip-path",f("url(#{id})",{id:i})),t.appendChild(r),this.__currentElement=r},a.prototype.drawImage=function(){var t,e,i,r,n,o,s,h,l,c,u,p,d,g,f=Array.prototype.slice.call(arguments),_=f[0],m=0,v=0;if(3===f.length)t=f[1],e=f[2],i=n=_.width,r=o=_.height;else if(5===f.length)t=f[1],e=f[2],i=f[3],r=f[4],n=_.width,o=_.height;else{if(9!==f.length)throw new Error("Inavlid number of arguments passed to drawImage: "+arguments.length);m=f[1],v=f[2],n=f[3],o=f[4],t=f[5],e=f[6],i=f[7],r=f[8]}s=this.__closestGroupOrSvg(),this.__currentElement;var w="translate("+t+", "+e+")";if(_ instanceof a){if((h=_.getSvg().cloneNode(!0)).childNodes&&h.childNodes.length>1){for(l=h.childNodes[0];l.childNodes.length;)g=l.childNodes[0].getAttribute("id"),this.__ids[g]=g,this.__defs.appendChild(l.childNodes[0]);if(c=h.childNodes[1]){var y,x=c.getAttribute("transform");y=x?x+" "+w:w,c.setAttribute("transform",y),s.appendChild(c)}}}else"IMG"===_.nodeName?((u=this.__createElement("image")).setAttribute("width",i),u.setAttribute("height",r),u.setAttribute("preserveAspectRatio","none"),(m||v||n!==_.width||o!==_.height)&&((p=this.__document.createElement("canvas")).width=i,p.height=r,(d=p.getContext("2d")).drawImage(_,m,v,n,o,0,0,i,r),_=p),u.setAttribute("transform",w),u.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","CANVAS"===_.nodeName?_.toDataURL():_.getAttribute("src")),s.appendChild(u)):"CANVAS"===_.nodeName&&((u=this.__createElement("image")).setAttribute("width",i),u.setAttribute("height",r),u.setAttribute("preserveAspectRatio","none"),(p=this.__document.createElement("canvas")).width=i,p.height=r,(d=p.getContext("2d")).imageSmoothingEnabled=!1,d.mozImageSmoothingEnabled=!1,d.oImageSmoothingEnabled=!1,d.webkitImageSmoothingEnabled=!1,d.drawImage(_,m,v,n,o,0,0,i,r),_=p,u.setAttribute("transform",w),u.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",_.toDataURL()),s.appendChild(u))},a.prototype.drawImageSvg=function(){var t,e,i,r,n,o,s,a,h=Array.prototype.slice.call(arguments),l=h[0];if(3===h.length)t=h[1],e=h[2],i=l.width,r=l.height;else if(5===h.length)t=h[1],e=h[2],i=h[3],r=h[4],l.width,l.height;else{if(9!==h.length)throw new Error("Inavlid number of arguments passed to drawImage: "+arguments.length);h[1],h[2],h[3],h[4],t=h[5],e=h[6],i=h[7],r=h[8]}n=this.__closestGroupOrSvg(),this.__currentElement;var c="translate("+t+", "+e+")";if(l instanceof SVGSVGElement&&l.childNodes&&l.childNodes.length>1){var u=parseFloat(l.getAttribute("width")),p=parseFloat(l.getAttribute("height"));l.setAttribute("width",i),l.setAttribute("height",r);var d=i/u,g=r/p;for(o=l.childNodes[0];o.childNodes.length;)a=o.childNodes[0].getAttribute("id"),this.__ids[a]=a,this.__defs.appendChild(o.childNodes[0]);if(s=l.childNodes[1]){var f,_=s.getAttribute("transform");f=_?_+" "+c:c,s.setAttribute("transform",f+" scale("+d+", "+g+")"),n.appendChild(s)}}},a.prototype.createPattern=function(t,e){var i,r=this.__document.createElementNS("http://www.w3.org/2000/svg","pattern"),n=_(this.__ids);return r.setAttribute("id",n),r.setAttribute("width",t.width),r.setAttribute("height",t.height),"CANVAS"===t.nodeName||"IMG"===t.nodeName?((i=this.__document.createElementNS("http://www.w3.org/2000/svg","image")).setAttribute("width",t.width),i.setAttribute("height",t.height),i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","CANVAS"===t.nodeName?t.toDataURL():t.getAttribute("src")),r.appendChild(i),this.__defs.appendChild(r)):t instanceof a&&(r.appendChild(t.__root.childNodes[1]),this.__defs.appendChild(r)),new l(r,this)},a.prototype.setLineDash=function(t){t&&t.length>0?this.lineDash=t.join(","):this.lineDash=null},a.prototype.drawFocusRing=function(){},a.prototype.createImageData=function(){},a.prototype.getImageData=function(){},a.prototype.putImageData=function(){},a.prototype.globalCompositeOperation=function(){},a.prototype.setTransform=function(){};const w=a;var y,x,b=null!==(y=document.getElementById("canvas"))&&void 0!==y?y:new HTMLCanvasElement,A=null!==(x=b.getContext("2d"))&&void 0!==x?x:new CanvasRenderingContext2D,E=[],M=[],C=[],S=[],P=[],k=b.width=b.getBoundingClientRect().width,T=b.height=b.getBoundingClientRect().height,I=60,N=50,O={fov:1024,angle:-80,grid:20,w:k/2,h:T/2,viewDist:I,deltaDist:N},G=new g,D=function(t,e,i,r){return e+Math.sin(r)*(t-i/2)},j=function(t,e,i,r){return e-Math.sin(r)*(t-i/2)};addEventListener("resize",(function(){return T=b.height=b.getBoundingClientRect().height,k=b.width=b.getBoundingClientRect().width,A.globalCompositeOperation="destination-over",void mt()}));var H=function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},R=function(t){return Math.floor(t)},L=function(t){var e=R(t).toString(16);return 1==e.length?"0"+e:e},q=function(t,e,i){return Math.abs((e-t)*i+t)},F=function(t,e,i){var r,n,o,s,a,h=null!==(r=H(t))&&void 0!==r?r:{r:0,b:0,g:0},l=null!==(n=H(e))&&void 0!==n?n:{r:0,b:0,g:0};return o=q(h.r,l.r,i),s=q(h.g,l.g,i),a=q(h.b,l.b,i),"#"+L(o)+L(s)+L(a)},z=function(t,e){for(var i=0;i<t.length;i++)if(t[i].properties.y+t[i].properties.h<=e.properties.y+e.properties.h)return void t.splice(i,0,e);t.push(e)},Y=function(t,e){return Math.random()*(e-t)+t},B=function(t){return R(Math.random()*t)},U=function(t,e,i,r,n){return(t-e)/(i-e)*(n-r)+r},W=function(t,e){var i=Math.random();return R(U(i*i*i,0,1,t,e))};var X=function(){function t(t,e,i,r){this.x=R(t),this.y=R(e),this.w=R(i),this.h=R(r)}return t.prototype.draw=function(t){t.globalAlpha=.5,function(t,e,i,n,o,s){var a=e,h=i,l=n,c=o,u=s=Math.min(Math.max(n-1,1),Math.max(o-1,1),s);t.beginPath(),t.lineJoin="round",t.fillStyle=r,t.strokeStyle=r,t.lineWidth=u,t.strokeRect(a+u/2,h+u/2,l-u,c-u),t.stroke(),t.fill(),t.closePath()}(t,R(this.x),R(this.y),R(this.w),R(this.h),R(this.h)),t.globalAlpha=1},t}(),V=function(){function t(){this.cloudPieces=[];var t=Y(0,1),e=R(Y(100,350)),i=R(Y(40,50)),r=R(Y(0-e/2,k-e/2)),n=R(Y(0,T/2)),o=new X(r,n,e,i);this.x=o.x,this.y=o.y,this.x2=o.x+o.w,this.y2=o.y+o.h;for(var s=0;s<t;s++){var a=Math.random(),h=R(Y(Math.max(100,o.w-100),Math.max(100,o.w-50))),l=R(Y(40,50)),c=R(o.x+o.w/4),u=o.y+(a>.5?o.h:-l),p=new X(c,u,h,l);this.cloudPieces.push(o),o=p,this.x=Math.min(o.x,this.x),this.y=Math.min(o.y,this.y),this.x2=Math.max(o.x+o.w,this.x2),this.y2=Math.max(o.y+o.h,this.y2)}this.cloudPieces.push(o)}return t.prototype.draw=function(t){this.cloudPieces.forEach((function(e){e.draw(t)}))},t}(),Z=4294967296;function $(){this.Z=Math.floor(Math.random()*Z),this.next=function(){return this.Z=(1664525*this.Z+1)%Z,this.Z/Z-.5}}var J,K,Q,tt=function(){function t(t,e){this.index=0,this.amp=t,this.wl=e,this.fq=1/e,this.psng=new $,this.a=this.psng.next(),this.b=this.psng.next(),this.pos=[]}return t.prototype.fillPos=function(t){for(;this.index<t;)this.index%this.wl==0?(this.a=this.b,this.b=this.psng.next(),this.pos.push(this.a*this.amp)):this.pos.push((e=this.a,i=this.b,void 0,void 0,r=this.index%this.wl/this.wl*Math.PI,(e*(1-(n=.5*(1-Math.cos(r))))+i*n)*this.amp)),this.index++;var e,i,r,n},t}(),et=function(t,e,i,r,n){for(var o=[],s=0;s<i;s++)o.push(new tt(t,e)),t/=r,e/=r;return o},it=function(t){var e={pos:[]};if(!t[0].pos)return e;for(var i=0,r=0,n=0;i<t[0].pos.length;i++){for(r=0,n=0;n<t.length;n++)r+=t[n].pos[i];e.pos.push(r)}return e},rt=(J=function(t,e){return J=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},J(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}J(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),nt=function(){function t(t){var e=t.range,i=t.height,r=t.color,n=t.slopeAngle,o=t.w,s=t.colourGradient;this.range=e,this.height=i,this.color=r,this.rangeCombined=it(e),this.calcuHighestAndLowestYAxis(),this.slopeAngle=n,this.updateOffsetHeight(o),this.colourGradient=s}return t.prototype.updateOffsetHeight=function(t){this.offsetHeight=Math.sin(this.slopeAngle)*t/2,this.offsetHeight=Math.abs(this.offsetHeight)},t.prototype.calcuHighestAndLowestYAxis=function(){this.lowestYAxis=Math.min.apply(Math,this.rangeCombined.pos)+this.height,this.highestYAxis=Math.max.apply(Math,this.rangeCombined.pos)+this.height},t.prototype.updateMountains=function(t,e){this.updateOffsetHeight(e),this.range.forEach((function(t){return t.fillPos(e)})),0===this.height&&(this.height=t),this.rangeCombined=it(this.range),this.calcuHighestAndLowestYAxis()},t.prototype.drawMountain=function(t,e,i){var r,n=this;if(this.colourGradient){var o=t.createLinearGradient(0,this.lowestYAxis,0,i);this.colourGradient.forEach((function(t,e){o.addColorStop(e/n.colourGradient.length,t)})),t.fillStyle=o}else t.fillStyle=this.color,t.strokeStyle=this.color;t.beginPath(),t.lineWidth=0,t.moveTo(0,null!==(r=this.height+this.rangeCombined.pos[0])&&void 0!==r?r:this.height);for(var s=0;s<this.rangeCombined.pos.length;s++){var a=D(s,this.rangeCombined.pos[s]+this.height,e,this.slopeAngle);t.lineTo(s,a)}t.lineTo(e,i),t.lineTo(0,i),t.closePath(),t.fill()},t}(),ot=function(t){function e(e){var i=t.call(this,e)||this;i.treesPos=[],i.treeTotalHeight=2*e.treeMaxHeight,i.treeMaxHeight=e.treeMaxHeight;var r=Math.PI/180*30;i.treeHalfWidth=R(i.treeTotalHeight*r);for(var n=0;n<k;n++)i.generateTree(n);return i}return rt(e,t),e.prototype.generateTree=function(t){if(Math.random()<.1){var e=R(U(Math.random(),0,1,this.treeMaxHeight/3,this.treeMaxHeight));this.treesPos.push({x:t,height:e})}},e.prototype.updateMountains=function(t,e){this.updateOffsetHeight(e),this.range.forEach((function(t){return t.fillPos(e)})),0===this.height&&(this.height=t),this.rangeCombined=it(this.range);for(var i=this.treesPos.length;i<e;i++)Math.random()<.01&&this.generateTree(i);this.calcuHighestAndLowestYAxis()},e.prototype.drawTrees=function(t,e,i){var r=this;if(this.colourGradient){var n=t.createLinearGradient(0,this.lowestYAxis,0,i);this.colourGradient.forEach((function(t,e){n.addColorStop(e/r.colourGradient.length,t)})),t.fillStyle=n}else t.fillStyle=this.color,t.strokeStyle=this.color;this.treesPos.forEach((function(i){t.beginPath(),t.lineWidth=0;var n=D(i.x,r.rangeCombined.pos[i.x]+r.height,e,r.slopeAngle),o=n+r.treeTotalHeight,s=n-i.height;t.lineTo(i.x-r.treeHalfWidth,o),t.lineTo(i.x,s),t.lineTo(i.x+r.treeHalfWidth,o),t.closePath(),t.fill()}))},e}(nt),st=function(t){function e(e){var i=t.call(this,e)||this,r=e.daisies;return i.daisies=r,i}return rt(e,t),e.prototype.updateArea=function(t){this.areaProportionalToHeight=t},e.prototype.drawDaisies=function(t,e){e?this.daisies.slice().reverse().forEach((function(e){e.draw(t)})):this.daisies.forEach((function(e){e.draw(t)}))},e}(nt),at=function(){function e(t,e,i){this.x=R(t),this.y=R(e),this.r=R(i)}return e.prototype.draw=function(e){e.beginPath(),e.arc(this.x,this.y,this.r,0,2*Math.PI);var i=e.createLinearGradient(this.x,this.y,this.x,this.y+2*this.r);t.forEach((function(e,r){i.addColorStop(r/t.length,e)})),e.fillStyle=i,e.fill(),e.closePath(),this.drawSunWaves(e,"#fceeb5","#fceeb5")},e.prototype.drawSunWaves=function(t,e,i){for(var r=this.r,n=0;n<3;n++){t.globalAlpha=1/(n+3);var o=F(e,i,n/3);t.beginPath();var s=r+(T+k)/100+(3-n)*(T+k)/200;t.arc(this.x,this.y,s,0,2*Math.PI),r=s,t.fillStyle="".concat(o),t.fill(),t.closePath()}t.globalAlpha=1},e}(),ht=new at(R(Y(k/3,3*k/4)),R(Y(T/8,2*T/8)),(T+k)/25+Math.random()*(T+k)/100),lt=null!==(K=document.getElementById("background-layer"))&&void 0!==K?K:new HTMLCanvasElement,ct=null!==(Q=lt.getContext("2d"))&&void 0!==Q?Q:new CanvasRenderingContext2D,ut=lt.width=k,pt=(lt.height=T,[]),dt=[];!function(t){for(var e=.55*T,i=(.5*T-e)/3,r=T/30,n=Math.PI/180*-10,o=-n,s=0;s<2;s++){var a=e+Y(i*s,i*(s+1)),h=et(40,150,2,3),l=[F("#855354","#cc825f",s/2),F("#efab7b","#efab7b",s/2)],c=new ot({color:F("#766972","#a18591",s/2),colourGradient:l,range:h,height:a,daisies:[],slopeAngle:Y(n,o),treeMaxHeight:r});t.push(c)}}(dt);var gt=function(t){var i=t.createLinearGradient(0,0,0,T/2);e.forEach((function(t,r){i.addColorStop(r/e.length,t)})),t.fillStyle=i,t.fillRect(0,0,ut,lt.height)},ft=function(t){gt(t),ht.draw(t),pt.forEach((function(e){return e.draw(t)})),P.slice().reverse().forEach((function(e){e.drawMountain(t,k,T)})),dt.slice().reverse().forEach((function(e,i){e.updateMountains(T/(i+1),k),e.drawMountain(t,k,T),e.drawTrees(t,k,T)}))},_t=function(t,e){t.globalCompositeOperation="destination-over",e&&t.clearRect(0,0,ut,lt.height),dt.forEach((function(e,i){e.updateMountains(T/(i+1),k),e.drawTrees(t,k,T),e.drawMountain(t,k,T)})),P.forEach((function(e,i){e.updateMountains(T/(i+1),k),e.drawMountain(t,k,T)})),pt.forEach((function(e){return e.draw(t)})),ht.draw(t),gt(t)},mt=function(){lt.height=T,ut=lt.width=k,_t(ct)};!function(){for(var t=.45*T,e=(.25*T-t)/3,i=0;i<2;i++){var r=t+Y(e*i,e*(i+1)),n=et(100,150,2,3),o=[F("#ec8e64","#fee074",i/2),F("#efab7b","#efab7b",i/2)],s=new nt({color:F("#766972","#a18591",i/2),colourGradient:o,range:n,height:r,daisies:[],slopeAngle:Y(-Math.PI/12,Math.PI/12)});P.push(s)}}(),function(){for(var t=R(Y(2,4)),e=function(t){var e=0,i=!1,r=function(){i=!1;var t=new V;pt.forEach((function(e){var r,n,o,s;i=i||(n=e,o=[[(r=t).x,r.y],[r.x2,r.y2]],s=[[n.x,n.y],[n.x2,n.y2]],(o[0][0]<s[0][0]&&s[0][0]<o[1][0]||o[0][0]<s[1][0]&&s[1][0]<o[1][0]||s[0][0]<o[0][0]&&o[1][0]<s[1][0])&&(o[0][1]<s[0][1]&&s[0][1]<o[1][1]||o[0][1]<s[1][1]&&s[1][1]<o[1][1]||s[0][1]<o[0][1]&&o[1][1]<s[1][1]))})),i||pt.push(t),e++};do{r()}while(i&&e<20)},i=0;i<t;i++)e()}();var vt,wt,yt=i(222),xt=function(){return xt=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},xt.apply(this,arguments)},bt=(vt=new(i.n(yt)())).setColorGradient.apply(vt,["#212c24","#a54f01","#f4ba00"]).setMidpoint(20);addEventListener("resize",(function(){return At()}));var At=function(){A.globalCompositeOperation="destination-over",S.forEach((function(t,e){t.updateMountains(T/(e+1),k)})),S.forEach((function(t,e){if(e>0){var i=t.lowestYAxis,r=S[e-1].highestYAxis;(n=new d(0,D(0,r,k,t.slopeAngle),e*N+I,E[B(E.length)],t.slopeAngle,O)).changeProperties(xt(xt({},O),{viewDist:e*N+I})),t.updateArea(Math.abs(i-r)*k/Math.abs(n.properties.h*n.properties.w))}else{var n,o=t.lowestYAxis;r=T+t.offsetHeight+10,(n=new d(0,D(0,r,k,t.slopeAngle),e*N+I,E[B(E.length)],t.slopeAngle,O)).changeProperties(xt(xt({},O),{viewDist:e*N+I})),t.updateArea(Math.abs(o-r)*k/Math.abs(n.properties.h*n.properties.w))}})),G.updateAreasSum(S),Et()},Et=function(){A.clearRect(0,0,k,T),S.forEach((function(t,e){t.drawDaisies(A),t.drawMountain(A,k,T)}))},Mt=function(){var t=B(k);G.updateyCoordinates(S,t);var e=G.getHillIndex(Y(0,G.areasSum),S),i=e>0?e>1?C[B(E.length)]:M[B(E.length)]:E[B(E.length)];G.createDaisyAtIndex(e,t,S,i)};document.addEventListener("click",(function(t){console.log("aaaaa");var e=function(t,e){var i=t.getBoundingClientRect();return{x:R(e.clientX-i.left),y:R(e.clientY-i.top)}}(b,t),i=E[B(E.length)];i&&function(t,e,i){for(var r=!1,n=0;n<S.length;n++){var o=new d(t.x,t.y,n*N+I,i,S[n].slopeAngle,O),s=S[n].rangeCombined,a=D(t.x,s.pos[t.x]+S[n].height,k,S[n].slopeAngle),h=a<t.y,l=a<o.properties.y+.15*o.properties.h;if(!h&&l&&!r&&e<.5&&(z(S[n].daisies,o),r=!0),h&&!r&&(z(S[n].daisies,o),r=!0),r)break}}(e,Math.random(),i),Et()})),null===(wt=document.getElementById("canvas"))||void 0===wt||wt.addEventListener("contextmenu",(function(){_t(A,!1)})),["..\\tmp\\ref\\minhaFlor1.svg","..\\tmp\\ref\\minhaFlor2.svg"].forEach((function(t){var e=new Image;e.src=t,E.push(e)})),["..\\tmp\\ref\\minhaFlor1.svg","..\\tmp\\ref\\minhaFlor2.svg"].forEach((function(t){var e=new Image;e.src=t,M.push(e)})),["..\\tmp\\ref\\minhaFlor1.svg","..\\tmp\\ref\\minhaFlor2.svg"].forEach((function(t){var e=new Image;e.src=t,C.push(e)})),function(){for(var t=.55*T,e=.9*T,i=Y(-Math.PI/12,Math.PI/12),r=(t-e)/6,n=0;n<5;n++){var o=e+Y(r*n,r*(n+1)),s=et(30,150,2,3),a=new st({color:bt.getColor(U(n,0,4,0,20)+1),range:s,height:o,daisies:[],slopeAngle:i,w:k});S.push(a)}}(),At(),Et(),mt(),document.getElementById("exportCanvasSvg").onclick=function(t){t.stopPropagation(),function(){var t=new w({width:k,height:T});t.clearRect(0,0,k,T),ft(t),S.slice().reverse().forEach((function(e,i){e.drawMountain(t,k,T),e.drawDaisies(t,!0)})),function(t,e){var i=(new XMLSerializer).serializeToString(t);i.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(i=i.replace(/^<svg/,'<svg xmlns="http://www.w3.org/2000/svg"')),i.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(i=i.replace(/^<svg/,'<svg xmlns:xlink="http://www.w3.org/1999/xlink"')),i='<?xml version="1.0" standalone="no"?>\r\n'+i;var r="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(i),n=document.createElement("a");n.href=r,n.download="mySVG.svg",document.body.appendChild(n),n.click(),document.body.removeChild(n)}(t.getSvg())}()},document.getElementById("addFlowers").onclick=function(t){t.stopPropagation(),function(){At(),G.updateAreasSum(S);for(var t=0;t<1e3;t++)Mt();Et()}()},document.getElementById("removeAllFlowers").onclick=function(t){t.stopPropagation(),S.forEach((function(t){return t.daisies=[]})),Et()}})()})();