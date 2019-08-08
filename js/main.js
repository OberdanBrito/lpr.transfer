dhtmlxEvent(window, "load", function () {

    let layout = new dhtmlXLayoutObject({
        parent: document.body,
        pattern: '2U',
        offsets: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        cells: [
            {
                id: 'a',
                text: 'Origem',
                header: true,
                width: 280,
            },
            {
                id: 'b',
                text: 'Histórico de coleta',
                header: true
            }
        ]
    }), tree;

    $.ajax({
        url: 'http://localhost:9001/clients',
        success: function (clients) {

            tree = layout.cells('a').attachTreeView(clients);

            $.ajax({
                url: 'http://localhost:9001/sites',
                success: function (sites) {
                    sites.filter(function (item) {
                        tree.addItem(item.id, item.text, item.clientid);
                    });
                }
            });
        }
    });

});