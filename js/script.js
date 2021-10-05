try {
    document.addEventListener('DOMContentLoaded', () => {
        M.Sidenav.init(document.getElementsByClassName('sidenav'));
        M.Collapsible.init(document.getElementsByClassName('collapsible'));
        if (!document.documentMode) { // https://github.com/Dogfalo/materialize/issues/5801
            M.Materialbox.init(document.getElementsByClassName('materialboxed'));
        }
    });
} catch (e) {
    console.error(e);
}