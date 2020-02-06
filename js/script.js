document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    if(!document.documentMode) { // https://github.com/Dogfalo/materialize/issues/5801
        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    }
});