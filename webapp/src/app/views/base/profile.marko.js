// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/securitymaster$1.0.0/src/app/views/base/profile.marko",
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

  out.w("<!DOCTYPE html><html lang=\"pt-br\"><head><title>Security Master</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"><link href=\"https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\"><link rel=\"stylesheet\" href=\"/static/css/base/main.css\"><link rel=\"icon\" type=\"image/x-icon\" href=\"/static/img/favicon.ico\"><link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css\"></head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"wrapper d-flex align-items-stretch\"><nav id=\"sidebar\"><div class=\"p-4 pt-5\"><a href=\"#\" class=\"img logo rounded-circle mb-5\" style=\"background-image: url(/static/img/logo.png)\"></a><ul class=\"list-unstyled components mb-5\"><li><a href=\"/securitymaster/home\">Home</a></li><li><a href=\"/securitymaster/region\">Nova região</a></li><li class=\"active\"><a href=\"/securitymaster/profile\">Perfil</a></li></ul><div class=\"footer\"><p>Copyright &copy; <script>\r\n                document.write(new Date().getFullYear());\r\n              </script> All rights reserved | Security Master <i class=\"icon-heart\" aria-hidden=\"true\"></i> by <a href=\"https://www.linkedin.com/in/rafael-scariot-aab058192/\" target=\"_blank\">Rafael Scariot</a></p></div></div></nav><div id=\"content\" class=\"p-4 p-md-5\"><nav class=\"navbar navbar-expand-lg navbar-light bg-light\"><div class=\"container-fluid\"><button type=\"button\" id=\"sidebarCollapse\" class=\"btn btn-primary\"><i class=\"fa fa-bars\"></i><span class=\"sr-only\">Toggle Menu</span></button><button class=\"btn btn-dark d-inline-block d-lg-none ml-auto\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><i class=\"fa fa-bars\"></i></button><button type=\"button\" id=\"logout\" class=\"btn btn-primary ml-2\"><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i> Logout</button><div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\"><ul class=\"nav navbar-nav ml-auto\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"/securitymaster/home\">Home</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"/securitymaster/region\">Nova região</a></li><li class=\"nav-item active\"><a class=\"nav-link\" href=\"/securitymaster/profile\">Perfil</a></li></ul></div></div></nav><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"inputGroup-sizing-default\">E-mail</span></div><input type=\"text\" class=\"form-control\" id=\"inputEmail\" aria-label=\"Default\" aria-describedby=\"inputGroup-sizing-default\" disabled value=\"\"></div><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Nome</span></div><input type=\"text\" class=\"form-control\" aria-label=\"Default\" id=\"inputName\" aria-describedby=\"inputGroup-sizing-default\" disabled value=\"\"></div><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Senha</span></div><input type=\"password\" class=\"form-control\" id=\"inputPassword\" aria-label=\"Default\" aria-describedby=\"inputGroup-sizing-default\" disabled value=\"\"></div><button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModal\">Alterar informações</button><button type=\"button\" class=\"ml-2 btn btn-primary\" data-toggle=\"modal\" data-target=\"#chatID\">Cadastrar dispositivo</button><hr><h4 class=\"mt-2\" style=\"text-align: center;\">Meus dispositivos</h4><table class=\"table table-striped table-dark mt-2\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">Dispositivo</th><th scope=\"col\">Chat ID</th><th scope=\"col\">Excluir</th></tr></thead><tbody id=\"devices\"></tbody></table><div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\" id=\"exampleModalLabel\">Alterar informações</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div><div class=\"modal-body\"><div id=\"modalAlertError\" style=\"display: none\" class=\"alert alert-danger\" role=\"alert\">This is a danger alert—check it out!</div><div style=\"display: none\" id=\"modalAlertSuccess\" class=\"alert alert-success\" role=\"alert\">This is a success alert—check it out!</div><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Novo E-mail</span></div><input id=\"modalEmail\" type=\"text\" class=\"form-control\" aria-label=\"Default\" aria-describedby=\"inputGroup-sizing-default\" value=\"\"></div><div class=\"input-group mb-3\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Novo nome</span></div><input type=\"text\" id=\"modalName\" class=\"form-control\" aria-label=\"Default\" aria-describedby=\"inputGroup-sizing-default\" value=\"\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Nova senha</span></div><input type=\"password\" id=\"modalPassword\" class=\"form-control\" aria-label=\"Default\" aria-describedby=\"inputGroup-sizing-default\" value=\"\"></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"closeModalBtn btn btn-secondary\" data-dismiss=\"modal\">Fechar</button><button type=\"submit\" id=\"btnmodal\" class=\"btn btn-primary\">Salvar</button></div></div></div></div><div class=\"modal fade\" id=\"chatID\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\"><h6 class=\"modal-title\" style=\"text-align: center\">Cadastre o Chat ID dos dispositivos que devem ser notificados!</h6><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div><div class=\"modal-body\"><p style=\"text-align: center\">DICA: Pesquise por \"Chat ID Echo\" no Telegram e envie /start para descobrir o Chat ID do dispositivo.</p><div id=\"chatIdError\" style=\"display: none\" class=\"alert alert-danger\" role=\"alert\">This is a danger alert—check it out!</div><div style=\"display: none\" id=\"chatIdSuccess\" class=\"alert alert-success\" role=\"alert\">This is a success alert—check it out!</div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Chat ID</span></div><input type=\"number\" id=\"modalChatID\" class=\"form-control\" aria-label=\"Default\" aria-describedby=\"inputGroup-sizing-default\" value=\"\"></div><div class=\"input-group mt-2\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Identificação</span></div><input type=\"text\" id=\"modalSurname\" class=\"form-control\" aria-label=\"Default\" aria-describedby=\"inputGroup-sizing-default\" value=\"\"></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-secondary closeModalBtn\" data-dismiss=\"modal\">Fechar</button><button type=\"submit\" id=\"btnChatID\" class=\"btn btn-primary\">Salvar</button></div></div></div></div></div></div><script src=\"/static/js/util/jquery.min.js\"></script><script src=\"/static/js/isAuthenticated.js\"></script><script src=\"/static/js/util/bootstrap.min.js\"></script><script src=\"/static/js/main.js\"></script><script src=\"/static/js/base/profile.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "121");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/securitymaster$1.0.0/src/app/views/base/profile.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
