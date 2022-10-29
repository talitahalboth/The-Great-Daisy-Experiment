(()=>{"use strict";var t=4294967296;function e(){this.Z=Math.floor(Math.random()*t),this.next=function(){return this.Z=(1664525*this.Z+1)%t,this.Z/t-.5}}var i=function(){function t(t,i){this.index=0,this.amp=t,this.wl=i,this.fq=1/i,this.psng=new e,this.a=this.psng.next(),this.b=this.psng.next(),this.pos=[]}return t.prototype.fillPos=function(t){for(;this.index<t;)this.index%this.wl==0?(this.a=this.b,this.b=this.psng.next(),this.pos.push(this.a*this.amp)):this.pos.push((e=this.a,i=this.b,void 0,void 0,r=this.index%this.wl/this.wl*Math.PI,(e*(1-(n=.5*(1-Math.cos(r))))+i*n)*this.amp)),this.index++;var e,i,r,n},t}(),r=function(t,e,r,n,s){for(var o=[],a=0;a<r;a++)o.push(new i(t,e)),t/=n,e/=n;return o},n=function(t){var e={pos:[]};if(!t[0].pos)return e;for(var i=0,r=0,n=0;i<t[0].pos.length;i++){for(r=0,n=0;n<t.length;n++)r+=t[n].pos[i];e.pos.push(r)}return e};function s(t,e,i){var r,n,s=i.fov,o=i.viewDist,a=i.w,h=i.h;r=i.angle*Math.PI/180;var l=o*(e-h)/(Math.cos(r)*s+(n=Math.sin(r))*(h-e));return[(t-a)/(s/(o+l*n)),l]}function o(t,e,i){var r,n,s,o=i.fov,a=i.viewDist,h=i.w,l=i.h;return r=i.angle*Math.PI/180,n=Math.cos(r),[t*(s=o/(a+e*Math.sin(r)))+h,e*n*s+l]}var a,h,l,p,c,u=function(){return u=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},u.apply(this,arguments)},d=function(t,e,i,r){var n=o(t,e,i),s=o(t+1,e,i),a=Math.abs(s[0]-n[0]);return{x:n[0],y:n[1],w:-a,h:-a*r}},g=function(){function t(t,e,i,r,n,o){this.img=r;var a=r.height/r.width;this.iniX=t,this.iniY=e;var h=j(t,e,M,n),l=s(t,e,u(u({},o),{viewDist:i}));this.properties=d(l[0],l[1],u(u({},o),{viewDist:i}),a);var p=s(t,h,u(u({},o),{viewDist:i})),c=d(p[0],p[1],u(u({},o),{viewDist:i}),a);this.properties.h=Math.abs(c.h),this.properties.w=Math.abs(c.w)}return t.prototype.changeProperties=function(t){var e=s(this.iniX,this.iniY,t),i=d(e[0],e[1],t,this.img.height/this.img.width);this.properties=i},t.prototype.draw=function(t){t.drawImage(this.img,Math.floor(this.properties.x-this.properties.w/2),Math.floor(this.properties.y-this.properties.h/1.5),Math.floor(this.properties.w),Math.floor(this.properties.h))},t}(),f=function(){function t(){this.areasSum=0}return t.prototype.updateAreasSum=function(t){this.areasSum=t.reduce((function(t,e){return t+e.areaProportionalToHeight}),0)},t.prototype.updateyCoordinates=function(t,e){this.yCoordinates=t.map((function(t){return t.rangeCombined.pos[e]+t.height}))},t.prototype.getHillIndex=function(t,e){for(var i=0,r=e[0].areaProportionalToHeight,n=1;n<e.length;n++)t>r&&i++,r+=e[n].areaProportionalToHeight;return i},t.prototype.createDaisyAtIndex=function(t,e,i,r){var n=i[i.length-1].offsetHeight,s={x:e,y:X(i[t].lowestYAxis-10,t-1>=0?i[t-1].highestYAxis:P+n+10)};if(s.y>this.yCoordinates[t]){var o=D(s.x,s.y,M,i[t].slopeAngle),a=new g(s.x,o,t*N+T,r,i[t].slopeAngle,O);Y(i[t].daisies,a)}},t}();function _(t,e){var i,r=Object.keys(e);for(i=0;i<r.length;i++)t=t.replace(new RegExp("\\{"+r[i]+"\\}","gi"),e[r[i]]);return t}function m(t){var e,i,r;if(!t)throw new Error("cannot create a random attribute name for an undefined object");e="ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",i="";do{for(i="",r=0;r<12;r++)i+=e[Math.floor(Math.random()*e.length)]}while(t[i]);return i}function v(t){var e={alphabetic:"alphabetic",hanging:"hanging",top:"text-before-edge",bottom:"text-after-edge",middle:"central"};return e[t]||e.alphabetic}c=function(t,e){var i,r,n,s={};for(t=t.split(","),e=e||10,i=0;i<t.length;i+=2)r="&"+t[i+1]+";",n=parseInt(t[i],e),s[r]="&#"+n+";";return s["\\xa0"]="&#160;",s}("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32),a={strokeStyle:{svgAttr:"stroke",canvas:"#000000",svg:"none",apply:"stroke"},fillStyle:{svgAttr:"fill",canvas:"#000000",svg:null,apply:"fill"},lineCap:{svgAttr:"stroke-linecap",canvas:"butt",svg:"butt",apply:"stroke"},lineJoin:{svgAttr:"stroke-linejoin",canvas:"miter",svg:"miter",apply:"stroke"},miterLimit:{svgAttr:"stroke-miterlimit",canvas:10,svg:4,apply:"stroke"},lineWidth:{svgAttr:"stroke-width",canvas:1,svg:1,apply:"stroke"},globalAlpha:{svgAttr:"opacity",canvas:1,svg:1,apply:"fill stroke"},font:{canvas:"10px sans-serif"},shadowColor:{canvas:"#000000"},shadowOffsetX:{canvas:0},shadowOffsetY:{canvas:0},shadowBlur:{canvas:0},textAlign:{canvas:"start"},textBaseline:{canvas:"alphabetic"},lineDash:{svgAttr:"stroke-dasharray",canvas:[],svg:null,apply:"stroke"}},l=function(t,e){this.__root=t,this.__ctx=e},l.prototype.addColorStop=function(t,e){var i,r=this.__ctx.__createElement("stop");r.setAttribute("offset",t),-1!==e.indexOf("rgba")?(i=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi.exec(e),r.setAttribute("stop-color",_("rgb({r},{g},{b})",{r:i[1],g:i[2],b:i[3]})),r.setAttribute("stop-opacity",i[4])):r.setAttribute("stop-color",e),this.__root.appendChild(r)},p=function(t,e){this.__root=t,this.__ctx=e},(h=function(t){var e,i={width:500,height:500,enableMirroring:!1};if(arguments.length>1?((e=i).width=arguments[0],e.height=arguments[1]):e=t||i,!(this instanceof h))return new h(e);this.width=e.width||i.width,this.height=e.height||i.height,this.enableMirroring=void 0!==e.enableMirroring?e.enableMirroring:i.enableMirroring,this.canvas=this,this.__document=e.document||document,e.ctx?this.__ctx=e.ctx:(this.__canvas=this.__document.createElement("canvas"),this.__ctx=this.__canvas.getContext("2d")),this.__setDefaultStyles(),this.__stack=[this.__getStyleState()],this.__groupStack=[],this.__root=this.__document.createElementNS("http://www.w3.org/2000/svg","svg"),this.__root.setAttribute("version",1.1),this.__root.setAttribute("xmlns","http://www.w3.org/2000/svg"),this.__root.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),this.__root.setAttribute("width",this.width),this.__root.setAttribute("height",this.height),this.__ids={},this.__defs=this.__document.createElementNS("http://www.w3.org/2000/svg","defs"),this.__root.appendChild(this.__defs),this.__currentElement=this.__document.createElementNS("http://www.w3.org/2000/svg","g"),this.__root.appendChild(this.__currentElement)}).prototype.__createElement=function(t,e,i){void 0===e&&(e={});var r,n,s=this.__document.createElementNS("http://www.w3.org/2000/svg",t),o=Object.keys(e);for(i&&(s.setAttribute("fill","none"),s.setAttribute("stroke","none")),r=0;r<o.length;r++)n=o[r],s.setAttribute(n,e[n]);return s},h.prototype.__setDefaultStyles=function(){var t,e,i=Object.keys(a);for(t=0;t<i.length;t++)this[e=i[t]]=a[e].canvas},h.prototype.__applyStyleState=function(t){var e,i,r=Object.keys(t);for(e=0;e<r.length;e++)this[i=r[e]]=t[i]},h.prototype.__getStyleState=function(){var t,e,i={},r=Object.keys(a);for(t=0;t<r.length;t++)i[e=r[t]]=this[e];return i},h.prototype.__applyStyleToCurrentElement=function(t){var e=this.__currentElement,i=this.__currentElementsToStyle;i&&(e.setAttribute(t,""),e=i.element,i.children.forEach((function(e){e.setAttribute(t,"")})));var r,n,s,o,h,c=Object.keys(a);for(r=0;r<c.length;r++)if(n=a[c[r]],s=this[c[r]],n.apply)if(s instanceof p){if(s.__ctx)for(;s.__ctx.__defs.childNodes.length;)o=s.__ctx.__defs.childNodes[0].getAttribute("id"),this.__ids[o]=o,this.__defs.appendChild(s.__ctx.__defs.childNodes[0]);e.setAttribute(n.apply,_("url(#{id})",{id:s.__root.getAttribute("id")}))}else if(s instanceof l)e.setAttribute(n.apply,_("url(#{id})",{id:s.__root.getAttribute("id")}));else if(-1!==n.apply.indexOf(t)&&n.svg!==s)if("stroke"!==n.svgAttr&&"fill"!==n.svgAttr||-1===s.indexOf("rgba")){var u=n.svgAttr;if("globalAlpha"===c[r]&&(u=t+"-"+n.svgAttr,e.getAttribute(u)))continue;e.setAttribute(u,s)}else{h=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi.exec(s),e.setAttribute(n.svgAttr,_("rgb({r},{g},{b})",{r:h[1],g:h[2],b:h[3]}));var d=h[4],g=this.globalAlpha;null!=g&&(d*=g),e.setAttribute(n.svgAttr+"-opacity",d)}},h.prototype.__closestGroupOrSvg=function(t){return"g"===(t=t||this.__currentElement).nodeName||"svg"===t.nodeName?t:this.__closestGroupOrSvg(t.parentNode)},h.prototype.getSerializedSvg=function(t){var e,i,r,n,s,o=(new XMLSerializer).serializeToString(this.__root);if(/xmlns="http:\/\/www\.w3\.org\/2000\/svg".+xmlns="http:\/\/www\.w3\.org\/2000\/svg/gi.test(o)&&(o=o.replace('xmlns="http://www.w3.org/2000/svg','xmlns:xlink="http://www.w3.org/1999/xlink')),t)for(e=Object.keys(c),i=0;i<e.length;i++)r=e[i],n=c[r],(s=new RegExp(r,"gi")).test(o)&&(o=o.replace(s,n));return o},h.prototype.getSvg=function(){return this.__root},h.prototype.save=function(){var t=this.__createElement("g"),e=this.__closestGroupOrSvg();this.__groupStack.push(e),e.appendChild(t),this.__currentElement=t,this.__stack.push(this.__getStyleState())},h.prototype.restore=function(){this.__currentElement=this.__groupStack.pop(),this.__currentElementsToStyle=null,this.__currentElement||(this.__currentElement=this.__root.childNodes[1]);var t=this.__stack.pop();this.__applyStyleState(t)},h.prototype.__addTransform=function(t){var e=this.__closestGroupOrSvg();if(e.childNodes.length>0){"path"===this.__currentElement.nodeName&&(this.__currentElementsToStyle||(this.__currentElementsToStyle={element:e,children:[]}),this.__currentElementsToStyle.children.push(this.__currentElement),this.__applyCurrentDefaultPath());var i=this.__createElement("g");e.appendChild(i),this.__currentElement=i}var r=this.__currentElement.getAttribute("transform");r?r+=" ":r="",r+=t,this.__currentElement.setAttribute("transform",r)},h.prototype.scale=function(t,e){void 0===e&&(e=t),this.__addTransform(_("scale({x},{y})",{x:t,y:e}))},h.prototype.rotate=function(t){var e=180*t/Math.PI;this.__addTransform(_("rotate({angle},{cx},{cy})",{angle:e,cx:0,cy:0}))},h.prototype.translate=function(t,e){this.__addTransform(_("translate({x},{y})",{x:t,y:e}))},h.prototype.transform=function(t,e,i,r,n,s){this.__addTransform(_("matrix({a},{b},{c},{d},{e},{f})",{a:t,b:e,c:i,d:r,e:n,f:s}))},h.prototype.beginPath=function(){var t;this.__currentDefaultPath="",this.__currentPosition={},t=this.__createElement("path",{},!0),this.__closestGroupOrSvg().appendChild(t),this.__currentElement=t},h.prototype.__applyCurrentDefaultPath=function(){var t=this.__currentElement;"path"===t.nodeName?t.setAttribute("d",this.__currentDefaultPath):console.error("Attempted to apply path command to node",t.nodeName)},h.prototype.__addPathCommand=function(t){this.__currentDefaultPath+=" ",this.__currentDefaultPath+=t},h.prototype.moveTo=function(t,e){"path"!==this.__currentElement.nodeName&&this.beginPath(),this.__currentPosition={x:t,y:e},this.__addPathCommand(_("M {x} {y}",{x:t,y:e}))},h.prototype.closePath=function(){this.__currentDefaultPath&&this.__addPathCommand("Z")},h.prototype.lineTo=function(t,e){this.__currentPosition={x:t,y:e},this.__currentDefaultPath.indexOf("M")>-1?this.__addPathCommand(_("L {x} {y}",{x:t,y:e})):this.__addPathCommand(_("M {x} {y}",{x:t,y:e}))},h.prototype.bezierCurveTo=function(t,e,i,r,n,s){this.__currentPosition={x:n,y:s},this.__addPathCommand(_("C {cp1x} {cp1y} {cp2x} {cp2y} {x} {y}",{cp1x:t,cp1y:e,cp2x:i,cp2y:r,x:n,y:s}))},h.prototype.quadraticCurveTo=function(t,e,i,r){this.__currentPosition={x:i,y:r},this.__addPathCommand(_("Q {cpx} {cpy} {x} {y}",{cpx:t,cpy:e,x:i,y:r}))};var w=function(t){var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]);return[t[0]/e,t[1]/e]};h.prototype.arcTo=function(t,e,i,r,n){var s=this.__currentPosition&&this.__currentPosition.x,o=this.__currentPosition&&this.__currentPosition.y;if(void 0!==s&&void 0!==o){if(n<0)throw new Error("IndexSizeError: The radius provided ("+n+") is negative.");if(s===t&&o===e||t===i&&e===r||0===n)this.lineTo(t,e);else{var a=w([s-t,o-e]),h=w([i-t,r-e]);if(a[0]*h[1]!=a[1]*h[0]){var l=a[0]*h[0]+a[1]*h[1],p=Math.acos(Math.abs(l)),c=w([a[0]+h[0],a[1]+h[1]]),u=n/Math.sin(p/2),d=t+u*c[0],g=e+u*c[1],f=[-a[1],a[0]],_=[h[1],-h[0]],m=function(t){var e=t[0];return t[1]>=0?Math.acos(e):-Math.acos(e)},v=m(f),y=m(_);this.lineTo(d+f[0]*n,g+f[1]*n),this.arc(d,g,n,v,y)}else this.lineTo(t,e)}}},h.prototype.stroke=function(){"path"===this.__currentElement.nodeName&&this.__currentElement.setAttribute("paint-order","fill stroke markers"),this.__applyCurrentDefaultPath(),this.__applyStyleToCurrentElement("stroke")},h.prototype.fill=function(){"path"===this.__currentElement.nodeName&&this.__currentElement.setAttribute("paint-order","stroke fill markers"),this.__applyCurrentDefaultPath(),this.__applyStyleToCurrentElement("fill")},h.prototype.rect=function(t,e,i,r){"path"!==this.__currentElement.nodeName&&this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+r),this.lineTo(t,e+r),this.lineTo(t,e),this.closePath()},h.prototype.fillRect=function(t,e,i,r){var n;n=this.__createElement("rect",{x:t,y:e,width:i,height:r},!0),this.__closestGroupOrSvg().appendChild(n),this.__currentElement=n,this.__applyStyleToCurrentElement("fill")},h.prototype.strokeRect=function(t,e,i,r){var n;n=this.__createElement("rect",{x:t,y:e,width:i,height:r},!0),this.__closestGroupOrSvg().appendChild(n),this.__currentElement=n,this.__applyStyleToCurrentElement("stroke")},h.prototype.__clearCanvas=function(){for(var t=this.__closestGroupOrSvg().getAttribute("transform"),e=this.__root.childNodes[1],i=e.childNodes,r=i.length-1;r>=0;r--)i[r]&&e.removeChild(i[r]);this.__currentElement=e,this.__groupStack=[],t&&this.__addTransform(t)},h.prototype.clearRect=function(t,e,i,r){if(0!==t||0!==e||i!==this.width||r!==this.height){var n,s=this.__closestGroupOrSvg();n=this.__createElement("rect",{x:t,y:e,width:i,height:r,fill:"#FFFFFF"},!0),s.appendChild(n)}else this.__clearCanvas()},h.prototype.createLinearGradient=function(t,e,i,r){var n=this.__createElement("linearGradient",{id:m(this.__ids),x1:t+"px",x2:i+"px",y1:e+"px",y2:r+"px",gradientUnits:"userSpaceOnUse"},!1);return this.__defs.appendChild(n),new l(n,this)},h.prototype.createRadialGradient=function(t,e,i,r,n,s){var o=this.__createElement("radialGradient",{id:m(this.__ids),cx:r+"px",cy:n+"px",r:s+"px",fx:t+"px",fy:e+"px",gradientUnits:"userSpaceOnUse"},!1);return this.__defs.appendChild(o),new l(o,this)},h.prototype.__parseFont=function(){var t=/^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z0-9]+?)\s*$/i.exec(this.font),e={style:t[1]||"normal",size:t[4]||"10px",family:t[6]||"sans-serif",weight:t[3]||"normal",decoration:t[2]||"normal",href:null};return"underline"===this.__fontUnderline&&(e.decoration="underline"),this.__fontHref&&(e.href=this.__fontHref),e},h.prototype.__wrapTextLink=function(t,e){if(t.href){var i=this.__createElement("a");return i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t.href),i.appendChild(e),i}return e},h.prototype.__applyText=function(t,e,i,r){var n,s,o=this.__parseFont(),a=this.__closestGroupOrSvg(),h=this.__createElement("text",{"font-family":o.family,"font-size":o.size,"font-style":o.style,"font-weight":o.weight,"text-decoration":o.decoration,x:e,y:i,"text-anchor":(n=this.textAlign,s={left:"start",right:"end",center:"middle",start:"start",end:"end"},s[n]||s.start),"dominant-baseline":v(this.textBaseline)},!0);h.appendChild(this.__document.createTextNode(t)),this.__currentElement=h,this.__applyStyleToCurrentElement(r),a.appendChild(this.__wrapTextLink(o,h))},h.prototype.fillText=function(t,e,i){this.__applyText(t,e,i,"fill")},h.prototype.strokeText=function(t,e,i){this.__applyText(t,e,i,"stroke")},h.prototype.measureText=function(t){return this.__ctx.font=this.font,this.__ctx.measureText(t)},h.prototype.arc=function(t,e,i,r,n,s){if(r!==n){(r%=2*Math.PI)==(n%=2*Math.PI)&&(n=(n+2*Math.PI-.001*(s?-1:1))%(2*Math.PI));var o,a=t+i*Math.cos(n),h=e+i*Math.sin(n),l=t+i*Math.cos(r),p=e+i*Math.sin(r),c=s?0:1,u=n-r;u<0&&(u+=2*Math.PI),o=s?u>Math.PI?0:1:u>Math.PI?1:0,this.lineTo(l,p),this.__addPathCommand(_("A {rx} {ry} {xAxisRotation} {largeArcFlag} {sweepFlag} {endX} {endY}",{rx:i,ry:i,xAxisRotation:0,largeArcFlag:o,sweepFlag:c,endX:a,endY:h})),this.__currentPosition={x:a,y:h}}},h.prototype.clip=function(){var t=this.__closestGroupOrSvg(),e=this.__createElement("clipPath"),i=m(this.__ids),r=this.__createElement("g");this.__applyCurrentDefaultPath(),t.removeChild(this.__currentElement),e.setAttribute("id",i),e.appendChild(this.__currentElement),this.__defs.appendChild(e),t.setAttribute("clip-path",_("url(#{id})",{id:i})),t.appendChild(r),this.__currentElement=r},h.prototype.drawImage=function(){var t,e,i,r,n,s,o,a,l,p,c,u,d,g,f=Array.prototype.slice.call(arguments),_=f[0],m=0,v=0;if(3===f.length)t=f[1],e=f[2],i=n=_.width,r=s=_.height;else if(5===f.length)t=f[1],e=f[2],i=f[3],r=f[4],n=_.width,s=_.height;else{if(9!==f.length)throw new Error("Inavlid number of arguments passed to drawImage: "+arguments.length);m=f[1],v=f[2],n=f[3],s=f[4],t=f[5],e=f[6],i=f[7],r=f[8]}o=this.__closestGroupOrSvg(),this.__currentElement;var w="translate("+t+", "+e+")";if(_ instanceof h){if((a=_.getSvg().cloneNode(!0)).childNodes&&a.childNodes.length>1){for(l=a.childNodes[0];l.childNodes.length;)g=l.childNodes[0].getAttribute("id"),this.__ids[g]=g,this.__defs.appendChild(l.childNodes[0]);if(p=a.childNodes[1]){var y,b=p.getAttribute("transform");y=b?b+" "+w:w,p.setAttribute("transform",y),o.appendChild(p)}}}else"IMG"===_.nodeName?((c=this.__createElement("image")).setAttribute("width",i),c.setAttribute("height",r),c.setAttribute("preserveAspectRatio","none"),(m||v||n!==_.width||s!==_.height)&&((u=this.__document.createElement("canvas")).width=i,u.height=r,(d=u.getContext("2d")).drawImage(_,m,v,n,s,0,0,i,r),_=u),c.setAttribute("transform",w),c.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","CANVAS"===_.nodeName?_.toDataURL():_.getAttribute("src")),o.appendChild(c)):"CANVAS"===_.nodeName&&((c=this.__createElement("image")).setAttribute("width",i),c.setAttribute("height",r),c.setAttribute("preserveAspectRatio","none"),(u=this.__document.createElement("canvas")).width=i,u.height=r,(d=u.getContext("2d")).imageSmoothingEnabled=!1,d.mozImageSmoothingEnabled=!1,d.oImageSmoothingEnabled=!1,d.webkitImageSmoothingEnabled=!1,d.drawImage(_,m,v,n,s,0,0,i,r),_=u,c.setAttribute("transform",w),c.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",_.toDataURL()),o.appendChild(c))},h.prototype.drawImageSvg=function(){var t,e,i,r,n,s,o,a,h=Array.prototype.slice.call(arguments),l=h[0];if(3===h.length)t=h[1],e=h[2],i=l.width,r=l.height;else if(5===h.length)t=h[1],e=h[2],i=h[3],r=h[4],l.width,l.height;else{if(9!==h.length)throw new Error("Inavlid number of arguments passed to drawImage: "+arguments.length);h[1],h[2],h[3],h[4],t=h[5],e=h[6],i=h[7],r=h[8]}n=this.__closestGroupOrSvg(),this.__currentElement;var p="translate("+t+", "+e+")";if(l instanceof SVGSVGElement&&l.childNodes&&l.childNodes.length>1){var c=parseFloat(l.getAttribute("width")),u=parseFloat(l.getAttribute("height"));l.setAttribute("width",i),l.setAttribute("height",r);var d=i/c,g=r/u;for(s=l.childNodes[0];s.childNodes.length;)a=s.childNodes[0].getAttribute("id"),this.__ids[a]=a,this.__defs.appendChild(s.childNodes[0]);if(o=l.childNodes[1]){var f,_=o.getAttribute("transform");f=_?_+" "+p:p,o.setAttribute("transform",f+" scale("+d+", "+g+")"),n.appendChild(o)}}},h.prototype.createPattern=function(t,e){var i,r=this.__document.createElementNS("http://www.w3.org/2000/svg","pattern"),n=m(this.__ids);return r.setAttribute("id",n),r.setAttribute("width",t.width),r.setAttribute("height",t.height),"CANVAS"===t.nodeName||"IMG"===t.nodeName?((i=this.__document.createElementNS("http://www.w3.org/2000/svg","image")).setAttribute("width",t.width),i.setAttribute("height",t.height),i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","CANVAS"===t.nodeName?t.toDataURL():t.getAttribute("src")),r.appendChild(i),this.__defs.appendChild(r)):t instanceof h&&(r.appendChild(t.__root.childNodes[1]),this.__defs.appendChild(r)),new p(r,this)},h.prototype.setLineDash=function(t){t&&t.length>0?this.lineDash=t.join(","):this.lineDash=null},h.prototype.drawFocusRing=function(){},h.prototype.createImageData=function(){},h.prototype.getImageData=function(){},h.prototype.putImageData=function(){},h.prototype.globalCompositeOperation=function(){},h.prototype.setTransform=function(){};const y=h;var b,x,A=null!==(b=document.getElementById("canvas"))&&void 0!==b?b:new HTMLCanvasElement,E=null!==(x=A.getContext("2d"))&&void 0!==x?x:new CanvasRenderingContext2D,C=[],S=[],k=[],M=A.width=A.getBoundingClientRect().width,P=A.height=A.getBoundingClientRect().height,T=50,N=30,O={fov:1024,angle:-70,grid:20,w:M/2,h:P/2,viewDist:T,deltaDist:N},I=new f,D=function(t,e,i,r){return e+Math.sin(r)*(t-i/2)},j=function(t,e,i,r){return e-Math.sin(r)*(t-i/2)};addEventListener("resize",(function(){return P=A.height=A.getBoundingClientRect().height,M=A.width=A.getBoundingClientRect().width,E.globalCompositeOperation="destination-over",void $()}));var R,F,G=function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},q=function(t){return Math.floor(t)},H=function(t){var e=q(t).toString(16);return 1==e.length?"0"+e:e},z=function(t,e,i){return Math.abs((e-t)*i+t)},L=function(t,e,i){var r,n,s,o,a,h=null!==(r=G(t))&&void 0!==r?r:{r:0,b:0,g:0},l=null!==(n=G(e))&&void 0!==n?n:{r:0,b:0,g:0};return s=z(h.r,l.r,i),o=z(h.g,l.g,i),a=z(h.b,l.b,i),"#"+H(s)+H(o)+H(a)},Y=function(t,e){for(var i=0;i<t.length;i++)if(t[i].properties.y+t[i].properties.h<=e.properties.y+e.properties.h)return void t.splice(i,0,e);t.push(e)},U=function(t,e){return Math.random()*(e-t)+t},B=function(t){return q(Math.random()*t)},X=function(t,e){var i,r,n=Math.random();return q((n*n*n-(i=0))/(1-i)*(e-(r=t))+r)},V=function(){function t(t){var e=t.range,i=t.height,r=t.daisies,s=t.color,o=t.slopeAngle,a=t.w;this.range=e,this.height=i,this.daisies=r,this.color=s,this.rangeCombined=n(e),this.calcuHighestAndLowestYAxis(),this.slopeAngle=o,this.updateOffsetHeight(a)}return t.prototype.updateOffsetHeight=function(t){this.offsetHeight=Math.sin(this.slopeAngle)*t/2,this.offsetHeight=Math.abs(this.offsetHeight)},t.prototype.updateArea=function(t){this.areaProportionalToHeight=t},t.prototype.calcuHighestAndLowestYAxis=function(){this.lowestYAxis=Math.min.apply(Math,this.rangeCombined.pos)+this.height,this.highestYAxis=Math.max.apply(Math,this.rangeCombined.pos)+this.height},t.prototype.updateMountains=function(t,e){this.updateOffsetHeight(e),this.range.forEach((function(t){return t.fillPos(e)})),0===this.height&&(this.height=t),this.rangeCombined=n(this.range),this.calcuHighestAndLowestYAxis()},t.prototype.drawDaisies=function(t,e){e?this.daisies.slice().reverse().forEach((function(e){e.draw(t)})):this.daisies.forEach((function(e){e.draw(t)}))},t.prototype.drawMountain=function(t,e,i){var r;t.fillStyle=this.color,t.strokeStyle=this.color,t.beginPath(),t.moveTo(0,null!==(r=this.height+this.rangeCombined.pos[0])&&void 0!==r?r:this.height);for(var n=0;n<this.rangeCombined.pos.length;n++){var s=D(n,this.rangeCombined.pos[n]+this.height,e,this.slopeAngle);t.lineTo(n,s)}t.lineTo(e,i),t.lineTo(0,i),t.stroke(),t.closePath(),t.fill()},t}(),Z=null!==(R=document.getElementById("background-layer"))&&void 0!==R?R:new HTMLCanvasElement,J=null!==(F=Z.getContext("2d"))&&void 0!==F?F:new CanvasRenderingContext2D,K=Z.width=M,Q=(Z.height=P,function(){function t(t,e,i){this.x=q(t),this.y=q(e),this.r=q(i)}return t.prototype.draw=function(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI),t.fillStyle="#d77538",t.fill()},t}()),W=new Q(q(U(M/3,3*M/4)),q(U(P/8,2*P/8)),50+10*Math.random()),$=function(){Z.height=P,K=Z.width=M,function(t){t.globalCompositeOperation="destination-over",t.clearRect(0,0,K,Z.height),k.forEach((function(t,e){t.updateMountains(P/(e+1),M)})),k.forEach((function(e){e.drawMountain(t,M,P)})),W.draw(t),t.globalCompositeOperation="destination-over";var e=t.createLinearGradient(0,0,0,300);e.addColorStop(0,"#e9e1dc"),e.addColorStop(1,"#FFFFFF"),t.fillStyle=e,t.fillRect(0,0,K,Z.height)}(J)};!function(){for(var t=.45*P,e=(.25*P-t)/3,i=0;i<2;i++){var n=t+U(e*i,e*(i+1)),s=r(100,150,2,3),o=new V({color:L("#d77538","#e4a44b",i/2),range:s,height:n,daisies:[],slopeAngle:0});k.push(o)}}();var tt=function(){return tt=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},tt.apply(this,arguments)};addEventListener("resize",(function(){return et()})),["..\\tmp\\ref\\g12374.svg","..\\tmp\\ref\\g12452.svg","..\\tmp\\ref\\g12496.svg","..\\tmp\\ref\\g12567.svg","..\\tmp\\ref\\g12646.svg","..\\tmp\\ref\\g12751.svg","..\\tmp\\ref\\g12794.svg","..\\tmp\\ref\\g12869.svg","..\\tmp\\ref\\g12957.svg","..\\tmp\\ref\\g13049.svg"].forEach((function(t,e){var i=new Image;i.src=t,C.push(i)}));var et=function(){E.globalCompositeOperation="destination-over",S.forEach((function(t,e){t.updateMountains(P/(e+1),M)})),S.forEach((function(t,e){if(e>0){var i=t.lowestYAxis,r=S[e-1].highestYAxis;(n=new g(0,D(0,r,M,t.slopeAngle),e*N+T,C[B(C.length)],t.slopeAngle,O)).changeProperties(tt(tt({},O),{viewDist:e*N+T})),t.updateArea(Math.abs(i-r)*M/Math.abs(n.properties.h*n.properties.w))}else{var n,s=t.lowestYAxis;r=P+t.offsetHeight+10,(n=new g(0,D(0,r,M,t.slopeAngle),e*N+T,C[B(C.length)],t.slopeAngle,O)).changeProperties(tt(tt({},O),{viewDist:e*N+T})),t.updateArea(Math.abs(s-r)*M/Math.abs(n.properties.h*n.properties.w))}})),I.updateAreasSum(S),it()},it=function(){E.clearRect(0,0,M,P),S.forEach((function(t,e){t.drawDaisies(E),t.drawMountain(E,M,P)}))},rt=function(){var t=B(M);I.updateyCoordinates(S,t);var e=I.getHillIndex(U(0,I.areasSum),S),i=C[B(C.length)];I.createDaisyAtIndex(e,t,S,i)};document.addEventListener("click",(function(t){var e=C[B(C.length)];if(e){var i=Math.random(),r=function(t,e){var i=t.getBoundingClientRect();return{x:q(e.clientX-i.left),y:q(e.clientY-i.top)}}(A,t);!function(t,e,i){for(var r=!1,n=0;n<S.length;n++){var s=new g(t.x,t.y,n*N+T,i,S[n].slopeAngle,O),o=S[n].rangeCombined,a=D(t.x,o.pos[t.x]+S[n].height,M,S[n].slopeAngle),h=a<t.y,l=a<s.properties.y+s.properties.h;if(!h&&l&&!r&&e<.5&&(Y(S[n].daisies,s),r=!0),h&&!r&&(Y(S[n].daisies,s),r=!0),r)break}}(r,i,e)}it()})),function(){for(var t=U(2,5),e=.5*P,i=.9*P,n=U(-Math.PI/12,Math.PI/12),s=(e-i)/(t+1),o=0;o<t;o++){var a=i+U(s*o,s*(o+1)),h=r(60,150,2,3),l=new V({color:L("#2c2e1f","#6e774b",o/t),range:h,height:a,daisies:[],slopeAngle:n,w:M});S.push(l)}}(),et(),it(),$(),document.getElementById("exportCanvas").onclick=function(){var t=new y({width:M,height:P});t.clearRect(0,0,M,P),function(t){var e=t.createLinearGradient(0,0,0,300);e.addColorStop(0,"#e9e1dc"),e.addColorStop(1,"#FFFFFF"),t.fillStyle=e,t.fillRect(0,0,K,Z.height),W.draw(t),k.slice().reverse().forEach((function(e){e.drawMountain(t,M,P)})),t.globalCompositeOperation="destination-over"}(t),S.slice().reverse().forEach((function(e,i){e.drawMountain(t,M,P),e.drawDaisies(t,!0)})),function(t,e){var i=(new XMLSerializer).serializeToString(t);i.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(i=i.replace(/^<svg/,'<svg xmlns="http://www.w3.org/2000/svg"')),i.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(i=i.replace(/^<svg/,'<svg xmlns:xlink="http://www.w3.org/1999/xlink"')),i='<?xml version="1.0" standalone="no"?>\r\n'+i;var r="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(i),n=document.createElement("a");n.href=r,n.download="mySVG.svg",document.body.appendChild(n),n.click(),document.body.removeChild(n)}(t.getSvg())},document.getElementById("addFlowers").onclick=function(){et(),I.updateAreasSum(S);for(var t=0;t<1e3;t++)rt();it()}})();