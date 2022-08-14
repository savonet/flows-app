(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9081:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(6599)}])},6599:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return C}});var d=c(1527),e=c(3103),f=c(7573),g=c(3157),h=function(){var a=(0,f.Rx)().bounds,b=a?"?north=".concat(a.north,"&east=").concat(a.east,"&south=").concat(a.south,"&west=").concat(a.west):"",c=(0,g.N)(b,200);return(0,e.WE)("/radios".concat(c))},i=c(959),j=c(4961),k={1:"grid-cols-1",2:"grid-cols-2",3:"grid-cols-3"},l=(0,d.jsx)("svg",{className:"h-5 w-5 fill-neutral-900 group-hover:fill-neutral-500 stroke-neutral-900 group-hover:stroke-neutral-500",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("polygon",{points:"5 3 19 12 5 21 5 3"})}),m=(0,d.jsxs)("svg",{className:"h-5 w-5 fill-neutral-900 group-hover:fill-neutral-500 stroke-neutral-900 group-hover:stroke-neutral-500",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,d.jsx)("line",{x1:"6",y1:"19",x2:"6",y2:"5"}),(0,d.jsx)("line",{x1:"17",y1:"5",x2:"17",y2:"19"})]}),n=function(a){var b=a.stream,c=(0,j.Y)(),e=c.paused,f=c.play,g=c.playing,h=c.toggle,k=(0,i.useCallback)(function(a){if(a.preventDefault(),(null==g?void 0:g.id)===b.id)return h();f(b)},[f,g,b,h]);return(0,d.jsxs)("div",{className:"flex flex-col items-center pb-4",children:[(0,d.jsx)("button",{className:"flex items-center justify-center group rounded-full w-8 h-8 ring-2 ring-gray-100",onClick:k,children:(null==g?void 0:g.id)!==b.id||e?l:m}),(0,d.jsx)("a",{href:b.url,target:"_blank",className:"text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200 uppercase last:mr-0 mr-1",rel:"noreferrer",children:b.format})]})};function o(a){var b=a.radio,c=b.artist?" by ".concat(b.artist):"",e=b.title?"".concat(b.title).concat(c):"",f=b.logo||"/img/radio-logo.jpg";return(0,d.jsx)("div",{className:"min-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700",children:(0,d.jsxs)("div",{className:"flex flex-col items-center pb-4",children:[(0,d.jsx)("img",{className:"mb-3 mt-3 w-24 h-24 rounded-full shadow-lg",src:f,alt:b.name}),(0,d.jsx)("h5",{className:"mb-1 text-xl font-medium text-gray-900 dark:text-white",children:b.name}),(0,d.jsx)("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:e}),(0,d.jsx)("div",{className:"grid ".concat(k[b.streams.length]||"grid-cols-4"," justify-items-center space-x-0.5 gap-4 py-4 px-6"),children:b.streams.map(function(a){return(0,d.jsx)(n,{stream:a},a.id)})})]})})}var p={1:"grid-cols-1",2:"grid-cols-2",3:"grid-cols-3"};function q(){var a=h();if("loaded"!==a.status)return(0,d.jsx)("p",{children:"Loading.."});var b=a.data.data;return(0,d.jsx)("div",{className:"grid ".concat(p[b.length]||"grid-cols-4"," justify-items-center space-x-0.5 gap-4 py-4 px-6"),children:b.map(function(a){return(0,d.jsx)(o,{radio:a},a.name)})})}var r=c(4737),s=c(8316),t=c(2691),u={width:"100%",height:"600px"},v=function(a){var b=a.name,c=a.latitude,e=a.longitude,f=(0,i.useState)(!1),g=f[0],h=f[1];if(!c||!e)return null;var j=function(a){a.stop(),h(!0)},k=function(a){a.stop(),h(!1)};return(0,d.jsx)(t.Jx,{animation:g?google.maps.Animation.BOUNCE:void 0,onMouseOver:j,onMouseOut:k,position:{lat:c,lng:e},title:b})},w=function(a,b){if(a){var c=a.getBounds();c&&b(c.toJSON())}},x=function(a,b){if(a){var c=a.getZoom();c&&b(c)}},y=function(a,b){if(a){var c=a.getCenter();c&&b(c.toJSON())}},z=function(a){var b=(0,t.Db)({googleMapsApiKey:"AIzaSyAyI_VGiugs-XG_1fEW-03hzIaVRMnHwP4"}).isLoaded,c=h(),e=(0,i.useState)(),f=e[0],g=e[1],j=(0,i.useState)(a.zoom)[0],k=(0,i.useState)(a.center),l=k[0],m=a.setZoom,n=a.setCenter,o=a.setBounds,p=(0,i.useCallback)(function(a){return g(a)},[g]),q=(0,i.useCallback)(function(){return g(void 0)},[g]),z=(0,i.useCallback)(function(){return w(f,o)},[o,f]),A=(0,i.useCallback)(function(){return x(f,m)},[m,f]),B=(0,i.useCallback)(function(){return y(f,n)},[n,f]),C="loaded"===c.status?c.data.data:void 0;return b?(0,d.jsx)(t.b6,{mapContainerStyle:u,center:l,onCenterChanged:B,zoom:j,onZoomChanged:A,onBoundsChanged:z,onLoad:p,onUnmount:q,children:C?C.map(function(a,b){return(0,i.createElement)(v,(0,s.Z)((0,r.Z)({},a),{key:b}))}):null}):(0,d.jsx)("p",{children:"Loading map.."})};function A(){var a=(0,f.Rx)();return a.isLoaded?(0,d.jsx)(z,(0,r.Z)({},a)):(0,d.jsx)("p",{children:"Loading map.."})}var B=function(){var a=(0,i.useState)(!0),b=a[0],c=a[1],e=(0,i.useState)(""),f=e[0],g=e[1];return((0,i.useEffect)(function(){g(window.location.origin.replace(/^https:/,"http:")+window.location.pathname),c("http:"===window.location.protocol)},[c,g]),b)?null:(0,d.jsx)("div",{className:"pt-4 grid place-items-center",children:(0,d.jsxs)("div",{className:"w-3/4 bg-orange-100 border border-orange-400 text-orange-700 pl-4 pr-9 py-3 rounded relative",role:"warning",children:[(0,d.jsx)("strong",{className:"font-bold",children:"Warning!"})," ",(0,d.jsxs)("span",{className:"block sm:inline",children:["You are viewing the https version of this page, which may prevent some radios from playing. Feel free to visit the http version of the page at ",(0,d.jsx)("a",{href:f,children:f})]}),(0,d.jsx)("span",{className:"absolute top-0 bottom-0 right-0 px-4 py-3",children:(0,d.jsxs)("svg",{onClick:function(){return c(!0)},className:"fill-current h-6 w-6 text-orange-500",role:"button",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:[(0,d.jsx)("title",{children:"Close"}),(0,d.jsx)("path",{d:"M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"})]})})]})})};function C(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(A,{}),(0,d.jsx)(B,{}),(0,d.jsx)(q,{})]})}}},function(a){a.O(0,[734,774,888,179],function(){var b;return a(a.s=9081)}),_N_E=a.O()}])