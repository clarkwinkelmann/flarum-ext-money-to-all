(()=>{var t={n:o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return t.d(e,{a:e}),e},d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};(()=>{"use strict";t.r(o);const e=flarum.core.compat["forum/app"];var n=t.n(e);const r=flarum.core.compat["common/Model"];var a=t.n(r);function i(t,o){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},i(t,o)}const c=flarum.core.compat["forum/components/Notification"];var u=function(t){var o,e;function r(){return t.apply(this,arguments)||this}e=t,(o=r).prototype=Object.create(e.prototype),o.prototype.constructor=o,i(o,e);var a=r.prototype;return a.icon=function(){return"fas fa-money-bill"},a.href=function(){return n().route.user(n().session.user)},a.content=function(){var t=this.attrs.notification.content(),o=t.amount,e=t.message;if(e)return e;var r=n().forum.attribute("antoinefr-money.moneyname")||"[money]";return n().translator.trans("clarkwinkelmann-money-to-all.forum.notification.moneyReceived",{amount:r.replace("[money]",o+"")})},a.excerpt=function(){return null},r}(t.n(c)());n().initializers.add("clarkwinkelmann-money-to-all",(function(){n().notificationComponents.moneyToAll=u,n().store.models.moneyToAll=a()}))})(),module.exports=o})();
//# sourceMappingURL=forum.js.map