"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (api, opts) {
  if (process.env.NODE_ENV !== "production") {
    return false;
  }
  if (opts.judge && !opts.judge()) {
    return false;
  }
  api.log.success("insert google analytics");
  var gaTpl = function gaTpl(code) {
    return "\n    (function(){ \n      var script = document.createElement('script');\n      script.src = 'https://www.googletagmanager.com/gtag/js?id=" + code + "';\n      script.async = true;\n      script.onload = function() {\n        window.dataLayer = window.dataLayer || [];\n        window.gtag = () => {\n          window.dataLayer.push(arguments);\n        };\n        window.gtag('js', new Date());\n        window.gtag('config', '" + code + "');\n      };\n      document.getElementsByTagName('head')[0].appendChild(script);\n    })();\n  ";
  };
  api.addHTMLScript({
    content: gaTpl(opts.code)
  });
};