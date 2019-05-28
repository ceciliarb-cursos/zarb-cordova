var database;
let login = "";
let mensagem = "";

var app = {
    onDeviceReady: function () {
        database = firebase.database();
    },

    enviar() {
        login = document.getElementById("login").value;
        mensagem = document.getElementById("mensagem").value;
        let objMensagem = {
            usuario: login,
            mensagem: mensagem,
            data: new Date().toLocaleString(),
        };
        database.ref('mensagem').push(objMensagem);
        document.getElementById("login").value = "";
        document.getElementById("mensagem").value = "";
    },

}