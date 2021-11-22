// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/securitymaster$1.0.0/src/app/views/base/home.marko",
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

  out.w("<!DOCTYPE html><html lang=\"pt-br\"><head><title>Security Master</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"><link href=\"https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\"><link rel=\"stylesheet\" href=\"/static/css/base/main.css\"><link rel=\"icon\" type=\"image/x-icon\" href=\"/static/img/favicon.ico\"></head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"wrapper d-flex align-items-stretch\"><nav id=\"sidebar\"><div class=\"p-4 pt-5\"><a href=\"/securitymaster/home\" style=\"background-image: url(/static/img/logo.png)\" class=\"img logo rounded-circle mb-5\"></a><ul class=\"list-unstyled components mb-5\"><li class=\"active\"><a href=\"/securitymaster/home\">Home</a></li><li><a href=\"/securitymaster/region\">Regiões</a></li><li><a href=\"/securitymaster/profile\">Perfil</a></li></ul><div class=\"footer\"><p>Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | Security Master <i aria-hidden=\"true\" class=\"icon-heart\"></i> by <a href=\"https://www.linkedin.com/in/rafael-scariot-aab058192/\" target=\"_blank\">Rafael Scariot</a></p></div></div></nav><div class=\"p-4 p-md-5\" id=\"content\"><nav class=\"navbar navbar-expand-lg navbar-light bg-light\"><div class=\"container-fluid\"><button type=\"button\" class=\"btn btn-primary\" id=\"sidebarCollapse\"><i class=\"fa fa-bars\"></i><span class=\"sr-only\">Toggle Menu</span></button><button type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" class=\"btn btn-dark d-inline-block d-lg-none ml-auto\"><i class=\"fa fa-bars\"></i></button><button type=\"button\" class=\"btn btn-primary ml-2\" id=\"logout\"><i aria-hidden=\"true\" class=\"fa fa-sign-out\"></i> Logout</button><div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\"><ul class=\"nav navbar-nav ml-auto\"><li class=\"nav-item active\"><a href=\"/securitymaster/home\" class=\"nav-link\">Home</a></li><li class=\"nav-item\"><a href=\"/securitymaster/register/region\" class=\"nav-link\">Regiões</a></li><li class=\"nav-item\"><a href=\"/securitymaster/profile\" class=\"nav-link\">Perfil</a></li></ul></div></div></nav><h3><script>\n            const hour = new Date().getHours();\n            let status = \"\";\n            if (hour < 12 && hour >= 6) {\n              status = \"Bom dia\";\n            } else if (hour >= 12 && hour < 18) {\n              status = \"Boa tarde\";\n            } else {\n              status = \"Boa noite\";\n            }\n\n            const userName = localStorage.getItem(\"userName\").split(\" \")[0];\n\n            document.write(status + \", \" + userName + \"!\");\n          </script></h3><p>Confira o andamento da segurança da sua propriedade.</p><div style=\"display: flex; flex-direction: row\"><div style=\"width: 50%;\"><canvas id=\"last24hrsActivities\"></canvas></div><div style=\"width: 50%;\"><canvas id=\"last7daysActivitie\"></canvas></div></div><div style=\"display: flex; flex-direction: row\"><div style=\"width: 50%;\" class=\"mt-4\"><canvas id=\"activitieTypeChart\"></canvas></div><div style=\"width: 50%;\" class=\"mt-4\"><canvas id=\"activitieRegionHour\"></canvas></div></div></div></div><script src=\"/static/js/util/jquery.min.js\"></script><script src=\"/static/js/isAuthenticated.js\"></script><script src=\"/static/js/util/bootstrap.min.js\"></script><script src=\"/static/js/main.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/chart.js\"></script><script src=\"/static/js/base/home/activitieTypeChart.js\"></script><script src=\"/static/js/base/home/last24hrsActivities.js\"></script><script src=\"/static/js/base/home/last7daysActivitie.js\"></script><script src=\"/static/js/base/home/activitieRegionHour.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "66");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/securitymaster$1.0.0/src/app/views/base/home.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
