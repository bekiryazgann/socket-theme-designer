(function(){

    const socket = io('ws://192.168.1.156:3030');

    const headerDesign = document.querySelector('#header-design');
    const footerDesign = document.querySelector('#footer-design');
    const iframe = document.querySelector('iframe');
    const reloadiframe = document.querySelector('#reloadiframe');

    const renderAll = () => {
        return {
            header: headerDesign.value,
            footer: footerDesign.value
        }
    }

    socket.emit("editor:change", JSON.stringify(renderAll()), response => {
        iframe.src = response;
        reloadiframe.click();
    })

    reloadiframe.addEventListener('click', e => {
        socket.emit("editor:change", JSON.stringify(renderAll()), response => {
            iframe.src = response;
        })
        e.preventDefault();
    })

    headerDesign.addEventListener('change', e => {
        socket.emit("editor:change", JSON.stringify(renderAll()), response => {
            iframe.src = response;
            reloadiframe.click();
        })
    });

    footerDesign.addEventListener('change', e => {
        socket.emit("editor:change", JSON.stringify(renderAll()), response => {
            iframe.src = response;
            reloadiframe.click();
        })
    });


})();