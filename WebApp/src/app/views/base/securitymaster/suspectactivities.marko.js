// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/securitymaster$1.0.0/src/app/views/base/securitymaster/suspectactivities.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!doctype html><html lang=\"pt-br\"><head><title>Security Master</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"><link href=\"https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900\" rel=\"stylesheet\"><link rel=\"icon\" type=\"image/x-icon\" href=\"/static/img/favicon.ico\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\"><link rel=\"stylesheet\" href=\"/static/css/securitymasterhome.css\"></head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"wrapper d-flex align-items-stretch\"><nav id=\"sidebar\"><div class=\"p-4 pt-5\"><a href=\"#\" class=\"img logo rounded-circle mb-5\" style=\"background-image: url(/static/img/logo.png);\"></a><ul class=\"list-unstyled components mb-5\"><li><a href=\"/securitymaster/home\">Home</a></li><li><a href=\"/securitymaster/monitoring\">Monitoramento</a></li><li><a href=\"/securitymaster/register/region\">Nova região</a></li><li class=\"active\"><a href=\"/securitymaster/suspectactivities\">Atividades suspeitas</a></li><li><a href=\"/securitymaster/profile\">Perfil</a></li></ul><div class=\"footer\"><p>Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | Security Master <i class=\"icon-heart\" aria-hidden=\"true\"></i> by <a href=\"https://www.linkedin.com/in/rafael-scariot-aab058192/\" target=\"_blank\">Rafael Scariot</a></p></div></div></nav><div id=\"content\" class=\"p-4 p-md-5\"><nav class=\"navbar navbar-expand-lg navbar-light bg-light\"><div class=\"container-fluid\"><button type=\"button\" id=\"sidebarCollapse\" class=\"btn btn-primary\"><i class=\"fa fa-bars\"></i><span class=\"sr-only\">Toggle Menu</span></button><button class=\"btn btn-dark d-inline-block d-lg-none ml-auto\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><i class=\"fa fa-bars\"></i></button><button type=\"button\" id=\"logout\" class=\"btn btn-primary ml-2\"><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i> Logout</button><div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\"><ul class=\"nav navbar-nav ml-auto\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"/securitymaster/home\">Home</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"/securitymaster/monitoring\">Monitoramento</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"/securitymaster/register/region\">Nova região</a></li><li class=\"nav-item active\"><a class=\"nav-link\" href=\"/securitymaster/suspectactivities\">Atividades suspeitas</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"/securitymaster/profile\">Perfil</a></li></ul></div></div></nav></div></div><script src=\"/static/js/isAuthenticated.js\"></script><script src=\"/static/js/jquery.min.js\"></script><script src=\"/static/js/popper.js\"></script><script src=\"/static/js/bootstrap.min.js\"></script><script src=\"/static/js/main.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "57");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/securitymaster$1.0.0/src/app/views/base/securitymaster/suspectactivities.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
