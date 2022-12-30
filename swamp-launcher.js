/* Written by Bypassi on December 18th, 2022 Unminified file at /swamp.js */ var swamp,chrome;function _swamp(){swamp={background:chrome.extension?.getBackgroundPage(),elements:{create(e,t){var o=document.createElement(e.tag),a=swamp.strings[t?.id]||swamp.strings;for(var n in e)o[n]=n.startsWith("on")?swamp.functions[e[n]]:e[n];!e.kids&&a.hasOwnProperty(o.id)&&(o.innerHTML=a[o.id]),(t||document.body).appendChild(o),swamp.elements[e.id]=o,e.kids?.forEach(e=>{swamp.elements.create(e,o)})}},functions:{save_code(){localStorage.swamp=swamp.elements.input.value},insert_tab(e){"Tab"===e.key&&(e.preventDefault(),document.execCommand("insertText",!1,"  "))},log_replace(e){swamp.elements.output.textContent+="\n\n"+e},run_code(){swamp.functions.save_code();try{(this.background?swamp.background:window).eval(swamp.elements.input.value),console.log("Script ran successfully in Swamp Executer")}catch(e){console.log(e)}},reload_background(){swamp.background.location.reload(),console.log("Scripts running as background were reloaded")},clone(){open("/popup.js").onload=function(){this.eval(_swamp.toString()+"_swamp();var swamp"),onbeforeunload=void 0,close()}},script_adding_loop(e){swamp.elements.create({tag:"option",textContent:e.name,value:e.code},swamp.elements.select)},script_select(){swamp.elements.input.value=swamp.elements.select.value,swamp.elements.run_code.scrollIntoView()},disable_background_buttons(){swamp.elements.run_background.disabled=!0,swamp.elements.reload_background.disabled=!0},hard_disable(){for(var e=0;e<localStorage.length;e++)"swamp"!==localStorage.key(e)&&(localStorage[localStorage.key(e)]=this.undo?"":"-");(swamp.background||window).location.reload()},soft_disable(){swamp.background.close(),delete swamp.background,swamp.functions.disable_background_buttons()},undo_soft_disable(){confirm(swamp.strings.undo_prompt)&&chrome.runtime.reload()},get_extensions(){chrome.management.getAll(function(e){e.forEach(function(e){swamp.elements.create({tag:"button",id:e.id,textContent:e.name,enabled:e.enabled,admin:"admin"===e.installType,onclick:"toggle_extension"},swamp.elements.ltbeef_extensions),swamp.functions.strikethrough(swamp.elements[e.id],e.enabled),e.id===chrome.runtime.id&&(swamp.elements[e.id].className="gg")})})},strikethrough(e,t){e.style.textDecoration=t?"none":"line-through"},toggle_extension(){(!this.enabled||this.id!==chrome.runtime.id||confirm(swamp.strings.remove_gg_prompt))&&(this.enabled=!this.enabled,swamp.functions.strikethrough(this,this.enabled),chrome.management.setEnabled(this.id,this.enabled))},manage_all(){var e=this.admin_only,t=this.enabling;[...swamp.elements.ltbeef_extensions.children].forEach(function(o){(!e||o.admin)&&!t!=!o.enabled&&o.id!==chrome.runtime.id&&o.click()})}},scripts:[{name:"Select an option...",code:""},{name:"Display GoGuardian policy",code:`chrome.storage.local.get("policy", (json) => {\n  console.log(JSON.stringify(json));\n});`},{name:"Run a third-party script",code:`fetch("https://example.com/example.js")\n  .then((res) => res.text())\n  .then(eval);`},{name:"Emulate DNS and block all goguardian.com requests",code:`chrome.webRequest.onBeforeRequest.addListener(\n  () => {\n    return { redirectUrl: "javascript:" };\n  },\n  {\n    urls: ["*://*.goguardian.com/*"],\n  },\n  ["blocking"]\n);`},{name:"Bookmarklet emulator when a Google tab is loaded",code:`chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {\n  if (changeInfo.status == "complete") {\n    chrome.tabs.executeScript(\n      tabId, { code: \`\n        if (location.hostname.endsWith("google.com")) {\n          // Use your own code below:\n          alert("Testing!");\n        }\n      \` }\n    );\n  }\n});`},{name:"Bookmarklet emulator on focused tab when the GoGuardian icon is clicked",code:`chrome.browserAction.onClicked.addListener(() => {\n  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {\n    chrome.tabs.executeScript(tab[0].id, {\n      code: \`\n        // Your own code below:\n        alert("Testing!");\n      \`,\n      matchAboutBlank: true,\n    });\n  });\n});`},{name:"Toggle all other admin-forced extensions when the GoGuardian icon is clicked",code:`chrome.browserAction.onClicked.addListener(function () {\n  chrome.management.getAll((extensions) => {\n    extensions.forEach((extension) => {\n      if ("admin" === extension.installType && chrome.runtime.id !== extension.id)\n        chrome.management.setEnabled(extension.id, !extension.enabled);\n    });\n  });\n});`},{name:"Display a custom notification",code:`chrome.notifications.create(null, {\n  type: "basic",\n  iconUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png",\n  title: "Important GoGuardian Message",\n  message: "Hi, I'm a custom notifications in Swamp Launcher",\n});\n// Credit to ilexite#8290`},{name:"Run custom code when the GoGuardian icon is clicked",code:`chrome.browserAction.onClicked.addListener(() => {\n  eval(prompt("Code, please?"));\n});\n// Something like this could be useful for running in the background...`},{name:"Toggle emulated DNS unblocker when the GoGuardian icon is clicked",code:`function block() {\n  return { redirectUrl: "javascript:" };\n}\nvar blocking = false;\nfunction toggle() {\n  if (blocking) {\n    chrome.webRequest.onBeforeRequest.removeListener(block);\n  } else {\n    chrome.webRequest.onBeforeRequest.addListener(\n      block,\n      {\n        urls: ["*://*.goguardian.com/*"],\n      },\n      ["blocking"]\n    );\n  }\n  blocking = !blocking;\n  alert("Emulated DNS unblocker is " + (blocking ? "on!" : "off!"));\n}\ntoggle();\nchrome.browserAction.onClicked.addListener(toggle);\n// This is also mainly useful if you run it in the background`},],strings:{style:"pre,textarea{display:inline-block;height:400px}*{box-sizing:border-box}body{padding:10px;font-size:110%;color:#fff;background-color:#2e2e31}h1{text-align:center;font-size:70px}h2{text-align:left;font-size:175%}button,input,pre,select,textarea{color:#000;font-size:15px}h1,h2,h3,button,label,p,select{font-family:Roboto,sans-serif}hr{border:none;border-bottom:3px solid #fff}input,kbd,pre,textarea{font-family:monospace;border:none}input,select,textarea{background-color:#fff;border-radius:10px;padding:10px 17px;border:none}button,input{background-color:#fff;padding:10px 20px;margin:0 5px 5px 0}input{width:600px;border-radius:10px}textarea{white-space:pre;float:left;width:60%;border-radius:10px 0 0 10px;resize:none;background-color:#99edc3;margin-bottom:15px}pre{border-radius:0 10px 10px 0;padding:8px;float:right;margin:0 0 25px;width:40%;overflow-y:scroll;word-break:break-all;white-space:pre-line;background-color:#1c8e40}button{border:none;border-radius:10px;cursor:pointer;transition:filter 250ms}button[disabled]{pointer-events:none;filter:brightness(.5)}button:hover{filter:brightness(.8)}.gg{background-color:#99edc3}a{color:#99edc3;transition:color 250ms}a:hover{color:#1c8e40}",title:"Swamp Launcher",subtitle:"",source_link:"<a href='http://vacapena.ml'>MainFrame</a>",run_code:{title:"Swamp Executer",description:'Put your script in the executer to run it while pretending to be the GoGuardian extension.',placeholder:"Input goes here...",output:"Output shows here:\n\n---",run:"Run Script",reload:"Reload Scripts",run_background:"Run Script Outside",reload_background:"Reload Scripts Outside",button_description:' '},interesting_scripts:{title:"Script Templates",description:"Some script templates you may use and tamper with in Swamp Executer.",policy_description:"Running a script normally in Swamp Executer will only run the script in the Swamp Launcher page, while running a script outside the script will run in chrome outside the executer aswell.",dns_description:"If running a script outside is disabled this is most likely because you've disabled the GoGuardian extension.",background_reminder:" "},disable_gg:{title:"Swamp Cookie Blaster",hard_disable:"Hard-Disable GoGuardian",undo_hard_disable:"Undo Hard-Disable",hard_disable_description:" ",soft_disable:"Soft-Disable GoGuardian",undo_soft_disable:"Undo Soft-Disable",soft_disable_description:"Soft-Disable will not persist after you restart, but Hard-Disable will. Swamp Cookie Blaster works by messing with some of the cookies GoGuardian needs to run.",trouble_warning:'<b>Hard-disable will also prevent your teachers from seeing your screen, while soft-disable will not. Be careful not to get in trouble.</b> Also, the disable buttons don\'t have a super clear visual action. If you clicked them and  it seems like nothing happened, something probably happened.'},ltbeef:{title:'Swamp Extension Disable',manual_description:"Ingot was fixed by Chrome in v106, so this is a great alternative that works in the latest version. The buttons below will allow you to disable or enable all admin-enforced extensions.",broad_options_description:"",disable_all:"Disable All Extensions",disable_all_admin:"Disable All Admin Extensions",enable_all:"Re-Enable All Extensions",soft_disable_recommendation:" "},remove_gg_prompt:"Are you sure you want to remove GoGuardian? It'll close the launcher until chrome://restart is visited. Soft-disable may be a better option if you want to keep using [swamp] with sites unblocked.",undo_prompt:'Undoing soft-disable will close the [swamp] launcher. Select "OK" to proceed.'}},document.body.innerHTML="",[{tag:"title",id:"title"},{tag:"style",id:"style"},{tag:"base",target:"_blank"},{tag:"h1",id:"title"},{tag:"h3",id:"subtitle"},{tag:"p",id:"source_link"},{tag:"hr"},{tag:"div",id:"run_code",kids:[{tag:"h2",id:"title"},{tag:"p",id:"description"},{tag:"textarea",id:"input",placeholder:swamp.strings.run_code.placeholder,onkeyup:"save_code",onkeydown:"insert_tab"},{tag:"pre",id:"output"},{tag:"button",id:"run",onclick:"run_code"},{tag:"button",id:"reload",onclick:"clone"},{tag:"br"},{tag:"button",id:"run_background",background:!0,onclick:"run_code"},{tag:"button",id:"reload_background",onclick:"reload_background"},{tag:"p",id:"button_description"},]},{tag:"hr"},{tag:"div",id:"interesting_scripts",kids:[{tag:"h2",id:"title"},{tag:"p",id:"description"},{tag:"select",id:"select",onchange:"script_select"},{tag:"p",id:"policy_description"},{tag:"p",id:"dns_description"},{tag:"p",id:"background_reminder"},]},{tag:"hr"},{tag:"div",id:"disable_gg",kids:[{tag:"h2",id:"title"},{tag:"button",id:"hard_disable",onclick:"hard_disable"},{tag:"button",id:"soft_disable",onclick:"soft_disable"},{tag:"button",id:"repair",undo:!0,onclick:"hard_disable"},{tag:"p",id:"description"},{tag:"p",id:"trouble_warning"},]},{tag:"hr"},{tag:"div",id:"hide_tabs",kids:[{tag:"h2",id:"title"},{tag:"button",id:"visible_window",onclick:"hide_tabs"},{tag:"button",id:"undo_hide_tabs",undo:!0,onclick:"hide_tabs"},{tag:"p",id:"description"},{tag:"p",id:"interference"},{tag:"p",id:"dont_cheat"},]},{tag:"hr"},{tag:"div",id:"ltbeef",kids:[{tag:"h2",id:"title"},{tag:"p",id:"manual_description"},{tag:"div",id:"ltbeef_extensions"},{tag:"p",id:"broad_options_description"},{tag:"button",id:"disable_all",onclick:"manage_all"},{tag:"button",id:"disable_all_admin",admin_only:!0,onclick:"manage_all"},{tag:"button",id:"enable_all",enabling:!0,onclick:"manage_all"},{tag:"p",id:"soft_disable_recommendation"},]},].forEach(e=>{swamp.elements.create(e)}),history.replaceState({},{},"/swamp"),onbeforeunload=()=>!0,console.log=swamp.functions.log_replace,swamp.background.console.log=swamp.functions.log_replace,swamp.scripts.forEach(swamp.functions.script_adding_loop),swamp.functions.get_extensions(),swamp.elements.input.value=localStorage.swamp||""}window!==chrome.extension?.getBackgroundPage()&&(open("/manifest.json").onload=function(){this.eval(_swamp.toString()+"_swamp();var swamp"),top.close()});
