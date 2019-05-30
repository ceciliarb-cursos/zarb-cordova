var database;
let login = "";
let meuLogin = `ceci`;
let mensagem = "";

var app = {
    onDeviceReady: function () {
        database = firebase.database();
        app.getMensagens();

        FCMPlugin.getToken(token => {
            console.log(token);
            alert(token);
        });

        FCMPlugin.subscribeToTopic('pbh');

        // evento q so eh chamado se o app estiver aberto
        FCMPlugin.onNotification(data => {
            if (data.wasTapped) {
                //notificacao recebida na bandeja e clicada pelo usuario
                alert(JSON.stringify(data));
            } else {
                //notificacao recebida em background
                alert(JSON.stringify(data));
            }
        },
            function (msg) {
                alert('Tudo certo ' + msg)
            },
            function (err) {
                alert('Error registering onNotification ' + err)
            }
        );

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

        const obj = {
            "to": "/topics/pbh",
            "notification": {
                "title": `Chat - ${login} enviou:`,
                "body": mensagem,
            },
            "data": {
                "title": `Chat - ${login} enviou:`,
                "message": mensagem
            }

        }
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'post',
            headers: {
                'Authorization': `key=AIzaSyAc9lr4Jn_p2nqc_cBn69I3u2O5yOpKbFg`,
                'Content-type': `application/json`
            },
            body: JSON.stringify(obj)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            alert(JSON.stringify(data));
        });

    },

    getMensagens() {
        var msgRef = database.ref(`mensagem`);
        msgRef.on(`value`, function (snapshot) {
            let html = "";
            Object.values(snapshot.val()).map(msg => {
                let u1 = msg.usuario == meuLogin;
                html += `
<div id="msgs" class="row-around horizontal-align-${u1 ? 'left' : 'right'}">
    <div class="padding margin ${u1 ? 'blue-grey-400' : 'blue'} shadow radius col-80">
        <p>${msg.mensagem}</p>
        <p>${msg.data}</p>
    </div>
</div>`;
            });
            let msgs = document.getElementById("msgs");
            msgs.innerHTML = html;
            msgs.scrollTop = msgs.scrollHeight;
        })
    }

}