(this["webpackJsonpbidding-project"]=this["webpackJsonpbidding-project"]||[]).push([[0],{27:function(e,s,t){},28:function(e,s,t){},29:function(e,s,t){},30:function(e,s,t){},31:function(e,s,t){},32:function(e,s,t){},33:function(e,s,t){},39:function(e,s,t){},40:function(e,s,t){},41:function(e,s,t){"use strict";t.r(s);var n=t(0),a=t(1),c=t.n(a),i=t(20),r=t.n(i),l=(t(27),t(28),t(2)),d=t(16),j=t(8),o=t(9),h=t(11),b=t(10),p=(t(29),function(e){Object(h.a)(t,e);var s=Object(b.a)(t);function t(e){var n;return Object(j.a)(this,t),(n=s.call(this,e)).change=function(e){var s;n.setState((s={},Object(d.a)(s,e.target.name,e.target.value),Object(d.a)(s,"errorField",""),s),(function(){e.target.value.length<5&&n.setState({error:"Length should be greater than 5",errorField:"username"}),e.target.value.length<10&&n.setState({error:"You need to enter valid phone number",errorField:"userphone"})}))},n.submit=function(e){if(e.preventDefault(),n.state.username&&n.state.userphone&&n.state.useremail&&n.state.password&&n.state.conf_password&&n.state.password===n.state.conf_password){var s=new Headers;s.append("Cookie","sessionid=qbnklw4k1p8ke3ed1gd6z1a5m796iaj1; csrftoken=DgO5MwMCZ0QfveQ9nFnZLTe9hMTQxGYw1rW3dICnHKC2z7CRahDGB88M8sEG8bUE");var t=new FormData;t.append("user_name",n.state.username),t.append("user_phone",n.state.userphone),t.append("user_email",n.state.useremail),t.append("password",n.state.password),fetch("http://localhost:8000/fin/register",{method:"POST",headers:s,body:t,redirect:"follow"}).then((function(e){return e.json()})).then((function(e){return console.log(e.token)}))}},n.sendotp=function(e){if(e.preventDefault(),n.setState({otpsend:!0}),!n.state.otpsend){var s=new Headers;s.append("Cookie","sessionid=qbnklw4k1p8ke3ed1gd6z1a5m796iaj1; csrftoken=DgO5MwMCZ0QfveQ9nFnZLTe9hMTQxGYw1rW3dICnHKC2z7CRahDGB88M8sEG8bUE");var t=new FormData;t.append("user_phone",n.state.userphone),fetch("http://localhost:8000/fin/otpsend",{method:"POST",headers:s,body:t,redirect:"follow"}).then((function(e){return e.json()})).then((function(e){"phone no already exists"===e.detail?n.setState({error:"phone no already exists",errorField:"userphone"}):"error occur in sending otp"===e.detail&&n.setState({errorField:"userphone",error:"error occur in sending otp"}),"otp send successfully"===e.detail&&n.setState({otpsend:!0})}))}},n.verifyotp=function(e){e.preventDefault();var s=new Headers;s.append("Cookie","sessionid=qbnklw4k1p8ke3ed1gd6z1a5m796iaj1; csrftoken=DgO5MwMCZ0QfveQ9nFnZLTe9hMTQxGYw1rW3dICnHKC2z7CRahDGB88M8sEG8bUE");var t=new FormData;t.append("user_phone",n.state.userphone),t.append("otp",n.state.otp),fetch("http://localhost:8000/fin/otpsend",{method:"POST",headers:s,body:t,redirect:"follow"}).then((function(e){return e.json()}))},n.state={username:n.props.username,userphone:n.props.userphone,useremail:n.props.useremail,password:n.props.password,conf_password:n.props.password,error:"",otp:"",otpsend:!1,mobileverified:!1},n}return Object(o.a)(t,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"signup",children:[Object(n.jsx)("div",{className:"left-side",children:Object(n.jsx)("h3",{children:"Signup Page"})}),Object(n.jsx)("div",{className:"form-main",children:Object(n.jsxs)("form",{onSubmit:this.submit,className:"form-all",children:[Object(n.jsxs)("div",{className:"form-in",children:[Object(n.jsx)("label",{children:"Username"}),Object(n.jsx)("input",{onChange:this.change,type:"text",name:"username",value:this.state.username}),"username"===this.state.errorField?this.state.error:null]}),Object(n.jsxs)("div",{className:"form-in",children:[Object(n.jsx)("label",{children:"UserPhone"}),Object(n.jsxs)("div",{className:"form-phone",children:[Object(n.jsx)("input",{onChange:this.change,type:"text",name:"userphone",value:this.state.userphone}),Object(n.jsx)("button",{onClick:this.sendotp,className:"otp-btn",children:"send otp"})]}),this.state.otpsend?Object(n.jsxs)("div",{className:" otp-verify",children:[Object(n.jsx)("label",{children:"Verify Otp"}),Object(n.jsxs)("div",{className:"form-phone",children:[Object(n.jsx)("input",{onChange:this.change,type:"text",name:"otp",value:this.state.otp}),Object(n.jsx)("button",{onClick:this.verifyotp,className:"otp-btn",children:"Verify otp"})]})]}):null,"userphone"===this.state.errorField?this.state.error:null]}),Object(n.jsxs)("div",{className:"form-in",children:[Object(n.jsx)("label",{children:"UserEmail"}),Object(n.jsx)("input",{onChange:this.change,type:"email",name:"useremail",value:this.state.useremail}),"useremail"===this.state.errorField?this.state.error:null]}),Object(n.jsxs)("div",{className:"form-in",children:[Object(n.jsx)("label",{children:"Password"}),Object(n.jsx)("input",{onChange:this.change,type:"password",name:"password",value:this.state.password}),"password"===this.state.errorField?this.state.error:null]}),Object(n.jsxs)("div",{className:"form-in",children:[Object(n.jsx)("label",{children:"Conform Password"}),Object(n.jsx)("input",{onChange:this.change,type:"password",name:"conf_password",value:this.state.conf_password}),"conf_password"===this.state.errorField?this.state.error:null]}),Object(n.jsx)("div",{className:"form-submit",children:Object(n.jsx)("button",{className:"otp-btn",children:"Proceed"})})]})})]})}}]),t}(c.a.Component)),m=(t(30),t(31),function(){return Object(n.jsx)("div",{className:"dashboard",children:Object(n.jsx)("h1",{children:"Dashboard"})})}),x=function(){return Object(n.jsx)("div",{className:"customers",children:Object(n.jsx)("h3",{children:"Customers list"})})},O=(t(32),function(e){Object(h.a)(t,e);var s=Object(b.a)(t);function t(e){var n;return Object(j.a)(this,t),(n=s.call(this,e)).state={mode:"Users"},n}return Object(o.a)(t,[{key:"render",value:function(){var e,s;return s=[{sno:1,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:2,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:1,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:2,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:1,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:2,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:1,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:2,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:1,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:2,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:2,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3},{sno:2,name:"Nani",phone:"9281929394",address:"klsdlkskkls",total_payments:3}],"Users"===this.state.mode?e=Object(n.jsxs)("div",{className:"user-head",children:[Object(n.jsxs)("div",{className:"user-top-bar",children:[Object(n.jsxs)("div",{class:"user-top-side",children:[Object(n.jsx)("svg",{className:"user-chevron",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-chevron-right user-chevron",viewBox:"0 0 16 16",children:Object(n.jsx)("path",{"fill-rule":"evenodd",d:"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"})}),Object(n.jsx)("p",{children:"Manage User"})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("button",{children:"Archived User"}),Object(n.jsx)("button",{children:"Add User"})]})]}),Object(n.jsxs)("div",{className:"user-top-next",children:[Object(n.jsxs)("div",{className:"user-search",children:[Object(n.jsx)("input",{type:"search",placeholder:"Userphone"}),Object(n.jsx)("button",{children:"Find"})]}),Object(n.jsxs)("div",{children:[Object(n.jsxs)("select",{children:[Object(n.jsx)("option",{children:"Customers"}),Object(n.jsx)("option",{children:"Admin"})]}),Object(n.jsxs)("select",{children:[Object(n.jsx)("option",{children:"Active"}),Object(n.jsx)("option",{children:"In Active"})]})]})]}),Object(n.jsxs)("div",{className:"user-data",children:[Object(n.jsxs)("table",{className:"user-table",children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{className:"",children:[Object(n.jsx)("td",{children:"S.No"}),Object(n.jsx)("td",{children:"Name"}),Object(n.jsx)("td",{children:"Phone No"}),Object(n.jsx)("td",{children:"Address"}),Object(n.jsx)("td",{children:"Total Payments"})]})}),Object(n.jsx)("tbody",{children:s.map((function(e,s){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:e.sno}),Object(n.jsx)("td",{children:e.name}),Object(n.jsx)("td",{children:e.phone}),Object(n.jsx)("td",{children:e.address}),Object(n.jsx)("td",{children:e.total_payments})]})}))})]}),Object(n.jsx)("div",{className:"padding"})]})]}):"Adduser"===this.state.mode&&(e=Object(n.jsx)("div",{})),Object(n.jsx)("div",{children:e})}}]),t}(c.a.Component)),u=function(){return Object(n.jsx)("div",{className:"customers",children:Object(n.jsx)("h3",{children:"Customers list"})})},v=(t(33),function(e){Object(h.a)(t,e);var s=Object(b.a)(t);function t(e){var n;return Object(j.a)(this,t),(n=s.call(this,e)).changetopass=function(e){n.setState({mode:"Password",email:!1,phone:!1})},n.changetouser=function(e){n.setState({mode:"User"})},n.changetopic=function(e){n.setState({mode:"Profile",email:!1,phone:!1})},n.sendotp=function(e){e.preventDefault(),n.setState({email:!0,phone:!1}),n.refs.phone.removeAttribute("disabled"),n.refs.mail.setAttribute("disabled","disabled")},n.phoneotp=function(e){e.preventDefault(),n.setState({phone:!0,email:!1}),n.refs.mail.removeAttribute("disabled"),n.refs.phone.setAttribute("disabled","disabled")},n.state={mode:"User",otpsend:!1,phoneotp:!1},n}return Object(o.a)(t,[{key:"render",value:function(){var e;return"User"===this.state.mode?e=Object(n.jsx)("div",{className:"changes",children:Object(n.jsxs)("form",{children:[Object(n.jsxs)("div",{className:"form-r",children:[Object(n.jsx)("label",{className:"label",children:"Username"}),Object(n.jsx)("br",{}),Object(n.jsxs)("div",{className:"input-data",children:[Object(n.jsx)("input",{type:"text",onChange:this.Change,id:"username"}),Object(n.jsx)("button",{className:"linebtn",children:"Change"}),Object(n.jsx)("br",{})]})]}),Object(n.jsxs)("div",{className:"form-r",children:[Object(n.jsx)("label",{className:"label",children:"Useremail"}),Object(n.jsx)("br",{}),Object(n.jsxs)("div",{className:"input-data",children:[Object(n.jsx)("input",{type:"email",onChange:this.Change,id:"useremail"}),Object(n.jsx)("button",{ref:"mail",className:"linebtn",onClick:this.sendotp,children:"send otp"}),Object(n.jsx)("br",{})]})]}),this.state.email?Object(n.jsxs)("div",{className:"form-r",children:[Object(n.jsx)("label",{className:"label",children:"Verify Email"}),Object(n.jsx)("br",{}),Object(n.jsxs)("div",{className:"input-data",children:[Object(n.jsx)("input",{type:"text",onChange:this.Change,id:"useremail"}),Object(n.jsx)("button",{className:"linebtn",children:"Verify"})]})]}):null,Object(n.jsxs)("div",{className:"form-r",children:[Object(n.jsx)("label",{className:"label",children:"Userphone"}),Object(n.jsx)("br",{}),Object(n.jsxs)("div",{className:"input-data",children:[Object(n.jsx)("input",{type:"tell",onChange:this.Change,id:"userphone"}),Object(n.jsx)("button",{ref:"phone",className:"linebtn",onClick:this.phoneotp,children:"Get otp"}),Object(n.jsx)("br",{})]})]}),this.state.phone?Object(n.jsxs)("div",{className:"form-r",children:[Object(n.jsx)("label",{className:"label",children:"Verify Phone"}),Object(n.jsx)("br",{}),Object(n.jsxs)("div",{className:"input-data",children:[Object(n.jsx)("input",{type:"text",onChange:this.Change,id:"useremail"}),Object(n.jsx)("button",{className:"linebtn",children:"Verify"})]})]}):null]})}):"Password"===this.state.mode?e=Object(n.jsx)("div",{className:"changes",children:Object(n.jsxs)("form",{children:[Object(n.jsxs)("div",{className:"form-r",children:[Object(n.jsx)("label",{className:"label",children:"Old Password"}),Object(n.jsx)("br",{}),Object(n.jsxs)("div",{className:"input-data",children:[Object(n.jsx)("input",{type:"password",onChange:this.Change,id:"old_pass"}),Object(n.jsx)("br",{})]})]}),Object(n.jsxs)("div",{className:"form-r",children:[Object(n.jsx)("label",{className:"label",children:"New Password"}),Object(n.jsx)("br",{}),Object(n.jsxs)("div",{className:"input-data",children:[Object(n.jsx)("input",{type:"password",onChange:this.Change,id:"new_pass"}),Object(n.jsx)("br",{})]})]}),Object(n.jsxs)("div",{className:"form-r",children:[Object(n.jsx)("label",{className:"label",children:"Confirm Password"}),Object(n.jsx)("br",{}),Object(n.jsxs)("div",{className:"input-data",children:[Object(n.jsx)("input",{type:"password",onChange:this.Change,id:"conf_pass"}),Object(n.jsx)("br",{})]})]}),Object(n.jsx)("div",{className:"passbtn",children:Object(n.jsx)("button",{children:"Update"})})]})}):"Profile"===this.state.mode&&(e=Object(n.jsx)("div",{className:"profile",children:Object(n.jsx)("form",{children:Object(n.jsx)("div",{className:"form-r",children:Object(n.jsx)("div",{className:"input-data",children:Object(n.jsx)("input",{type:"file"})})})})})),Object(n.jsx)("div",{className:"account",children:Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"nav-links",children:[Object(n.jsx)("svg",{width:"8",height:"12",viewBox:"0 0 8 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(n.jsx)("path",{d:"M2 0L0.59 1.41L5.17 6L0.59 10.59L2 12L8 6L2 0Z",fill:"black"})}),Object(n.jsx)("p",{children:"Account Settings"})]}),Object(n.jsxs)("div",{className:"update",children:[Object(n.jsxs)("ul",{className:"list",children:[Object(n.jsxs)("li",{className:"list-li",onClick:this.changetouser,children:[Object(n.jsx)("h5",{children:"Basic Details Update"}),"User"===this.state.mode?Object(n.jsx)("hr",{className:"about-border"}):null]}),Object(n.jsxs)("li",{className:"list-li",onClick:this.changetopass,children:[Object(n.jsx)("h5",{children:"Password update"}),"Password"===this.state.mode?Object(n.jsx)("hr",{className:"about-border"}):null]}),Object(n.jsxs)("li",{className:"list-li",onClick:this.changetopic,children:[Object(n.jsx)("h5",{children:"Dp update"}),"Profile"===this.state.mode?Object(n.jsx)("hr",{className:"about-border"}):null]})]}),e]})]})})}}]),t}(a.Component)),f=function(){return Object(n.jsxs)("div",{className:"main",children:[Object(n.jsx)("div",{className:"navbar",children:Object(n.jsx)("h1",{children:"MainView"})}),Object(n.jsxs)(l.c,{children:[Object(n.jsx)(l.a,{path:"/home/dashboard",component:m}),Object(n.jsx)(l.a,{path:"/home/receipts",component:x}),Object(n.jsx)(l.a,{path:"/home/manageuser",component:O}),Object(n.jsx)(l.a,{path:"/home/bidding",component:u}),Object(n.jsx)(l.a,{path:"/home/account",component:v})]})]})},g=t(7),N=(t(39),function(e){Object(h.a)(t,e);var s=Object(b.a)(t);function t(e){var n;return Object(j.a)(this,t),(n=s.call(this,e)).state={},n}return Object(o.a)(t,[{key:"render",value:function(){return Object(n.jsx)(a.Fragment,{children:Object(n.jsxs)("div",{className:"sidebar",children:[Object(n.jsx)("div",{className:"header",children:Object(n.jsx)("h3",{children:"Heading"})}),Object(n.jsxs)("div",{className:"main-data",children:[Object(n.jsxs)("div",{className:"side-data",children:[Object(n.jsx)("p",{children:Object(n.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(n.jsx)("path",{d:"M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM21 16H3V4H21V16Z",fill:"black"})})}),Object(n.jsx)("p",{class:"main-link",children:Object(n.jsx)(g.b,{to:"/home/dashboard",className:"link",children:"Dashboard"})})]}),Object(n.jsxs)("div",{className:"side-data",children:[Object(n.jsx)("p",{children:Object(n.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(n.jsx)("path",{d:"M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM21 16H3V4H21V16Z",fill:"black"})})}),Object(n.jsx)("p",{class:"main-link",children:Object(n.jsx)(g.b,{to:"/home/receipts",className:"link",children:"Receipts"})})]}),Object(n.jsxs)("div",{className:"side-data",children:[Object(n.jsx)("p",{children:Object(n.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(n.jsx)("path",{d:"M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM21 16H3V4H21V16Z",fill:"black"})})}),Object(n.jsx)("p",{class:"main-link",children:Object(n.jsx)(g.b,{to:"/home/bidding",className:"link",children:"Bidding"})})]}),Object(n.jsxs)("div",{className:"side-data",children:[Object(n.jsx)("p",{children:Object(n.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(n.jsx)("path",{d:"M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM21 16H3V4H21V16Z",fill:"black"})})}),Object(n.jsx)("p",{class:"main-link",children:Object(n.jsx)(g.b,{to:"/home/manageuser",className:"link",children:"Manage User"})})]}),Object(n.jsxs)("div",{className:"side-data",children:[Object(n.jsx)("p",{children:Object(n.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(n.jsx)("path",{d:"M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM21 16H3V4H21V16Z",fill:"black"})})}),Object(n.jsx)("p",{class:"main-link",children:Object(n.jsx)(g.b,{to:"/home/account",className:"link",children:"Account settings"})})]})]})]})})}}]),t}(c.a.Component)),w=function(){return Object(n.jsxs)("div",{className:"base",children:[Object(n.jsx)(N,{}),Object(n.jsx)(f,{})]})},k=function(){return Object(n.jsx)("div",{className:"body",children:Object(n.jsx)("h1",{children:"Body"})})},C=function(){return Object(n.jsx)("div",{className:"footer",children:Object(n.jsx)("h1",{children:"Footer"})})},y=(t(40),t.p+"static/media/fin.a81305e0.jpg"),H=function(){return Object(n.jsxs)("div",{className:"head",children:[Object(n.jsxs)("div",{className:"head-name",children:[Object(n.jsx)("img",{src:y,className:"head-image"}),Object(n.jsx)("h3",{children:"Finance Page"})]}),Object(n.jsxs)("div",{className:"head-items",children:[Object(n.jsx)("div",{className:"items",children:Object(n.jsx)("a",{href:"/about",children:"About"})}),Object(n.jsxs)("div",{className:"items",children:[Object(n.jsx)("a",{href:"/register",children:"Login"}),Object(n.jsx)("span",{children:"/"}),Object(n.jsx)("a",{href:"/login",children:"Register"})]})]})]})},V=function(){return Object(n.jsxs)(a.Fragment,{children:[Object(n.jsx)(H,{}),Object(n.jsx)(k,{}),Object(n.jsx)(C,{})]})},M=function(){return Object(n.jsxs)(l.c,{children:[Object(n.jsx)(l.a,{path:"/home",component:w}),Object(n.jsx)(l.a,{path:"/register",component:p}),Object(n.jsx)(l.a,{path:"",component:V})]})};var _=function(){return Object(n.jsx)("div",{className:"base.",children:Object(n.jsx)(M,{})})},F=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,42)).then((function(s){var t=s.getCLS,n=s.getFID,a=s.getFCP,c=s.getLCP,i=s.getTTFB;t(e),n(e),a(e),c(e),i(e)}))};r.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(g.a,{children:Object(n.jsx)(_,{})})}),document.getElementById("root")),F()}},[[41,1,2]]]);
//# sourceMappingURL=main.1506630f.chunk.js.map