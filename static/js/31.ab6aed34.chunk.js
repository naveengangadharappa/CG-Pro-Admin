(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{244:function(e,a,t){"use strict";t.r(a);var s=t(2),n=t.n(s),r=t(7),l=t(14),c=t(15),i=t(17),o=t(16),m=t(36),d=t(18),u=t(0),p=t.n(u),h=t(170),b=(t(159),t(29)),v=t(134),g=t(19),E=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(i.a)(this,Object(o.a)(a).call(this,e))).submit=Object(r.a)(n.a.mark(function e(){var a,s,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(String(t.state.empid).length>0&&String(t.state.password).length>0)){e.next=12;break}if(!(String(t.state.password).length<8)){e.next=5;break}t.setState({validation_msg:"Password should br greater then 8 Characters"}),e.next=10;break;case 5:return a={type:"master",userid:t.state.empid,password:t.state.password},e.next=8,Object(g.b)(a);case 8:(s=e.sent).status?t.props.history.push({pathname:"/Users"}):(r=s.message,t.setState({validation_msg:r}));case 10:e.next=13;break;case 12:t.setState({validation_msg:"EmployeeId and Password Required"});case 13:case"end":return e.stop()}},e)})),t.validation=function(){var e=Object(r.a)(n.a.mark(function e(a){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.target.value.includes("+")||a.target.value.includes(" ")||a.target.value.includes("/")||a.target.value.includes("-")?t.setState({validation_empid:"Special chracter not allowed"}):t.setState({empid:a.target.value,validation_empid:""});case 1:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),t.state={empid:"",password:"",validation_msg:"",validation_empid:"",validation_password:"",loading:!1},t.submit=t.submit.bind(Object(m.a)(t)),t}return Object(d.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=this;return p.a.createElement(b.a,null,p.a.createElement(v.a,null),p.a.createElement("div",{className:"auth-wrapper"},p.a.createElement("div",{className:"auth-content"},p.a.createElement("div",{className:"auth-bg"},p.a.createElement("span",{className:"r"}),p.a.createElement("span",{className:"r s"}),p.a.createElement("span",{className:"r s"}),p.a.createElement("span",{className:"r"})),p.a.createElement("div",{className:"card"},p.a.createElement("div",{className:"card-body text-center"},p.a.createElement("div",{className:"mb-4"},p.a.createElement("i",{className:"feather icon-unlock auth-icon"}),p.a.createElement("h5",{className:"mb-2"},"Welcome to CGPro")),p.a.createElement("h3",{className:"mb-4"},"Login"),String(this.state.validation_msg).length>0?p.a.createElement("p",{style:{color:"darkred"}},this.state.validation_msg):null,p.a.createElement("div",{className:"input-group mb-3"},p.a.createElement("input",{type:"text",className:"form-control",placeholder:"EmployeeId",value:this.state.empid,onChange:function(a){e.validation(a)},required:!0})),String(this.state.validation_empid).length>0?p.a.createElement("p",{style:{color:"darkred"}},this.state.validation_empid):null,p.a.createElement("div",{className:"input-group mb-4"},p.a.createElement("input",{type:"password",className:"form-control",placeholder:"password",value:this.state.password,onChange:function(a){e.setState({password:a.target.value})},required:!0})),p.a.createElement("div",{className:"form-group text-left"},p.a.createElement("div",{className:"checkbox checkbox-fill d-inline"},p.a.createElement("input",{type:"checkbox",name:"checkbox-fill-1",id:"checkbox-fill-a1"}),p.a.createElement("label",{htmlFor:"checkbox-fill-a1",className:"cr"}," Save credentials"))),p.a.createElement("button",{className:"btn btn-primary shadow-2 mb-4",onClick:this.submit},"Login"),p.a.createElement("p",{className:"mb-2 text-muted"},"Forgot password? ",p.a.createElement(h.a,{to:"/auth/reset-password-1"},"Reset")),p.a.createElement("p",{className:"mb-0 text-muted"},"Don\u2019t have an account? ",p.a.createElement(h.a,{to:"/auth/signup-1"},"Signup")))))))}}]),a}(p.a.Component);a.default=E}}]);
//# sourceMappingURL=31.ab6aed34.chunk.js.map