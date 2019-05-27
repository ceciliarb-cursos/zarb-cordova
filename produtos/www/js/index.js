var db;
var shortName = `DBProdutos`;
var version = `1.0`;
var displayName = `DBProdutos`;
var maxSize = 65535;

var barcode = null;

var app = {
    onDeviceReady: function () {
        app.startDB();
        window.addEventListener("batterystatus", app.onBatteryStatus, false);
    },

    onBatteryStatus: function(status) {
        console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
        document.getElementById("bateria").innerHTML = status.level;
    },

    startDB: function () {
        if (!window.openDatabase) {
            alert(`Navegador nao suporta WebSQL`);
            return;
        } else {
            db = openDatabase(shortName, version, displayName, maxSize);
            db.transaction(function (tx) {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS Produtos(Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Nome TEXT NOT NULL, Preco TEXT NOT NULL, Barcode TEXT)`);
                console.log('tabela criada');
            })
        }
        app.lista();
    },

    lista: function() {
        function onSuccess(tx, results) {
            console.log(JSON.stringify(results.rows));
            let html = ``;
            [...results.rows].map(row => {
                html += `
                <div class="item">
                    <div class="row">
                        <div class="col">
                            <h2>${row.Nome}</h2>
                        </div>
                        <div class="col-30">
                            <a onclick="app.delete(${row.Id})" style="color: red;"><i class="icon ion-ios-trash"></i>Excluir</a>
                        </div>
                    </div>
                    <div class="row">
                        <p class="text-grey-500"><b>Preco:</b>R$ ${row.Preco}</p>
                    </div>
                    <div class="row">
                        <p class="text-grey-500"><b>Barcode:</b> ${row.Barcode}</p>
                    </div>
                </div>
                `
            });
            document.getElementById(`listaProds`).innerHTML = html;
        }
        function onError(params) {
            
        }
        db.transaction(function(tx) {
            tx.executeSql(`SELECT * FROM Produtos`, [], onSuccess, onError );
        });
    },

    insere: function () {
        db.transaction(function (tx) {
            let nome = document.getElementById('nome').value;
            let preco = document.getElementById('preco').value;

            tx.executeSql(`INSERT INTO Produtos(Nome,Preco,Barcode) values("${nome}","${preco}", "${barcode}")`);
            console.log(`INSERT INTO Produtos(Nome,Preco,Barcode) values("${nome}","${preco}", "${barcode}")`);
            console.log('inseriu registro');
            document.getElementById('nome').value = "";
            document.getElementById('preco').value = "";
            barcode = "";
            navigator.vibrate([100, 100, 100]);
            alert("Cadastrado com sucesso");
            backPage();
            app.lista();
        })

    },

    delete: function(id) {
        db.transaction(function (tx) {
            tx.executeSql(`DELETE FROM Produtos where id = "${id}"`);
            app.lista();
        });
    },

    scan: function() {
        console.log("scanning");
        cordova.plugins.barcodeScanner.scan(
            function (resultado) {
                if(resultado.text) {
                    console.log(resultado.text)
                    barcode = resultado.text;
                }
            },
            function(error) {
                alert(error)
            }
        )
    }
}