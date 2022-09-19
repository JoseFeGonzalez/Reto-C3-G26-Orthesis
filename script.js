consultarOrtesis();
function crearOrtesis() {
    event.preventDefault();
    const json = {};
    json["id"] = parseInt(document.getElementById("OrtesisId").value);
    json["brand"] = document.getElementById("Brand").value;
    json["model"] = parseInt(document.getElementById("Model").value);
    json["category_id"] = parseInt(document.getElementById("CategoryId").value);
    json["name"] = document.getElementById("Name").value;

    $.ajax({
        url: 'https://g4e5d4aef49a6d7-pcaan8wzubbfgz4j.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis',
        data: json,
        type: "POST",
        dataType: 'json',
        complete: function(){
            alert("Órtesis creada");
            limpiarCampos();
            location.reload();
        }
    })
}

function limpiarCampos(){
    document.getElementById("OrtesisId").value = ''; 
    document.getElementById("Brand").value = '';
    document.getElementById("Model").value = '';
    document.getElementById("CategoryId").value = '';
    document.getElementById("Name").value = '';

}

function consultarOrtesis(){
    const table = document.getElementById("ListaOrtesis").getElementsByTagName('tbody')[0];
    $.ajax({
        url: 'https://g4e5d4aef49a6d7-pcaan8wzubbfgz4j.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis',
        data: null,
        type: "GET",
        dataType: 'json',
        success: function(data){
            data.items.map(item => {
                const nuevaOrtesis = table.insertRow();
                nuevaOrtesis.insertCell(0).innerHTML = item.id
                nuevaOrtesis.insertCell(1).innerHTML = item.brand
                nuevaOrtesis.insertCell(2).innerHTML = item.model
                nuevaOrtesis.insertCell(3).innerHTML = item.category_id
                nuevaOrtesis.insertCell(4).innerHTML = item.name
                nuevaOrtesis.insertCell(5).innerHTML = `
                <button onClick="seleccionarOrtesis(this)">Seleccionar</button>
                <button onClick="eliminarOrtesis(${item.id})">Eliminar</button>
                `;
            })
        },
        error: function(error){
            alert("Error Load");
            console.log(error);
        },
        complete: function(){
            alert("Carga completada");
        }
    })

}

function seleccionarOrtesis(elemento){
    ortesis = elemento.parentElement.parentElement;
    document.getElementById("OrtesisId").value = ortesis.cells[0].innerHTML; 
    document.getElementById("Brand").value = ortesis.cells[1].innerHTML;
    document.getElementById("Model").value = ortesis.cells[2].innerHTML;
    document.getElementById("CategoryId").value = ortesis.cells[3].innerHTML;
    document.getElementById("Name").value = ortesis.cells[4].innerHTML;
}

function editarOrtesis(){
    const json = {};
    json["id"] = parseInt(document.getElementById("OrtesisId").value);
    json["brand"] = document.getElementById("Brand").value;
    json["model"] = parseInt(document.getElementById("Model").value);
    json["category_id"] = parseInt(document.getElementById("CategoryId").value);
    json["name"] = document.getElementById("Name").value;

    $.ajax({
        url: 'https://g4e5d4aef49a6d7-pcaan8wzubbfgz4j.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis',
        data: json,
        type: "PUT",
        dataType: 'json',
        complete: function(){
            alert("Órtesis editada");
            limpiarCampos();
            location.reload();
        }
    })
}

function eliminarOrtesis(id){
    $.ajax({
        url: 'https://g4e5d4aef49a6d7-pcaan8wzubbfgz4j.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis/'+id,
        data: null,
        type: "DELETE",
        dataType: 'json',
        complete : function(){
            alert("Eliminacion OK");
            location.reload();
        }
    })
}