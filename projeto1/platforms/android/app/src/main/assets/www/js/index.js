/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.listaContatos();
    },

    listaContatos: function(query="") {
        
        function onSuccess(contacts) {
            // alert('Found ' + contacts.length + ' contacts.');
            console.log(JSON.stringify(contacts));
            $('tbody').html("");
            contacts.map(contact => {
                let conteudo = `<tr><td>${contact.displayName}</td><td>${contact.phoneNumbers[0].value}</td></tr>`;
                $('tbody').append(conteudo);
                return conteudo;
            })
        };
        
        function onError(contactError) {
            alert('onError!');
        };
        
        // find all contacts with 'Bob' in any name field
        var options      = new ContactFindOptions();
        options.filter   = query;
        options.multiple = true;
        // options.desiredFields = [navigator.contacts.fieldType.id];
        options.hasPhoneNumber = true;
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, onSuccess, onError, options);
    },

    salvaContato: function (nome, telefone) {
        function onSuccess() {
            alert(`Contato gravado com sucesso!`);
            $('#nome').val("");
            $('#telefone').val("");
            app.listaContatos();
        }
        function onError(erro) {
            alert(`ERRO ao tentar gravar! ${erro}`);        
        }
        let myContact = navigator.contacts.create({"displayName": nome, "phoneNumbers": [{"value": telefone}]});
        myContact.save(onSuccess, onError);
    },

    pesquisaContato(query) {
        console.log(query);
        app.listaContatos(query);
    }
};
