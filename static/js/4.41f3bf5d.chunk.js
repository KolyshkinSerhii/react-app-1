(this["webpackJsonpreact-app-1"]=this["webpackJsonpreact-app-1"]||[]).push([[4],{297:function(e,a,t){"use strict";t.d(a,"a",(function(){return g}));var n=t(36),s=t(37),r=t(39),c=t(38),i=t(0),o=t.n(i),m=t(10),l=t(16),u=function(e){return{isAuth:e.auth.isAuth}},g=function(e){var a=function(a){Object(r.a)(i,a);var t=Object(c.a)(i);function i(){return Object(n.a)(this,i),t.apply(this,arguments)}return Object(s.a)(i,[{key:"render",value:function(){return this.props.isAuth?o.a.createElement(e,this.props):o.a.createElement(m.a,{to:"/login"})}}]),i}(o.a.Component);return Object(l.b)(u)(a)}},299:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__2ek4g",dialogs_item:"Dialogs_dialogs_item__3V7Nx",messages:"Dialogs_messages__3Hryw"}},300:function(e,a,t){},301:function(e,a,t){},306:function(e,a,t){"use strict";t.r(a);var n=t(5),s=t(107),r=t(0),c=t.n(r),i=t(299),o=t.n(i),m=t(300),l=t.n(m),u=t(13),g=function(e){var a="/dialogs/"+e.id;return c.a.createElement("div",{className:l.a.dialog},c.a.createElement(u.b,{to:a},e.name))},d=t(301),f=t.n(d),b=function(e){return c.a.createElement("div",{className:f.a.messages},c.a.createElement("div",{className:f.a.message},e.message))},p=t(30),E=t(90),v=t(131),h=t(25),_=t(68),j=Object(_.b)(100),O=Object(v.a)({form:"dialogsSendMessageForm"})((function(e){return c.a.createElement("form",{onSubmit:e.handleSubmit},c.a.createElement("div",null,c.a.createElement(E.a,{placeholder:"Enter your message",name:"newMessageBody",component:h.b,validate:[_.a,j]})),c.a.createElement("div",null,c.a.createElement("button",null,"Send message")))})),N=function(e){return c.a.createElement("div",null,c.a.createElement(O,{onSubmit:function(a){e.sendNewMessage(a.newMessageBody)},onSubmitSuccess:function(e,a){a(Object(p.a)("dialogsSendMessageForm"))}}))},w=function(e){var a=e.messagesPage,t=a.dialogs.map((function(e){return c.a.createElement(g,{name:e.name,id:e.id})})),n=a.messages.map((function(e){return c.a.createElement(b,{message:e.message})}));return c.a.createElement("div",{className:o.a.dialogs},c.a.createElement("div",{className:o.a.dialogs_item},t),c.a.createElement("div",{className:o.a.messages},n,c.a.createElement(N,{sendNewMessage:e.sendNewMessage})))},S=t(16),M=t(9),y=t(297);a.default=Object(M.d)(Object(S.b)((function(e){return{messagesPage:e.messagesPage}}),Object(n.a)({},s.a)),y.a)(w)}}]);
//# sourceMappingURL=4.41f3bf5d.chunk.js.map