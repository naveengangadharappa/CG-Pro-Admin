(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{100:function(e,a,t){"use strict";var n=t(11),r=t(12),l=t(13),c=t(86),i=t.n(c),o=t(0),s=t.n(o),m=t(87),u=function(e){function a(){return e.apply(this,arguments)||this}return Object(l.a)(a,e),a.prototype.render=function(){var e=this.props,a=e.bsPrefix,t=e.noGutters,l=e.as,c=e.className,o=Object(r.a)(e,["bsPrefix","noGutters","as","className"]);return s.a.createElement(l,Object(n.a)({},o,{className:i()(c,a,t&&"no-gutters")}))},a}(s.a.Component);u.defaultProps={as:"div",noGutters:!1},a.a=Object(m.a)(u,"row")},117:function(e,a,t){"use strict";var n=t(11),r=t(12),l=t(13),c=t(86),i=t.n(c),o=t(0),s=t.n(o),m=t(89),u=t(87),d=function(e){function a(){return e.apply(this,arguments)||this}return Object(l.a)(a,e),a.prototype.render=function(){var e=this.props,a=e.bsPrefix,t=e.size,l=e.className,c=e.as,o=Object(r.a)(e,["bsPrefix","size","className","as"]);return s.a.createElement(c,Object(n.a)({},o,{className:i()(l,a,t&&a+"-"+t)}))},a}(s.a.Component);d.defaultProps={as:"div"};var p=Object(m.a)("input-group-append"),E=Object(m.a)("input-group-prepend"),b=Object(m.a)("input-group-text",{Component:"span"}),f=Object(u.a)(d,"input-group");f.Text=b,f.Radio=function(e){return s.a.createElement(b,null,s.a.createElement("input",Object(n.a)({type:"radio"},e)))},f.Checkbox=function(e){return s.a.createElement(b,null,s.a.createElement("input",Object(n.a)({type:"checkbox"},e)))},f.Append=p,f.Prepend=E,a.a=f},118:function(e,a,t){"use strict";var n=t(11),r=t(12),l=t(86),c=t.n(l),i=t(0),o=t.n(i),s=t(89),m=t(87),u=t(88);function d(e){var a=e.bsPrefix,t=e.innerRef,l=e.className,i=e.children,s=e.controlId,m=e.as,d=Object(r.a)(e,["bsPrefix","innerRef","className","children","controlId","as"]);return o.a.createElement(u.a.Provider,{value:{controlId:s}},o.a.createElement(m,Object(n.a)({},d,{ref:t,className:c()(l,a)}),i))}d.defaultProps={as:"div"};var p=Object(m.a)(d,"form-group"),E=t(98),b=t(13),f=t(94);function h(e){var a=e.id,t=e.bsPrefix,l=e.className,i=e.isValid,s=e.isInvalid,m=e.innerRef,d=e.isStatic,p=Object(r.a)(e,["id","bsPrefix","className","isValid","isInvalid","innerRef","isStatic"]);return o.a.createElement(u.a.Consumer,null,function(e){var r=e.controlId,u=e.custom;return o.a.createElement("input",Object(n.a)({},p,{ref:m,id:a||r,className:c()(l,!u&&t,u&&"custom-control-input",i&&"is-valid",s&&"is-invalid",d&&"position-static")}))})}h.defaultProps={type:"checkbox"};var x=Object(m.a)(h,"form-check-input");function v(e){var a=e.bsPrefix,t=e.className,l=e.innerRef,i=e.htmlFor,s=Object(r.a)(e,["bsPrefix","className","innerRef","htmlFor"]);return o.a.createElement(u.a.Consumer,null,function(e){var r=e.controlId,m=e.custom;return o.a.createElement("label",Object(n.a)({},s,{ref:l,htmlFor:i||r,className:c()(t,!m&&a,m&&"custom-control-label")}))})}v.defaultProps={type:"checkbox"};var y=Object(m.a)(v,"form-check-label"),N=function(e){function a(){return e.apply(this,arguments)||this}return Object(b.a)(a,e),a.prototype.render=function(){var e=this.props,a=e.id,t=e.bsPrefix,l=e.inline,i=e.disabled,s=e.isValid,m=e.isInvalid,d=e.feedback,p=e.inputRef,E=e.className,b=e.style,h=e.title,v=e.type,N=e.label,O=e.children,g=e.custom,j=Object(r.a)(e,["id","bsPrefix","inline","disabled","isValid","isInvalid","feedback","inputRef","className","style","title","type","label","children","custom"]),P=null!=N&&!1!==N&&!O,C=o.a.createElement(x,Object(n.a)({},j,{type:v,ref:p,isValid:s,isInvalid:m,isStatic:!P,disabled:i}));return o.a.createElement(u.a.Transform,{mapToValue:function(e){var t=e.controlId;return{controlId:a||t,custom:g}}},o.a.createElement("div",{style:b,className:c()(E,!g&&t,g&&"custom-control custom-"+v,l&&(g?"custom-control":t)+"-inline")},O||o.a.createElement(o.a.Fragment,null,C,P&&o.a.createElement(y,{title:h},N),(s||m)&&o.a.createElement(f.a,{type:s?"valid":"invalid"},d))))},a}(o.a.Component);N.defaultProps={type:"checkbox",inline:!1,disabled:!1,isValid:!1,isInvalid:!1,title:""};var O=Object(m.a)(N,{forwardRefAs:"inputRef",prefix:"form-check"});O.Input=x,O.Label=y;var g=O,j=(t(5),t(93)),P=t.n(j),C=t(95);function R(e){var a=e.bsPrefix,t=e.column,l=e.srOnly,i=e.className,s=e.innerRef,m=Object(r.a)(e,["bsPrefix","column","srOnly","className","innerRef"]),u=c()(i,a,l&&"sr-only",t&&"col-form-label");return t?o.a.createElement(C.a,Object(n.a)({},m,{className:u,as:"label"})):o.a.createElement("label",Object(n.a)({},m,{ref:s,className:u}))}R.defaultProps={column:!1,srOnly:!1};var I=P()(u.a,function(e,a){var t=e.controlId;return{htmlFor:a.htmlFor||t}},Object(m.a)(R,"form-label"));function k(e){var a=e.bsPrefix,t=e.className,l=e.innerRef,i=e.as,s=Object(r.a)(e,["bsPrefix","className","innerRef","as"]);return o.a.createElement(i,Object(n.a)({},s,{ref:l,className:c()(t,a)}))}k.defaultProps={as:"small"};var w=Object(m.a)(k,"form-text");function T(e){var a=e.bsPrefix,t=e.inline,l=e.className,i=e.innerRef,s=e.validated,m=e.as,u=Object(r.a)(e,["bsPrefix","inline","className","innerRef","validated","as"]);return o.a.createElement(m,Object(n.a)({},u,{ref:i,className:c()(l,s&&"was-validated",t&&a+"-inline")}))}T.defaultProps={inline:!1,as:"form"};var G=Object(m.a)(T,"form");G.Row=Object(s.a)("form-row"),G.Group=p,G.Control=E.a,G.Check=g,G.Label=I,G.Text=w;a.a=G},208:function(e,a,t){"use strict";var n=t(12),r=t(13),l=t(0),c=t.n(l),i=t(147),o=function(e){function a(){return e.apply(this,arguments)||this}return Object(r.a)(a,e),a.prototype.render=function(){var e=this.props,a=e.title,t=e.children,r=e.bsPrefix,l=e.rootCloseEvent,o=e.variant,s=e.size,m=e.menuRole,u=e.disabled,d=e.href,p=e.id,E=Object(n.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","disabled","href","id"]);return c.a.createElement(i.a,E,c.a.createElement(i.a.Toggle,{id:p,href:d,size:s,variant:o,disabled:u,childBsPrefix:r},a),c.a.createElement(i.a.Menu,{role:m,rootCloseEvent:l},t))},a}(c.a.Component);a.a=o},212:function(e,a,t){"use strict";t.r(a);var n=t(14),r=t(15),l=t(17),c=t(16),i=t(18),o=t(0),s=t.n(o),m=t(100),u=t(95),d=t(96),p=t(118),E=t(157),b=t(117),f=t(98),h=t(208),x=t(147),v=t(29),y=function(e){function a(){return Object(n.a)(this,a),Object(l.a)(this,Object(c.a)(a).apply(this,arguments))}return Object(i.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){return s.a.createElement(v.a,null,s.a.createElement(m.a,null,s.a.createElement(u.a,null,s.a.createElement(d.a,null,s.a.createElement(d.a.Header,null,s.a.createElement(d.a.Title,{as:"h5"},"Basic Component")),s.a.createElement(d.a.Body,null,s.a.createElement("h5",null,"Form controls"),s.a.createElement("hr",null),s.a.createElement(m.a,null,s.a.createElement(u.a,{md:6},s.a.createElement(p.a,null,s.a.createElement(p.a.Group,{controlId:"formBasicEmail"},s.a.createElement(p.a.Label,null,"Email address"),s.a.createElement(p.a.Control,{type:"email",placeholder:"Enter email"}),s.a.createElement(p.a.Text,{className:"text-muted"},"We'll never share your email with anyone else.")),s.a.createElement(p.a.Group,{controlId:"formBasicPassword"},s.a.createElement(p.a.Label,null,"Password"),s.a.createElement(p.a.Control,{type:"password",placeholder:"Password"})),s.a.createElement(p.a.Group,{controlId:"formBasicChecbox"},s.a.createElement(p.a.Check,{type:"checkbox",label:"Check me out"})),s.a.createElement(E.a,{variant:"primary"},"Submit"))),s.a.createElement(u.a,{md:6},s.a.createElement(p.a.Group,{controlId:"exampleForm.ControlInput1"},s.a.createElement(p.a.Label,null,"Text"),s.a.createElement(p.a.Control,{type:"email",placeholder:"Text"})),s.a.createElement(p.a.Group,{controlId:"exampleForm.ControlSelect1"},s.a.createElement(p.a.Label,null,"Example select"),s.a.createElement(p.a.Control,{as:"select"},s.a.createElement("option",null,"1"),s.a.createElement("option",null,"2"),s.a.createElement("option",null,"3"),s.a.createElement("option",null,"4"),s.a.createElement("option",null,"5"))),s.a.createElement(p.a.Group,{controlId:"exampleForm.ControlTextarea1"},s.a.createElement(p.a.Label,null,"Example textarea"),s.a.createElement(p.a.Control,{as:"textarea",rows:"3"})))),s.a.createElement("h5",{className:"mt-5"},"Sizing"),s.a.createElement("hr",null),s.a.createElement(m.a,null,s.a.createElement(u.a,{md:6},s.a.createElement(p.a.Control,{size:"lg",type:"text",placeholder:"Large text",className:"mb-3"}),s.a.createElement(p.a.Control,{type:"text",placeholder:"Normal text",className:"mb-3"}),s.a.createElement(p.a.Control,{size:"sm",type:"text",placeholder:"Small text",className:"mb-3"})),s.a.createElement(u.a,{md:6},s.a.createElement(p.a.Control,{size:"lg",as:"select",className:"mb-3"},s.a.createElement("option",null,"Large select"),s.a.createElement("option",null,"1"),s.a.createElement("option",null,"2"),s.a.createElement("option",null,"3"),s.a.createElement("option",null,"4"),s.a.createElement("option",null,"5")),s.a.createElement(p.a.Control,{as:"select",className:"mb-3"},s.a.createElement("option",null,"Default select"),s.a.createElement("option",null,"1"),s.a.createElement("option",null,"2"),s.a.createElement("option",null,"3"),s.a.createElement("option",null,"4"),s.a.createElement("option",null,"5")))),s.a.createElement("h5",{className:"mt-5"},"Inline"),s.a.createElement("hr",null),s.a.createElement(m.a,null,s.a.createElement(u.a,null,s.a.createElement(p.a,{inline:!0},s.a.createElement(p.a.Group,{className:"mb-2"},s.a.createElement(p.a.Label,{srOnly:!0},"Email"),s.a.createElement(p.a.Control,{plaintext:!0,readOnly:!0,defaultValue:"email@example.com"})),s.a.createElement(p.a.Group,{className:"mb-2 mr-5"},s.a.createElement(p.a.Label,{srOnly:!0},"Password"),s.a.createElement(p.a.Control,{type:"password",placeholder:"Password"})),s.a.createElement(p.a.Group,null,s.a.createElement(E.a,{className:"mb-0"},"Confirm Identity"))))),s.a.createElement("h3",{className:"mt-5"},"Checkboxes and Radios"),s.a.createElement(m.a,null,s.a.createElement(u.a,{md:12},s.a.createElement("h5",{className:"mt-5"},"Checkboxes"),s.a.createElement("hr",null),s.a.createElement(p.a.Group,null,s.a.createElement(p.a.Check,{custom:!0,type:"checkbox",id:"checkbox1",label:"Check this custom checkbox"}))),s.a.createElement(u.a,{md:6},s.a.createElement("h5",{className:"mt-5"},"Radios"),s.a.createElement("hr",null),s.a.createElement(p.a.Group,null,s.a.createElement(p.a.Check,{custom:!0,type:"radio",label:"Toggle this custom radio",name:"supportedRadios",id:"supportedRadio3"}),s.a.createElement(p.a.Check,{custom:!0,type:"radio",label:"Or toggle this other custom radio",name:"supportedRadios",id:"supportedRadio4"})),s.a.createElement("h5",{className:"mt-3"},"Inline"),s.a.createElement("hr",null),s.a.createElement(p.a.Group,null,s.a.createElement(p.a.Check,{inline:!0,custom:!0,type:"radio",label:"Toggle this custom radio",name:"supportedRadio",id:"supportedRadio21"}),s.a.createElement(p.a.Check,{inline:!0,custom:!0,type:"radio",label:"Or toggle this other custom radio",name:"supportedRadio",id:"supportedRadio22"}))),s.a.createElement(u.a,{md:6},s.a.createElement("h5",{className:"mt-5"},"Range"),s.a.createElement("hr",null),s.a.createElement(p.a.Label,{htmlFor:"customRange1"},"Example range"),s.a.createElement("input",{type:"range",className:"custom-range",defaultValue:"22",id:"customRange1"}),s.a.createElement(p.a.Label,{htmlFor:"customRange2"},"Example range"),s.a.createElement("input",{type:"range",className:"custom-range",min:"0",defaultValue:"3",max:"5",id:"customRange2"}),s.a.createElement(p.a.Label,{htmlFor:"customRange3"},"Example range"),s.a.createElement("input",{type:"range",className:"custom-range",min:"0",defaultValue:"1.5",max:"5",step:"0.5",id:"customRange3"}))))),s.a.createElement(d.a,null,s.a.createElement(d.a.Header,null,s.a.createElement(d.a.Title,{as:"h5"},"Input Group")),s.a.createElement(d.a.Body,null,s.a.createElement(m.a,null,s.a.createElement(u.a,{md:12},s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Text,{id:"basic-addon1"},"@")),s.a.createElement(f.a,{placeholder:"Username","aria-label":"Username","aria-describedby":"basic-addon1"})),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(f.a,{placeholder:"Recipient's username","aria-label":"Recipient's username","aria-describedby":"basic-addon2"}),s.a.createElement(b.a.Append,null,s.a.createElement(b.a.Text,{id:"basic-addon2"},"@example.com"))),s.a.createElement("label",{htmlFor:"basic-url"},"Your vanity URL"),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Text,{id:"basic-addon3"},"https://example.com/users/")),s.a.createElement(f.a,{id:"basic-url","aria-describedby":"basic-addon3"})),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Text,null,"$")),s.a.createElement(f.a,{"aria-label":"Amount (to the nearest dollar)"}),s.a.createElement(b.a.Append,null,s.a.createElement(b.a.Text,null,".00"))),s.a.createElement(b.a,null,s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Text,null,"With textarea")),s.a.createElement(f.a,{as:"textarea","aria-label":"With textarea"}))),s.a.createElement(u.a,{md:6},s.a.createElement("h5",{className:"mt-5"},"Sizing"),s.a.createElement("hr",null),s.a.createElement(b.a,{size:"sm",className:"mb-3"},s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Text,{id:"inputGroup-sizing-sm"},"Small")),s.a.createElement(f.a,{"aria-label":"Small","aria-describedby":"inputGroup-sizing-sm"})),s.a.createElement("br",null),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Text,{id:"inputGroup-sizing-default"},"Default")),s.a.createElement(f.a,{"aria-label":"Default","aria-describedby":"inputGroup-sizing-default"})),s.a.createElement("br",null),s.a.createElement(b.a,{size:"lg"},s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Text,{id:"inputGroup-sizing-lg"},"Large")),s.a.createElement(f.a,{"aria-label":"Large","aria-describedby":"inputGroup-sizing-sm"}))),s.a.createElement(u.a,{md:6},s.a.createElement("h5",{className:"mt-5"},"Checkboxes and radios"),s.a.createElement("hr",null),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Checkbox,{"aria-label":"Checkbox for following text input"})),s.a.createElement(f.a,{"aria-label":"Text input with checkbox"})),s.a.createElement(b.a,null,s.a.createElement(b.a.Prepend,null,s.a.createElement(b.a.Radio,{"aria-label":"Radio button for following text input"})),s.a.createElement(f.a,{"aria-label":"Text input with radio button"})))),s.a.createElement("h5",{className:"mt-5"},"Button Addons"),s.a.createElement("hr",null),s.a.createElement(m.a,null,s.a.createElement(u.a,{md:6},s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(b.a.Prepend,null,s.a.createElement(E.a,null,"Button")),s.a.createElement(f.a,{"aria-describedby":"basic-addon1"})),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(f.a,{placeholder:"Recipient's username","aria-label":"Recipient's username","aria-describedby":"basic-addon2"}),s.a.createElement(b.a.Append,null,s.a.createElement(E.a,null,"Button")))),s.a.createElement(u.a,{md:6},s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(b.a.Prepend,null,s.a.createElement(E.a,null,"Button"),s.a.createElement(E.a,{variant:"secondary"},"Button")),s.a.createElement(f.a,{"aria-describedby":"basic-addon1"})),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(f.a,{placeholder:"Recipient's username","aria-label":"Recipient's username","aria-describedby":"basic-addon2"}),s.a.createElement(b.a.Append,null,s.a.createElement(E.a,{variant:"secondary"},"Button"),s.a.createElement(E.a,null,"Button")))),s.a.createElement(u.a,{md:6},s.a.createElement("h5",{className:"mt-5"},"Buttons With Dropdown"),s.a.createElement("hr",null),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(h.a,{as:b.a.Prepend,title:"Dropdown",id:"input-group-dropdown-1"},s.a.createElement(x.a.Item,{href:"#"},"Action"),s.a.createElement(x.a.Item,{href:"#"},"Another action"),s.a.createElement(x.a.Item,{href:"#"},"Something else here"),s.a.createElement(x.a.Divider,null),s.a.createElement(x.a.Item,{href:"#"},"Separated link")),s.a.createElement(f.a,{"aria-describedby":"basic-addon1"})),s.a.createElement(b.a,null,s.a.createElement(f.a,{placeholder:"Recipient's username","aria-label":"Recipient's username","aria-describedby":"basic-addon2"}),s.a.createElement(h.a,{as:b.a.Append,title:"Dropdown",id:"input-group-dropdown-2"},s.a.createElement(x.a.Item,{href:"#"},"Action"),s.a.createElement(x.a.Item,{href:"#"},"Another action"),s.a.createElement(x.a.Item,{href:"#"},"Something else here"),s.a.createElement(x.a.Divider,null),s.a.createElement(x.a.Item,{href:"#"},"Separated link")))),s.a.createElement(u.a,{md:6},s.a.createElement("h5",{className:"mt-5"},"Segmented  Buttons"),s.a.createElement("hr",null),s.a.createElement(b.a,{className:"mb-3"},s.a.createElement(x.a,{as:b.a.Prepend},s.a.createElement(E.a,{variant:"secondary"},"Action"),s.a.createElement(x.a.Toggle,{split:!0,variant:"secondary",id:"dropdown-split-basic-1"}),s.a.createElement(x.a.Menu,null,s.a.createElement(x.a.Item,{hred:"#/action-1"},"Action"),s.a.createElement(x.a.Item,{hred:"#/action-2"},"Another action"),s.a.createElement(x.a.Item,{hred:"#/action-3"},"Something else"))),s.a.createElement(f.a,{"aria-describedby":"basic-addon1"})),s.a.createElement(b.a,null,s.a.createElement(f.a,{placeholder:"Recipient's username","aria-label":"Recipient's username","aria-describedby":"basic-addon2"}),s.a.createElement(x.a,{as:b.a.Append},s.a.createElement(E.a,{variant:"secondary"},"Action"),s.a.createElement(x.a.Toggle,{split:!0,variant:"secondary",id:"dropdown-split-basic-2"}),s.a.createElement(x.a.Menu,null,s.a.createElement(x.a.Item,{hred:"#/action-1"},"Action"),s.a.createElement(x.a.Item,{hred:"#/action-2"},"Another action"),s.a.createElement(x.a.Item,{hred:"#/action-3"},"Something else")))))))))))}}]),a}(s.a.Component);a.default=y},88:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(97),c=t.n(l),i=r.a.createContext({controlId:void 0});i.Transform=c()(i),a.a=i},90:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=r.a.createContext(null)},94:function(e,a,t){"use strict";var n=t(11),r=t(12),l=t(13),c=t(86),i=t.n(c),o=t(0),s=t.n(o),m=function(e){function a(){return e.apply(this,arguments)||this}return Object(l.a)(a,e),a.prototype.render=function(){var e=this.props,a=e.as,t=e.className,l=e.type,c=Object(r.a)(e,["as","className","type"]);return s.a.createElement(a,Object(n.a)({},c,{className:i()(t,l&&l+"-feedback")}))},a}(s.a.Component);m.defaultProps={type:"valid",as:"div"},a.a=m},95:function(e,a,t){"use strict";var n=t(11),r=t(12),l=t(13),c=t(86),i=t.n(c),o=t(0),s=t.n(o),m=t(87),u=["xl","lg","md","sm","xs"],d=function(e){function a(){return e.apply(this,arguments)||this}return Object(l.a)(a,e),a.prototype.render=function(){var e=this.props,a=e.bsPrefix,t=e.className,l=e.as,c=Object(r.a)(e,["bsPrefix","className","as"]),o=[],m=[];return u.forEach(function(e){var t,n,r,l=c[e];if(delete c[e],null!=l&&"object"===typeof l){var i=l.span;t=void 0===i||i,n=l.offset,r=l.order}else t=l;var s="xs"!==e?"-"+e:"";null!=t&&o.push(!0===t?""+a+s:""+a+s+"-"+t),null!=r&&m.push("order"+s+"-"+r),null!=n&&m.push("offset"+s+"-"+n)}),o.length||o.push(a),s.a.createElement(l,Object(n.a)({},c,{className:i.a.apply(void 0,[t].concat(o,m))}))},a}(s.a.Component);d.defaultProps={as:"div"},a.a=Object(m.a)(d,"col")},96:function(e,a,t){"use strict";var n=t(11),r=t(12),l=t(13),c=t(86),i=t.n(c),o=t(0),s=t.n(o),m=t(87),u=t(89),d=function(e){return s.a.forwardRef(function(a,t){return s.a.createElement("div",Object(n.a)({},a,{ref:t,className:i()(a.className,e)}))})},p=t(90),E=function(e){function a(){return e.apply(this,arguments)||this}return Object(l.a)(a,e),a.prototype.render=function(){var e=this.props,a=e.bsPrefix,t=e.className,l=e.variant,c=e.as,o=Object(r.a)(e,["bsPrefix","className","variant","as"]),m=l?a+"-"+l:a;return s.a.createElement(c,Object(n.a)({className:i()(m,t)},o))},a}(s.a.Component);E.defaultProps={as:"img",variant:null};var b=Object(m.a)(E,"card-img"),f=Object(u.a)("card-body"),h=function(e){function a(){for(var a,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(a=e.call.apply(e,[this].concat(n))||this).state={},a}return Object(l.a)(a,e),a.getDerivedStateFromProps=function(e){return{cardContext:{cardHeaderBsPrefix:e.bsPrefix+"-header"}}},a.prototype.render=function(){var e=this.props,a=e.bsPrefix,t=e.className,l=e.as,c=e.bg,o=e.text,m=e.border,u=e.body,d=e.children,E=Object(r.a)(e,["bsPrefix","className","as","bg","text","border","body","children"]),b=i()(t,a,c&&"bg-"+c,o&&"text-"+o,m&&"border-"+m);return s.a.createElement(p.a.Provider,{value:this.state.cardContext},s.a.createElement(l,Object(n.a)({className:b},E),u?s.a.createElement(f,null,d):d))},a}(s.a.Component);h.defaultProps={as:"div",body:!1};var x=d("h5"),v=d("h6"),y=Object(m.a)(h,"card");y.Img=b,y.Title=Object(u.a)("card-title",{Component:x}),y.Subtitle=Object(u.a)("card-subtitle",{Component:v}),y.Body=f,y.Link=Object(u.a)("card-link",{Component:"a"}),y.Text=Object(u.a)("card-text",{Component:"p"}),y.Header=Object(u.a)("card-header"),y.Footer=Object(u.a)("card-footer"),y.ImgOverlay=Object(u.a)("card-img-overlay");a.a=y},97:function(e,a,t){"use strict";a.__esModule=!0,a.default=function(e){return(0,r.default)(function(a){return n.default.createElement(e.Consumer,null,function(t){return n.default.createElement(e.Provider,{value:a.mapToValue(t)},a.children)})},{displayName:"ContextTransformer"})};var n=l(t(0)),r=l(t(101));function l(e){return e&&e.__esModule?e:{default:e}}},98:function(e,a,t){"use strict";var n=t(11),r=t(12),l=t(13),c=t(86),i=t.n(c),o=t(0),s=t.n(o),m=(t(5),t(93)),u=t.n(m),d=t(94),p=t(88),E=t(87),b=function(e){function a(){return e.apply(this,arguments)||this}return Object(l.a)(a,e),a.prototype.render=function(){var e,a,t=this.props,l=t.bsPrefix,c=t.type,o=t.size,m=t.id,u=t.inputRef,d=t.className,p=t.isValid,E=t.isInvalid,b=t.plaintext,f=t.readOnly,h=t.as,x=Object(r.a)(t,["bsPrefix","type","size","id","inputRef","className","isValid","isInvalid","plaintext","readOnly","as"]);if(b)(a={})[l+"-plaintext"]=!0,e=a;else if("file"===c){var v;(v={})[l+"-file"]=!0,e=v}else{var y;(y={})[l]=!0,y[l+"-"+o]=o,e=y}return s.a.createElement(h,Object(n.a)({},x,{type:c,id:m,ref:u,readOnly:f,className:i()(d,e,p&&"is-valid",E&&"is-invalid")}))},a}(s.a.Component);b.defaultProps={as:"input"};var f=u()(p.a,function(e,a){var t=e.controlId;return{id:a.id||t}},Object(E.a)(b,{prefix:"form-control",forwardRefAs:"inputRef"}));f.Feedback=d.a,a.a=f}}]);
//# sourceMappingURL=11.611fbb59.chunk.js.map