(()=>{var t={222:t=>{class e{constructor(t="",e="",i=0,r=10){this.setColorGradient=(i,r)=>{t=o(i),e=o(r)},this.setMidpoint=(t,e)=>{i=t,r=e},this.getColor=i=>{if(i)return"#"+n(i,t.substring(0,2),e.substring(0,2))+n(i,t.substring(2,4),e.substring(2,4))+n(i,t.substring(4,6),e.substring(4,6))};const n=(t,e,n)=>{t<i?t=i:t>r&&(t=r);const o=r-i,a=parseInt(e,16),s=(parseInt(n,16)-a)/o,h=Math.round(s*(t-i)+a);return h<16?"0"+h.toString(16):h.toString(16)},o=t=>t.substring(t.length-6,t.length)}}t.exports=class{constructor(t="",i=10,r=["",""],n=[]){const o=o=>{if(o.length<2)throw new Error(`setColorGradient should have more than ${o.length} color`);{const a=i/(o.length-1),s=new e,h=0,l=0+a;s.setColorGradient(o[0],o[1]),s.setMidpoint(h,l),t=[s],n=[{lower:h,upper:l}];for(let i=1;i<o.length-1;i++){const r=new e,s=0+a*i,h=0+a*(i+1);r.setColorGradient(o[i],o[i+1]),r.setMidpoint(s,h),t[i]=r,n[i]={lower:s,upper:h}}r=o}};this.setColorGradient=(...t)=>(o(t),this),this.getColors=()=>{const e=[];for(let r=0;r<n.length;r++){const o=n[r],a=0===o.lower?1:Math.ceil(o.lower),s=o.upper===i?o.upper+1:Math.ceil(o.upper);for(let i=a;i<s;i++)e.push(t[r].getColor(i))}return e},this.getColor=e=>{if(isNaN(e))throw new TypeError("getColor should be a number");if(e<=0)throw new TypeError(`getColor should be greater than ${e}`);{const r=e+1,n=(i-0)/t.length,o=Math.min(Math.floor((Math.max(e,0)-0)/n),t.length-1);return t[o].getColor(r)}},this.setMidpoint=t=>{if(isNaN(t)||!(t>=0))throw t<=0?new RangeError(`midPoint should be greater than ${t}`):new RangeError("midPoint should be a number");return i=t,o(r),this}}}}},e={};function i(r){var n=e[r];if(void 0!==n)return n.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,i),o.exports}i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t,e,i){var r,n,o=i.fov,a=i.viewDist,s=i.w,h=i.h;r=i.angle*Math.PI/180;var l=a*(e-h)/(Math.cos(r)*o+(n=Math.sin(r))*(h-e));return[(t-s)/(o/(a+l*n)),l]}function e(t,e,i){var r,n,o,a=i.fov,s=i.viewDist,h=i.w,l=i.h;return r=i.angle*Math.PI/180,n=Math.cos(r),[t*(o=a/(s+e*Math.sin(r)))+h,e*n*o+l]}var r,n,o,a,s,h=function(){return h=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},h.apply(this,arguments)},l=function(t,i,r,n){var o=e(t,i,r),a=e(t+1,i,r),s=Math.abs(a[0]-o[0]);return{x:o[0],y:o[1],w:-s,h:-s*n}},c=function(){function e(e,i,r,n,o,a){this.img=n;var s=n.height/n.width;this.iniX=e,this.iniY=i;var c=N(e,i,M,o),u=t(e,i,h(h({},a),{viewDist:r}));this.properties=l(u[0],u[1],h(h({},a),{viewDist:r}),s);var p=t(e,c,h(h({},a),{viewDist:r})),d=l(p[0],p[1],h(h({},a),{viewDist:r}),s);this.properties.h=Math.abs(d.h),this.properties.w=Math.abs(d.w)}return e.prototype.changeProperties=function(e){var i=t(this.iniX,this.iniY,e),r=l(i[0],i[1],e,this.img.height/this.img.width);this.properties=r},e.prototype.draw=function(t){t.drawImage(this.img,Math.floor(this.properties.x-this.properties.w/2),Math.floor(this.properties.y-this.properties.h/1.5),Math.floor(this.properties.w),Math.floor(this.properties.h))},e}(),u=function(){function t(){this.areasSum=0}return t.prototype.updateAreasSum=function(t){this.areasSum=t.reduce((function(t,e){return t+e.areaProportionalToHeight}),0)},t.prototype.updateyCoordinates=function(t,e){this.yCoordinates=t.map((function(t){return t.rangeCombined.pos[e]+t.height}))},t.prototype.getHillIndex=function(t,e){for(var i=0,r=e[0].areaProportionalToHeight,n=1;n<e.length;n++)t>r&&i++,r+=e[n].areaProportionalToHeight;return i},t.prototype.createDaisyAtIndex=function(t,e,i,r){var n=i[i.length-1].offsetHeight,o={x:e,y:Y(i[t].lowestYAxis-10,t-1>=0?i[t-1].highestYAxis:S+n+10)};if(o.y>this.yCoordinates[t]){var a=O(o.x,o.y,M,i[t].slopeAngle),s=new c(o.x,a,t*k+P,r,i[t].slopeAngle,T);L(i[t].daisies,s)}},t}();function p(t,e){var i,r=Object.keys(e);for(i=0;i<r.length;i++)t=t.replace(new RegExp("\\{"+r[i]+"\\}","gi"),e[r[i]]);return t}function d(t){var e,i,r;if(!t)throw new Error("cannot create a random attribute name for an undefined object");e="ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",i="";do{for(i="",r=0;r<12;r++)i+=e[Math.floor(Math.random()*e.length)]}while(t[i]);return i}function g(t){var e={alphabetic:"alphabetic",hanging:"hanging",top:"text-before-edge",bottom:"text-after-edge",middle:"central"};return e[t]||e.alphabetic}s=function(t,e){var i,r,n,o={};for(t=t.split(","),e=e||10,i=0;i<t.length;i+=2)r="&"+t[i+1]+";",n=parseInt(t[i],e),o[r]="&#"+n+";";return o["\\xa0"]="&#160;",o}("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32),r={strokeStyle:{svgAttr:"stroke",canvas:"#000000",svg:"none",apply:"stroke"},fillStyle:{svgAttr:"fill",canvas:"#000000",svg:null,apply:"fill"},lineCap:{svgAttr:"stroke-linecap",canvas:"butt",svg:"butt",apply:"stroke"},lineJoin:{svgAttr:"stroke-linejoin",canvas:"miter",svg:"miter",apply:"stroke"},miterLimit:{svgAttr:"stroke-miterlimit",canvas:10,svg:4,apply:"stroke"},lineWidth:{svgAttr:"stroke-width",canvas:1,svg:1,apply:"stroke"},globalAlpha:{svgAttr:"opacity",canvas:1,svg:1,apply:"fill stroke"},font:{canvas:"10px sans-serif"},shadowColor:{canvas:"#000000"},shadowOffsetX:{canvas:0},shadowOffsetY:{canvas:0},shadowBlur:{canvas:0},textAlign:{canvas:"start"},textBaseline:{canvas:"alphabetic"},lineDash:{svgAttr:"stroke-dasharray",canvas:[],svg:null,apply:"stroke"}},o=function(t,e){this.__root=t,this.__ctx=e},o.prototype.addColorStop=function(t,e){var i,r=this.__ctx.__createElement("stop");r.setAttribute("offset",t),-1!==e.indexOf("rgba")?(i=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi.exec(e),r.setAttribute("stop-color",p("rgb({r},{g},{b})",{r:i[1],g:i[2],b:i[3]})),r.setAttribute("stop-opacity",i[4])):r.setAttribute("stop-color",e),this.__root.appendChild(r)},a=function(t,e){this.__root=t,this.__ctx=e},(n=function(t){var e,i={width:500,height:500,enableMirroring:!1};if(arguments.length>1?((e=i).width=arguments[0],e.height=arguments[1]):e=t||i,!(this instanceof n))return new n(e);this.width=e.width||i.width,this.height=e.height||i.height,this.enableMirroring=void 0!==e.enableMirroring?e.enableMirroring:i.enableMirroring,this.canvas=this,this.__document=e.document||document,e.ctx?this.__ctx=e.ctx:(this.__canvas=this.__document.createElement("canvas"),this.__ctx=this.__canvas.getContext("2d")),this.__setDefaultStyles(),this.__stack=[this.__getStyleState()],this.__groupStack=[],this.__root=this.__document.createElementNS("http://www.w3.org/2000/svg","svg"),this.__root.setAttribute("version",1.1),this.__root.setAttribute("xmlns","http://www.w3.org/2000/svg"),this.__root.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),this.__root.setAttribute("width",this.width),this.__root.setAttribute("height",this.height),this.__ids={},this.__defs=this.__document.createElementNS("http://www.w3.org/2000/svg","defs"),this.__root.appendChild(this.__defs),this.__currentElement=this.__document.createElementNS("http://www.w3.org/2000/svg","g"),this.__root.appendChild(this.__currentElement)}).prototype.__createElement=function(t,e,i){void 0===e&&(e={});var r,n,o=this.__document.createElementNS("http://www.w3.org/2000/svg",t),a=Object.keys(e);for(i&&(o.setAttribute("fill","none"),o.setAttribute("stroke","none")),r=0;r<a.length;r++)n=a[r],o.setAttribute(n,e[n]);return o},n.prototype.__setDefaultStyles=function(){var t,e,i=Object.keys(r);for(t=0;t<i.length;t++)this[e=i[t]]=r[e].canvas},n.prototype.__applyStyleState=function(t){var e,i,r=Object.keys(t);for(e=0;e<r.length;e++)this[i=r[e]]=t[i]},n.prototype.__getStyleState=function(){var t,e,i={},n=Object.keys(r);for(t=0;t<n.length;t++)i[e=n[t]]=this[e];return i},n.prototype.__applyStyleToCurrentElement=function(t){var e=this.__currentElement,i=this.__currentElementsToStyle;i&&(e.setAttribute(t,""),e=i.element,i.children.forEach((function(e){e.setAttribute(t,"")})));var n,s,h,l,c,u=Object.keys(r);for(n=0;n<u.length;n++)if(s=r[u[n]],h=this[u[n]],s.apply)if(h instanceof a){if(h.__ctx)for(;h.__ctx.__defs.childNodes.length;)l=h.__ctx.__defs.childNodes[0].getAttribute("id"),this.__ids[l]=l,this.__defs.appendChild(h.__ctx.__defs.childNodes[0]);e.setAttribute(s.apply,p("url(#{id})",{id:h.__root.getAttribute("id")}))}else if(h instanceof o)e.setAttribute(s.apply,p("url(#{id})",{id:h.__root.getAttribute("id")}));else if(-1!==s.apply.indexOf(t)&&s.svg!==h)if("stroke"!==s.svgAttr&&"fill"!==s.svgAttr||-1===h.indexOf("rgba")){var d=s.svgAttr;if("globalAlpha"===u[n]&&(d=t+"-"+s.svgAttr,e.getAttribute(d)))continue;e.setAttribute(d,h)}else{c=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi.exec(h),e.setAttribute(s.svgAttr,p("rgb({r},{g},{b})",{r:c[1],g:c[2],b:c[3]}));var g=c[4],f=this.globalAlpha;null!=f&&(g*=f),e.setAttribute(s.svgAttr+"-opacity",g)}},n.prototype.__closestGroupOrSvg=function(t){return"g"===(t=t||this.__currentElement).nodeName||"svg"===t.nodeName?t:this.__closestGroupOrSvg(t.parentNode)},n.prototype.getSerializedSvg=function(t){var e,i,r,n,o,a=(new XMLSerializer).serializeToString(this.__root);if(/xmlns="http:\/\/www\.w3\.org\/2000\/svg".+xmlns="http:\/\/www\.w3\.org\/2000\/svg/gi.test(a)&&(a=a.replace('xmlns="http://www.w3.org/2000/svg','xmlns:xlink="http://www.w3.org/1999/xlink')),t)for(e=Object.keys(s),i=0;i<e.length;i++)r=e[i],n=s[r],(o=new RegExp(r,"gi")).test(a)&&(a=a.replace(o,n));return a},n.prototype.getSvg=function(){return this.__root},n.prototype.save=function(){var t=this.__createElement("g"),e=this.__closestGroupOrSvg();this.__groupStack.push(e),e.appendChild(t),this.__currentElement=t,this.__stack.push(this.__getStyleState())},n.prototype.restore=function(){this.__currentElement=this.__groupStack.pop(),this.__currentElementsToStyle=null,this.__currentElement||(this.__currentElement=this.__root.childNodes[1]);var t=this.__stack.pop();this.__applyStyleState(t)},n.prototype.__addTransform=function(t){var e=this.__closestGroupOrSvg();if(e.childNodes.length>0){"path"===this.__currentElement.nodeName&&(this.__currentElementsToStyle||(this.__currentElementsToStyle={element:e,children:[]}),this.__currentElementsToStyle.children.push(this.__currentElement),this.__applyCurrentDefaultPath());var i=this.__createElement("g");e.appendChild(i),this.__currentElement=i}var r=this.__currentElement.getAttribute("transform");r?r+=" ":r="",r+=t,this.__currentElement.setAttribute("transform",r)},n.prototype.scale=function(t,e){void 0===e&&(e=t),this.__addTransform(p("scale({x},{y})",{x:t,y:e}))},n.prototype.rotate=function(t){var e=180*t/Math.PI;this.__addTransform(p("rotate({angle},{cx},{cy})",{angle:e,cx:0,cy:0}))},n.prototype.translate=function(t,e){this.__addTransform(p("translate({x},{y})",{x:t,y:e}))},n.prototype.transform=function(t,e,i,r,n,o){this.__addTransform(p("matrix({a},{b},{c},{d},{e},{f})",{a:t,b:e,c:i,d:r,e:n,f:o}))},n.prototype.beginPath=function(){var t;this.__currentDefaultPath="",this.__currentPosition={},t=this.__createElement("path",{},!0),this.__closestGroupOrSvg().appendChild(t),this.__currentElement=t},n.prototype.__applyCurrentDefaultPath=function(){var t=this.__currentElement;"path"===t.nodeName?t.setAttribute("d",this.__currentDefaultPath):console.error("Attempted to apply path command to node",t.nodeName)},n.prototype.__addPathCommand=function(t){this.__currentDefaultPath+=" ",this.__currentDefaultPath+=t},n.prototype.moveTo=function(t,e){"path"!==this.__currentElement.nodeName&&this.beginPath(),this.__currentPosition={x:t,y:e},this.__addPathCommand(p("M {x} {y}",{x:t,y:e}))},n.prototype.closePath=function(){this.__currentDefaultPath&&this.__addPathCommand("Z")},n.prototype.lineTo=function(t,e){this.__currentPosition={x:t,y:e},this.__currentDefaultPath.indexOf("M")>-1?this.__addPathCommand(p("L {x} {y}",{x:t,y:e})):this.__addPathCommand(p("M {x} {y}",{x:t,y:e}))},n.prototype.bezierCurveTo=function(t,e,i,r,n,o){this.__currentPosition={x:n,y:o},this.__addPathCommand(p("C {cp1x} {cp1y} {cp2x} {cp2y} {x} {y}",{cp1x:t,cp1y:e,cp2x:i,cp2y:r,x:n,y:o}))},n.prototype.quadraticCurveTo=function(t,e,i,r){this.__currentPosition={x:i,y:r},this.__addPathCommand(p("Q {cpx} {cpy} {x} {y}",{cpx:t,cpy:e,x:i,y:r}))};var f=function(t){var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]);return[t[0]/e,t[1]/e]};n.prototype.arcTo=function(t,e,i,r,n){var o=this.__currentPosition&&this.__currentPosition.x,a=this.__currentPosition&&this.__currentPosition.y;if(void 0!==o&&void 0!==a){if(n<0)throw new Error("IndexSizeError: The radius provided ("+n+") is negative.");if(o===t&&a===e||t===i&&e===r||0===n)this.lineTo(t,e);else{var s=f([o-t,a-e]),h=f([i-t,r-e]);if(s[0]*h[1]!=s[1]*h[0]){var l=s[0]*h[0]+s[1]*h[1],c=Math.acos(Math.abs(l)),u=f([s[0]+h[0],s[1]+h[1]]),p=n/Math.sin(c/2),d=t+p*u[0],g=e+p*u[1],_=[-s[1],s[0]],m=[h[1],-h[0]],v=function(t){var e=t[0];return t[1]>=0?Math.acos(e):-Math.acos(e)},w=v(_),y=v(m);this.lineTo(d+_[0]*n,g+_[1]*n),this.arc(d,g,n,w,y)}else this.lineTo(t,e)}}},n.prototype.stroke=function(){"path"===this.__currentElement.nodeName&&this.__currentElement.setAttribute("paint-order","fill stroke markers"),this.__applyCurrentDefaultPath(),this.__applyStyleToCurrentElement("stroke")},n.prototype.fill=function(){"path"===this.__currentElement.nodeName&&this.__currentElement.setAttribute("paint-order","stroke fill markers"),this.__applyCurrentDefaultPath(),this.__applyStyleToCurrentElement("fill")},n.prototype.rect=function(t,e,i,r){"path"!==this.__currentElement.nodeName&&this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+r),this.lineTo(t,e+r),this.lineTo(t,e),this.closePath()},n.prototype.fillRect=function(t,e,i,r){var n;n=this.__createElement("rect",{x:t,y:e,width:i,height:r},!0),this.__closestGroupOrSvg().appendChild(n),this.__currentElement=n,this.__applyStyleToCurrentElement("fill")},n.prototype.strokeRect=function(t,e,i,r){var n;n=this.__createElement("rect",{x:t,y:e,width:i,height:r},!0),this.__closestGroupOrSvg().appendChild(n),this.__currentElement=n,this.__applyStyleToCurrentElement("stroke")},n.prototype.__clearCanvas=function(){for(var t=this.__closestGroupOrSvg().getAttribute("transform"),e=this.__root.childNodes[1],i=e.childNodes,r=i.length-1;r>=0;r--)i[r]&&e.removeChild(i[r]);this.__currentElement=e,this.__groupStack=[],t&&this.__addTransform(t)},n.prototype.clearRect=function(t,e,i,r){if(0!==t||0!==e||i!==this.width||r!==this.height){var n,o=this.__closestGroupOrSvg();n=this.__createElement("rect",{x:t,y:e,width:i,height:r,fill:"#FFFFFF"},!0),o.appendChild(n)}else this.__clearCanvas()},n.prototype.createLinearGradient=function(t,e,i,r){var n=this.__createElement("linearGradient",{id:d(this.__ids),x1:t+"px",x2:i+"px",y1:e+"px",y2:r+"px",gradientUnits:"userSpaceOnUse"},!1);return this.__defs.appendChild(n),new o(n,this)},n.prototype.createRadialGradient=function(t,e,i,r,n,a){var s=this.__createElement("radialGradient",{id:d(this.__ids),cx:r+"px",cy:n+"px",r:a+"px",fx:t+"px",fy:e+"px",gradientUnits:"userSpaceOnUse"},!1);return this.__defs.appendChild(s),new o(s,this)},n.prototype.__parseFont=function(){var t=/^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z0-9]+?)\s*$/i.exec(this.font),e={style:t[1]||"normal",size:t[4]||"10px",family:t[6]||"sans-serif",weight:t[3]||"normal",decoration:t[2]||"normal",href:null};return"underline"===this.__fontUnderline&&(e.decoration="underline"),this.__fontHref&&(e.href=this.__fontHref),e},n.prototype.__wrapTextLink=function(t,e){if(t.href){var i=this.__createElement("a");return i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t.href),i.appendChild(e),i}return e},n.prototype.__applyText=function(t,e,i,r){var n,o,a=this.__parseFont(),s=this.__closestGroupOrSvg(),h=this.__createElement("text",{"font-family":a.family,"font-size":a.size,"font-style":a.style,"font-weight":a.weight,"text-decoration":a.decoration,x:e,y:i,"text-anchor":(n=this.textAlign,o={left:"start",right:"end",center:"middle",start:"start",end:"end"},o[n]||o.start),"dominant-baseline":g(this.textBaseline)},!0);h.appendChild(this.__document.createTextNode(t)),this.__currentElement=h,this.__applyStyleToCurrentElement(r),s.appendChild(this.__wrapTextLink(a,h))},n.prototype.fillText=function(t,e,i){this.__applyText(t,e,i,"fill")},n.prototype.strokeText=function(t,e,i){this.__applyText(t,e,i,"stroke")},n.prototype.measureText=function(t){return this.__ctx.font=this.font,this.__ctx.measureText(t)},n.prototype.arc=function(t,e,i,r,n,o){if(r!==n){(r%=2*Math.PI)==(n%=2*Math.PI)&&(n=(n+2*Math.PI-.001*(o?-1:1))%(2*Math.PI));var a,s=t+i*Math.cos(n),h=e+i*Math.sin(n),l=t+i*Math.cos(r),c=e+i*Math.sin(r),u=o?0:1,d=n-r;d<0&&(d+=2*Math.PI),a=o?d>Math.PI?0:1:d>Math.PI?1:0,this.lineTo(l,c),this.__addPathCommand(p("A {rx} {ry} {xAxisRotation} {largeArcFlag} {sweepFlag} {endX} {endY}",{rx:i,ry:i,xAxisRotation:0,largeArcFlag:a,sweepFlag:u,endX:s,endY:h})),this.__currentPosition={x:s,y:h}}},n.prototype.clip=function(){var t=this.__closestGroupOrSvg(),e=this.__createElement("clipPath"),i=d(this.__ids),r=this.__createElement("g");this.__applyCurrentDefaultPath(),t.removeChild(this.__currentElement),e.setAttribute("id",i),e.appendChild(this.__currentElement),this.__defs.appendChild(e),t.setAttribute("clip-path",p("url(#{id})",{id:i})),t.appendChild(r),this.__currentElement=r},n.prototype.drawImage=function(){var t,e,i,r,o,a,s,h,l,c,u,p,d,g,f=Array.prototype.slice.call(arguments),_=f[0],m=0,v=0;if(3===f.length)t=f[1],e=f[2],i=o=_.width,r=a=_.height;else if(5===f.length)t=f[1],e=f[2],i=f[3],r=f[4],o=_.width,a=_.height;else{if(9!==f.length)throw new Error("Inavlid number of arguments passed to drawImage: "+arguments.length);m=f[1],v=f[2],o=f[3],a=f[4],t=f[5],e=f[6],i=f[7],r=f[8]}s=this.__closestGroupOrSvg(),this.__currentElement;var w="translate("+t+", "+e+")";if(_ instanceof n){if((h=_.getSvg().cloneNode(!0)).childNodes&&h.childNodes.length>1){for(l=h.childNodes[0];l.childNodes.length;)g=l.childNodes[0].getAttribute("id"),this.__ids[g]=g,this.__defs.appendChild(l.childNodes[0]);if(c=h.childNodes[1]){var y,x=c.getAttribute("transform");y=x?x+" "+w:w,c.setAttribute("transform",y),s.appendChild(c)}}}else"IMG"===_.nodeName?((u=this.__createElement("image")).setAttribute("width",i),u.setAttribute("height",r),u.setAttribute("preserveAspectRatio","none"),(m||v||o!==_.width||a!==_.height)&&((p=this.__document.createElement("canvas")).width=i,p.height=r,(d=p.getContext("2d")).drawImage(_,m,v,o,a,0,0,i,r),_=p),u.setAttribute("transform",w),u.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","CANVAS"===_.nodeName?_.toDataURL():_.getAttribute("src")),s.appendChild(u)):"CANVAS"===_.nodeName&&((u=this.__createElement("image")).setAttribute("width",i),u.setAttribute("height",r),u.setAttribute("preserveAspectRatio","none"),(p=this.__document.createElement("canvas")).width=i,p.height=r,(d=p.getContext("2d")).imageSmoothingEnabled=!1,d.mozImageSmoothingEnabled=!1,d.oImageSmoothingEnabled=!1,d.webkitImageSmoothingEnabled=!1,d.drawImage(_,m,v,o,a,0,0,i,r),_=p,u.setAttribute("transform",w),u.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",_.toDataURL()),s.appendChild(u))},n.prototype.drawImageSvg=function(){var t,e,i,r,n,o,a,s,h=Array.prototype.slice.call(arguments),l=h[0];if(3===h.length)t=h[1],e=h[2],i=l.width,r=l.height;else if(5===h.length)t=h[1],e=h[2],i=h[3],r=h[4],l.width,l.height;else{if(9!==h.length)throw new Error("Inavlid number of arguments passed to drawImage: "+arguments.length);h[1],h[2],h[3],h[4],t=h[5],e=h[6],i=h[7],r=h[8]}n=this.__closestGroupOrSvg(),this.__currentElement;var c="translate("+t+", "+e+")";if(l instanceof SVGSVGElement&&l.childNodes&&l.childNodes.length>1){var u=parseFloat(l.getAttribute("width")),p=parseFloat(l.getAttribute("height"));l.setAttribute("width",i),l.setAttribute("height",r);var d=i/u,g=r/p;for(o=l.childNodes[0];o.childNodes.length;)s=o.childNodes[0].getAttribute("id"),this.__ids[s]=s,this.__defs.appendChild(o.childNodes[0]);if(a=l.childNodes[1]){var f,_=a.getAttribute("transform");f=_?_+" "+c:c,a.setAttribute("transform",f+" scale("+d+", "+g+")"),n.appendChild(a)}}},n.prototype.createPattern=function(t,e){var i,r=this.__document.createElementNS("http://www.w3.org/2000/svg","pattern"),o=d(this.__ids);return r.setAttribute("id",o),r.setAttribute("width",t.width),r.setAttribute("height",t.height),"CANVAS"===t.nodeName||"IMG"===t.nodeName?((i=this.__document.createElementNS("http://www.w3.org/2000/svg","image")).setAttribute("width",t.width),i.setAttribute("height",t.height),i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","CANVAS"===t.nodeName?t.toDataURL():t.getAttribute("src")),r.appendChild(i),this.__defs.appendChild(r)):t instanceof n&&(r.appendChild(t.__root.childNodes[1]),this.__defs.appendChild(r)),new a(r,this)},n.prototype.setLineDash=function(t){t&&t.length>0?this.lineDash=t.join(","):this.lineDash=null},n.prototype.drawFocusRing=function(){},n.prototype.createImageData=function(){},n.prototype.getImageData=function(){},n.prototype.putImageData=function(){},n.prototype.globalCompositeOperation=function(){},n.prototype.setTransform=function(){};const _=n;var m,v,w=null!==(m=document.getElementById("canvas"))&&void 0!==m?m:new HTMLCanvasElement,y=null!==(v=w.getContext("2d"))&&void 0!==v?v:new CanvasRenderingContext2D,x=[],b=[],A=[],E=[],C=[],M=w.width=w.getBoundingClientRect().width,S=w.height=w.getBoundingClientRect().height,P=60,k=50,T={fov:1024,angle:-80,grid:20,w:M/2,h:S/2,viewDist:P,deltaDist:k},I=new u,O=function(t,e,i,r){return e+Math.sin(r)*(t-i/2)},N=function(t,e,i,r){return e-Math.sin(r)*(t-i/2)};addEventListener("resize",(function(){return S=w.height=w.getBoundingClientRect().height,M=w.width=w.getBoundingClientRect().width,y.globalCompositeOperation="destination-over",void ft()}));var D=function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},G=function(t){return Math.floor(t)},H=function(t){var e=G(t).toString(16);return 1==e.length?"0"+e:e},j=function(t,e,i){return Math.abs((e-t)*i+t)},R=function(t,e,i){var r,n,o,a,s,h=null!==(r=D(t))&&void 0!==r?r:{r:0,b:0,g:0},l=null!==(n=D(e))&&void 0!==n?n:{r:0,b:0,g:0};return o=j(h.r,l.r,i),a=j(h.g,l.g,i),s=j(h.b,l.b,i),"#"+H(o)+H(a)+H(s)},L=function(t,e){for(var i=0;i<t.length;i++)if(t[i].properties.y+t[i].properties.h<=e.properties.y+e.properties.h)return void t.splice(i,0,e);t.push(e)},q=function(t,e){return Math.random()*(e-t)+t},F=function(t){return G(Math.random()*t)},z=function(t,e,i,r,n){return(t-e)/(i-e)*(n-r)+r},Y=function(t,e){var i=Math.random();return G(z(i*i*i,0,1,t,e))},B=function(){function t(t,e,i,r){this.x=t,this.y=e,this.w=i,this.h=r}return t.prototype.draw=function(t){t.globalAlpha=.5,function(t,e,i,r,n,o){var a=e,s=i,h=r,l=n,c=o=Math.min(Math.max(r-1,1),Math.max(n-1,1),o);t.beginPath(),t.lineJoin="round",t.fillStyle="#fdb9e6",t.strokeStyle="#fdb9e6",t.lineWidth=c,t.strokeRect(a+c/2,s+c/2,h-c,l-c),t.stroke(),t.fill(),t.closePath()}(t,G(this.x),G(this.y),G(this.w),G(this.h),G(this.h)),t.globalAlpha=1},t}(),U=function(){function t(){this.cloudPieces=[];var t=q(0,1),e=G(q(100,350)),i=G(q(40,50)),r=G(q(0-e/2,M-e/2)),n=G(q(0,S/2)),o=new B(r,n,e,i);this.x=o.x,this.y=o.y,this.x2=o.x+o.w,this.y2=o.y+o.h;for(var a=0;a<t;a++){var s=Math.random(),h=G(q(Math.max(100,o.w-100),Math.max(100,o.w-50))),l=G(q(40,50)),c=G(o.x+o.w/4),u=o.y+(s>.5?o.h:-l),p=new B(c,u,h,l);this.cloudPieces.push(o),o=p,this.x=Math.min(o.x,this.x),this.y=Math.min(o.y,this.y),this.x2=Math.max(o.x+o.w,this.x2),this.y2=Math.max(o.y+o.h,this.y2)}this.cloudPieces.push(o)}return t.prototype.draw=function(t){this.cloudPieces.forEach((function(e){e.draw(t)}))},t}(),W=["#fdd647","#fceeb5"],X=["#abdaee","#f8d6b8","#fdfe78"],V=4294967296;function Z(){this.Z=Math.floor(Math.random()*V),this.next=function(){return this.Z=(1664525*this.Z+1)%V,this.Z/V-.5}}var $,J,K,Q=function(){function t(t,e){this.index=0,this.amp=t,this.wl=e,this.fq=1/e,this.psng=new Z,this.a=this.psng.next(),this.b=this.psng.next(),this.pos=[]}return t.prototype.fillPos=function(t){for(;this.index<t;)this.index%this.wl==0?(this.a=this.b,this.b=this.psng.next(),this.pos.push(this.a*this.amp)):this.pos.push((e=this.a,i=this.b,void 0,void 0,r=this.index%this.wl/this.wl*Math.PI,(e*(1-(n=.5*(1-Math.cos(r))))+i*n)*this.amp)),this.index++;var e,i,r,n},t}(),tt=function(t,e,i,r,n){for(var o=[],a=0;a<i;a++)o.push(new Q(t,e)),t/=r,e/=r;return o},et=function(t){var e={pos:[]};if(!t[0].pos)return e;for(var i=0,r=0,n=0;i<t[0].pos.length;i++){for(r=0,n=0;n<t.length;n++)r+=t[n].pos[i];e.pos.push(r)}return e},it=($=function(t,e){return $=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},$(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}$(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),rt=function(){function t(t){var e=t.range,i=t.height,r=t.color,n=t.slopeAngle,o=t.w,a=t.colourGradient;this.range=e,this.height=i,this.color=r,this.rangeCombined=et(e),this.calcuHighestAndLowestYAxis(),this.slopeAngle=n,this.updateOffsetHeight(o),this.colourGradient=a}return t.prototype.updateOffsetHeight=function(t){this.offsetHeight=Math.sin(this.slopeAngle)*t/2,this.offsetHeight=Math.abs(this.offsetHeight)},t.prototype.calcuHighestAndLowestYAxis=function(){this.lowestYAxis=Math.min.apply(Math,this.rangeCombined.pos)+this.height,this.highestYAxis=Math.max.apply(Math,this.rangeCombined.pos)+this.height},t.prototype.updateMountains=function(t,e){this.updateOffsetHeight(e),this.range.forEach((function(t){return t.fillPos(e)})),0===this.height&&(this.height=t),this.rangeCombined=et(this.range),this.calcuHighestAndLowestYAxis()},t.prototype.drawMountain=function(t,e,i){var r,n=this;if(this.colourGradient){var o=t.createLinearGradient(0,this.lowestYAxis,0,i);this.colourGradient.forEach((function(t,e){o.addColorStop(e/n.colourGradient.length,t)})),t.fillStyle=o}else t.fillStyle=this.color,t.strokeStyle=this.color;t.beginPath(),t.lineWidth=0,t.moveTo(0,null!==(r=this.height+this.rangeCombined.pos[0])&&void 0!==r?r:this.height);for(var a=0;a<this.rangeCombined.pos.length;a++){var s=O(a,this.rangeCombined.pos[a]+this.height,e,this.slopeAngle);t.lineTo(a,s)}t.lineTo(e,i),t.lineTo(0,i),t.closePath(),t.fill()},t}(),nt=function(t){function e(e){var i=t.call(this,e)||this;i.treesPos=[],i.treeTotalHeight=2*e.treeMaxHeight,i.treeMaxHeight=e.treeMaxHeight;var r=Math.PI/180*30;i.treeHalfWidth=G(i.treeTotalHeight*r),console.log(i.treeHalfWidth);for(var n=0;n<M;n++)i.generateTree(n);return i}return it(e,t),e.prototype.generateTree=function(t){if(Math.random()<.1){var e=G(z(Math.random(),0,1,this.treeMaxHeight/3,this.treeMaxHeight));this.treesPos.push({x:t,height:e})}},e.prototype.updateMountains=function(t,e){this.updateOffsetHeight(e),this.range.forEach((function(t){return t.fillPos(e)})),0===this.height&&(this.height=t),this.rangeCombined=et(this.range);for(var i=this.treesPos.length;i<e;i++)Math.random()<.01&&this.generateTree(i);this.calcuHighestAndLowestYAxis()},e.prototype.drawTrees=function(t,e,i){var r=this;if(this.colourGradient){var n=t.createLinearGradient(0,this.lowestYAxis,0,i);this.colourGradient.forEach((function(t,e){n.addColorStop(e/r.colourGradient.length,t)})),t.fillStyle=n}else t.fillStyle=this.color,t.strokeStyle=this.color;this.treesPos.forEach((function(i){t.beginPath(),t.lineWidth=0;var n=O(i.x,r.rangeCombined.pos[i.x]+r.height,e,r.slopeAngle),o=n+r.treeTotalHeight,a=n-i.height;t.lineTo(i.x-r.treeHalfWidth,o),t.lineTo(i.x,a),t.lineTo(i.x+r.treeHalfWidth,o),t.closePath(),t.fill()}))},e}(rt),ot=function(t){function e(e){var i=t.call(this,e)||this,r=e.daisies;return i.daisies=r,i}return it(e,t),e.prototype.updateArea=function(t){this.areaProportionalToHeight=t},e.prototype.drawDaisies=function(t,e){e?this.daisies.slice().reverse().forEach((function(e){e.draw(t)})):this.daisies.forEach((function(e){e.draw(t)}))},e}(rt),at=function(){function t(t,e,i){this.x=G(t),this.y=G(e),this.r=G(i)}return t.prototype.draw=function(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI);var e=t.createLinearGradient(this.x,this.y,this.x,this.y+2*this.r);W.forEach((function(t,i){e.addColorStop(i/W.length,t)})),t.fillStyle=e,t.fill(),this.drawSunWaves(t,"#fceeb5","#fceeb5")},t.prototype.drawSunWaves=function(t,e,i){for(var r=this.r,n=0;n<3;n++){t.globalAlpha=1/(n+3);var o=R(e,i,n/3);t.beginPath();var a=r+10+5*(3-n);t.arc(this.x,this.y,a,0,2*Math.PI),r=a,t.fillStyle="".concat(o),t.fill()}t.globalAlpha=1},t}(),st=new at(G(q(M/3,3*M/4)),G(q(S/8,2*S/8)),50+10*Math.random()),ht=null!==(J=document.getElementById("background-layer"))&&void 0!==J?J:new HTMLCanvasElement,lt=null!==(K=ht.getContext("2d"))&&void 0!==K?K:new CanvasRenderingContext2D,ct=ht.width=M,ut=(ht.height=S,[]),pt=[];!function(t){for(var e=.55*S,i=(.5*S-e)/3,r=S/30,n=Math.PI/180*-10,o=-n,a=0;a<2;a++){var s=e+q(i*a,i*(a+1)),h=tt(40,150,2,3),l=[R("#9f5985","#d76ea4",a/2),R("#efab7b","#efab7b",a/2)],c=new nt({color:R("#766972","#a18591",a/2),colourGradient:l,range:h,height:s,daisies:[],slopeAngle:q(n,o),treeMaxHeight:r});t.push(c)}}(pt);var dt=function(t){var e=t.createLinearGradient(0,0,0,300);X.forEach((function(t,i){e.addColorStop(i/X.length,t)})),t.fillStyle=e,t.fillRect(0,0,ct,ht.height)},gt=function(t,e){t.globalCompositeOperation="destination-over",e&&t.clearRect(0,0,ct,ht.height),pt.forEach((function(e,i){e.updateMountains(S/(i+1),M),e.drawTrees(t,M,S),e.drawMountain(t,M,S)})),C.forEach((function(e,i){e.updateMountains(S/(i+1),M),e.drawMountain(t,M,S)})),ut.forEach((function(e){return e.draw(t)})),st.draw(t),t.globalCompositeOperation="destination-over",dt(t)},ft=function(){ht.height=S,ct=ht.width=M,gt(lt)};!function(){for(var t=.45*S,e=(.25*S-t)/3,i=0;i<2;i++){var r=t+q(e*i,e*(i+1)),n=tt(100,150,2,3),o=[R("#f88dac","#ffbf85",i/2),R("#efab7b","#efab7b",i/2)],a=new rt({color:R("#766972","#a18591",i/2),colourGradient:o,range:n,height:r,daisies:[],slopeAngle:q(-Math.PI/12,Math.PI/12)});C.push(a)}}(),function(){for(var t=G(q(2,4)),e=function(t){var e=0,i=!1,r=function(){i=!1;var t=new U;ut.forEach((function(e){var r,n,o,a;i=i||(n=e,o=[[(r=t).x,r.y],[r.x2,r.y2]],a=[[n.x,n.y],[n.x2,n.y2]],(o[0][0]<a[0][0]&&a[0][0]<o[1][0]||o[0][0]<a[1][0]&&a[1][0]<o[1][0]||a[0][0]<o[0][0]&&o[1][0]<a[1][0])&&(o[0][1]<a[0][1]&&a[0][1]<o[1][1]||o[0][1]<a[1][1]&&a[1][1]<o[1][1]||a[0][1]<o[0][1]&&o[1][1]<a[1][1]))})),i||ut.push(t),e++};do{r()}while(i&&e<20)},i=0;i<t;i++)e()}();var _t,mt,vt=i(222),wt=function(){return wt=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},wt.apply(this,arguments)},yt=(_t=new(i.n(vt)())).setColorGradient.apply(_t,["#131930","#d15c02","#ec9400"]).setMidpoint(20);addEventListener("resize",(function(){return xt()})),["..\\tmp\\ref\\minhaFlor1.svg","..\\tmp\\ref\\minhaFlor2.svg"].forEach((function(t){var e=new Image;e.src=t,x.push(e)})),["..\\tmp\\ref\\minhaFlor1.svg","..\\tmp\\ref\\minhaFlor2.svg"].forEach((function(t){var e=new Image;e.src=t,b.push(e)})),["..\\tmp\\ref\\minhaFlor1.svg","..\\tmp\\ref\\minhaFlor2.svg"].forEach((function(t){var e=new Image;e.src=t,A.push(e)}));var xt=function(){y.globalCompositeOperation="destination-over",E.forEach((function(t,e){t.updateMountains(S/(e+1),M)})),E.forEach((function(t,e){if(e>0){var i=t.lowestYAxis,r=E[e-1].highestYAxis;(n=new c(0,O(0,r,M,t.slopeAngle),e*k+P,x[F(x.length)],t.slopeAngle,T)).changeProperties(wt(wt({},T),{viewDist:e*k+P})),t.updateArea(Math.abs(i-r)*M/Math.abs(n.properties.h*n.properties.w))}else{var n,o=t.lowestYAxis;r=S+t.offsetHeight+10,(n=new c(0,O(0,r,M,t.slopeAngle),e*k+P,x[F(x.length)],t.slopeAngle,T)).changeProperties(wt(wt({},T),{viewDist:e*k+P})),t.updateArea(Math.abs(o-r)*M/Math.abs(n.properties.h*n.properties.w))}})),I.updateAreasSum(E),bt()},bt=function(){y.clearRect(0,0,M,S),E.forEach((function(t,e){t.drawDaisies(y),t.drawMountain(y,M,S)}))},At=function(){var t=F(M);I.updateyCoordinates(E,t);var e=I.getHillIndex(q(0,I.areasSum),E),i=e>0?e>1?A[F(x.length)]:b[F(x.length)]:x[F(x.length)];I.createDaisyAtIndex(e,t,E,i)};document.addEventListener("click",(function(t){var e=x[F(x.length)];if(e){var i=Math.random(),r=function(t,e){var i=t.getBoundingClientRect();return{x:G(e.clientX-i.left),y:G(e.clientY-i.top)}}(w,t);!function(t,e,i){for(var r=!1,n=0;n<E.length;n++){var o=new c(t.x,t.y,n*k+P,i,E[n].slopeAngle,T),a=E[n].rangeCombined,s=O(t.x,a.pos[t.x]+E[n].height,M,E[n].slopeAngle),h=s<t.y,l=s<o.properties.y+.15*o.properties.h;if(!h&&l&&!r&&e<.5&&(L(E[n].daisies,o),r=!0),h&&!r&&(L(E[n].daisies,o),r=!0),r)break}}(r,i,e)}bt()})),null===(mt=document.getElementById("canvas"))||void 0===mt||mt.addEventListener("contextmenu",(function(t){gt(y,!1)})),function(){for(var t=.55*S,e=.9*S,i=q(-Math.PI/12,Math.PI/12),r=(t-e)/6,n=0;n<5;n++){var o=e+q(r*n,r*(n+1)),a=tt(30,150,2,3),s=new ot({color:yt.getColor(z(n,0,4,0,20)+1),range:a,height:o,daisies:[],slopeAngle:i,w:M});E.push(s)}}(),xt(),bt(),ft(),document.getElementById("exportCanvasSvg").onclick=function(){var t=new _({width:M,height:S});t.clearRect(0,0,M,S),function(t){dt(t),st.draw(t),ut.forEach((function(e){return e.draw(t)})),C.slice().reverse().forEach((function(e){e.drawMountain(t,M,S)})),pt.slice().reverse().forEach((function(e,i){e.updateMountains(S/(i+1),M),e.drawMountain(t,M,S),e.drawTrees(t,M,S)})),t.globalCompositeOperation="destination-over"}(t),E.slice().reverse().forEach((function(e,i){e.drawMountain(t,M,S),e.drawDaisies(t,!0)})),function(t,e){var i=(new XMLSerializer).serializeToString(t);i.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(i=i.replace(/^<svg/,'<svg xmlns="http://www.w3.org/2000/svg"')),i.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(i=i.replace(/^<svg/,'<svg xmlns:xlink="http://www.w3.org/1999/xlink"')),i='<?xml version="1.0" standalone="no"?>\r\n'+i;var r="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(i),n=document.createElement("a");n.href=r,n.download="mySVG.svg",document.body.appendChild(n),n.click(),document.body.removeChild(n)}(t.getSvg())},document.getElementById("exportCanvasPng").onclick=function(){var t,e,i=null!==(t=document.getElementById("hiddenCanvas"))&&void 0!==t?t:new HTMLCanvasElement,r=null!==(e=i.getContext("2d"))&&void 0!==e?e:new CanvasRenderingContext2D;i.width=M,i.height=S,r.globalCompositeOperation="destination-over",r.clearRect(0,0,M,S),E.forEach((function(t){t.drawMountain(r,M,S)})),r.globalCompositeOperation="destination-over",gt(r,!1);var n=document.createElement("a");n.download="filename.png",n.href=i.toDataURL(),n.click()},document.getElementById("addFlowers").onclick=function(){xt(),I.updateAreasSum(E);for(var t=0;t<1e3;t++)At();bt()},document.getElementById("removeAllFlowers").onclick=function(){E.forEach((function(t){return t.daisies=[]})),bt()}})()})();