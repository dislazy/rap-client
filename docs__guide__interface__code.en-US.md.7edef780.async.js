(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{aUX9:function(e,n,t){"use strict";t.r(n);var a=t("9og8"),r=t("WmNS"),o=t.n(r),l=t("q1tI"),c=t.n(l),s=t("rlch"),i=t("dEAq"),u=t("H1Ra"),m=c.a.memo((e=>{e.demos;var n=Object(s["c"])({loader:function(){var e=Object(a["a"])(o.a.mark((function e(){return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.e(45),t.e(2)]).then(t.bind(null,"hga/"));case 2:return e.abrupt("return",e.sent.default);case 3:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}(),loading:()=>null}),r=Object(s["c"])({loader:function(){var e=Object(a["a"])(o.a.mark((function e(){return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.e(45),t.e(2)]).then(t.bind(null,"qoQC"));case 2:return e.abrupt("return",e.sent.default);case 3:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}(),loading:()=>null}),l=Object(s["c"])({loader:function(){var e=Object(a["a"])(o.a.mark((function e(){return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.e(45),t.e(2)]).then(t.bind(null,"7z+8"));case 2:return e.abrupt("return",e.sent.default);case 3:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}(),loading:()=>null});return c.a.createElement(c.a.Fragment,null,c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"markdown"},c.a.createElement("h2",{id:"basic-settings"},c.a.createElement(i["AnchorLink"],{to:"#basic-settings","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"Basic Settings"),c.a.createElement("ul",null,c.a.createElement("li",null,"According to the interface model definition, automatically generate business code in various languages (now just support TypeScript)."),c.a.createElement("li",null,"Enter the repository edit page, click the ",c.a.createElement("code",null,"Rapper")," in the operation bar."))),c.a.createElement(n,null),c.a.createElement("div",{className:"markdown"},c.a.createElement("h2",{id:"choose-mode"},c.a.createElement(i["AnchorLink"],{to:"#choose-mode","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"Choose Mode"),c.a.createElement("ul",null,c.a.createElement("li",null,"You will see the guideline like below, and choose one mode.If you want to know which mode to choose, please see ",c.a.createElement(i["Link"],{to:"https://www.yuque.com/rap/rapper/which-model"},"choose mode guideline")))),c.a.createElement(r,null),c.a.createElement("div",{className:"markdown"},c.a.createElement("h2",{id:"project-settings"},c.a.createElement(i["AnchorLink"],{to:"#project-settings","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"Project Settings"),c.a.createElement("ul",null,c.a.createElement("li",null,"Then start your own projects, follow the steps shown on the pages."),c.a.createElement("li",null,"After you run the ",c.a.createElement("code",null,"yarn rapper")," scripts, it will automatically generate the files according to the platform"))),c.a.createElement(l,null),c.a.createElement("div",{className:"markdown"},c.a.createElement("h2",{id:"override"},c.a.createElement(i["AnchorLink"],{to:"#override","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"Override"),c.a.createElement("ul",null,c.a.createElement("li",null,"Generally, you may set the interfaces' url path into relative, so you can use ",c.a.createElement("code",null,"override")," function to add the base path. For example, if you are in developing environment, you can use rap mock server as the base path, and when you are in living environment, you can use real server as the base path.")),c.a.createElement(u["a"],{code:"import { overrideFetch } from 'src/rapper';\n\nconst baseURL = process.env.NODE_ENV === 'development' ? 'http://**/app/mock/142/post/' : '/'\n\noverrideFetch({\n  basePath\n})",lang:"ts"}),c.a.createElement("ul",null,c.a.createElement("li",null,"Override can also support function, if you want to access some tokens with async function.")),c.a.createElement(u["a"],{code:"import axios, { AxiosError } from 'axios'\nimport { overrideFetch } from '../rapper'\n\nconst baseURL = process.env.NODE_ENV === 'development' ? 'http://**/app/mock/142/post/' : '/'\n\n\nexport function overrideRapper() {\n  const axiosInstance = axios.create({\n    baseURL\n  })\n\n  axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {\n    if (error.response && error.response.status !== 200) {\n      return error.response\n    }\n    throw error\n  })\n  const overFunc = async (config) => {\n    const { url, method, params } = config\n    try {\n      const response = await axiosInstance({\n        method,\n        url,\n        ...(method === 'GET' ? { params } : { data: params })\n      })\n      const res = response.data\n      if (res.errno === 0) return response.data\n      throw res\n    } catch (error) {\n      throw error?.response?.data || error\n    }\n  }\n  overrideFetch(overFunc)\n}",lang:"ts"}))))}));n["default"]=e=>{var n=c.a.useContext(i["context"]),t=n.demos;return c.a.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&i["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),c.a.createElement(m,{demos:t})}}}]);