(()=>{const e=e=>e.includes("/en/");window.loadFullPage=e=>{window.location.href=e};const o=e(window.location.href),l=o?document.querySelectorAll('a[href^="https://butterfly.js.org"]'):document.querySelectorAll('a[href^="/en/"]');var r;r=o,l.forEach((o=>{r&&e(o.href)||(o.href=`javascript:loadFullPage('${o.href}');`)}))})();