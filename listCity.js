showListNation();
showListCity();


function showListCity(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city`,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
            <th scope="row">${data[i].id}</th>
            <td><a onclick="showDetail(${data[i].id})" data-bs-toggle="modal" data-bs-target="#myModal2" >${data[i].name}</a></td>                      
            <td> ${data[i].nation.name} </td>
            <td><button type="button" onclick="showEditForm(${data[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>           
            <td><button onclick="deleteCity(${data[i].id})">Delete</button></td> 
        </tr>`
            }
            $("#listCity").html(content);
        }
    })
}
function showDetail(id) {
    let content = `<div class="container2">
                    <form>
                        <div class="mb-3">
                            <label for="name2" class="form-label" >Name</label>
                            <input type="text" class="form-control" id="name2" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="area2" class="form-label">Area</label>
                            <input type="text" class="form-control" id="area2" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="population2" class="form-label">Population</label>
                            <input type="text" class="form-control" id="population2" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="gdp2" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="gdp2" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="des3" class="form-label">Description</label>
                            <input type="text" class="form-control" id="des3" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="listNation3" class="form-label">Nation</label>
                            <input type="text" id="listNation3" class="form-control" readonly>
                                                   
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>                          

                        </div>
                    </form>
                </div>`
    $("#showDetail").html(content)
    showListNation();
    $.ajax({
        type: "GET",
        url:`http://localhost:8080/city/${id}`,
        success: function (data) {
            $(`#name2`).val(data.name)
            $(`#area2`).val(data.area)
            $(`#population2`).val(data.population)
            $(`#gdp2`).val(data.gdp1)
            $(`#des3`).val(data.describe1)
            $(`#listNation3`).val(data.nation.name)
        }
    })
}


function showEditForm(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name1" class="form-label" >Name</label>
                            <input type="text" class="form-control" id="name1">
                        </div>
                        <div class="mb-3">
                            <label for="area1" class="form-label">Area</label>
                            <input type="text" class="form-control" id="area1">
                        </div>
                        <div class="mb-3">
                            <label for="population1" class="form-label">Population</label>
                            <input type="text" class="form-control" id="population1">
                        </div>
                        <div class="mb-3">
                            <label for="gdp1" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="gdp1">
                        </div>
                        <div class="mb-3">
                            <label for="des1" class="form-label">Description</label>
                            <input type="text" class="form-control" id="des1">
                        </div>
                        <div class="mb-3">
                            <label for="listNation" class="form-label">Nation</label>
                            <select  id="listNation" class="form-control"></select>                             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="editCity(${id})" data-bs-dismiss="modal">Edit</button>

                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    showListNation();
    $.ajax({
        type: "GET",
        url:`http://localhost:8080/city/${id}`,
        success: function (data) {
            $(`#name1`).val(data.name)
            $(`#area1`).val(data.area)
            $(`#population1`).val(data.population)
            $(`#gdp1`).val(data.gdp1)
            $(`#des1`).val(data.describe1)
            $(`#listNation`).val(data.nation.id)
        }
    })
}

function editCity(id){
    event.preventDefault();
    let name = $(`#name1`).val();
    let area = $(`#area1`).val();
    let population = $(`#population1`).val();
    let gdp1 = $(`#gdp1`).val();
    let describe1 = $(`#des1`).val();
    let nation_id = $(`#listNation`).val();

    let newCity = {
        "name": name,
        "area": area,
        "population": population,
        "gdp1": gdp1,
        "describe1": describe1,
        "nation":{
            "id":nation_id
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newCity),
        url: `http://localhost:8080/city/${id}`,
        success: showListCity
    })
}



function showListNation(){
    $.ajax({
        type:"GET",
        url: "http://localhost:8080/nation",
        success: function (nation){
            let content = "";
            for (let i = 0; i < nation.length; i++) {
                content += `<option value="${nation[i].id}">${nation[i].name}</option>`

            }
            $("#listNation").html(content);
            $("#listNation1").html(content);
            $("#listNation3").html(content);
        }
    })
}

function deleteCity(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/city/${id}`,
        success:
        showListCity
    })
    event.preventDefault();
}

function showCreateForm(){
    let content = `<div class="container1">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label" >Name</label>
                            <input type="text" class="form-control" id="name">
                        </div>
                        <div class="mb-3">
                            <label for="area" class="form-label">Area</label>
                            <input type="text" class="form-control" id="area">
                        </div>
                        <div class="mb-3">
                            <label for="population" class="form-label">Population</label>
                            <input type="text" class="form-control" id="population">
                        </div>
                        <div class="mb-3">
                            <label for="gdp" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="gdp">
                        </div>
                        <div class="mb-3">
                            <label for="des" class="form-label">Description</label>
                            <input type="text" class="form-control" id="des">
                        </div>
                        <div class="mb-3">
                            <label for="listNation1" class="form-label">Nation</label>
                            <select  id="listNation1" class="form-control"></select>                             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="createCity()" data-bs-dismiss="modal">Create</button>

                        </div>
                    </form>
                </div>`
    $("#showModal").html(content);
    showListNation();
}


function createCity() {
    let name = $(`#name`).val();
    let area = $(`#area`).val();
    let population = $(`#population`).val();
    let gdp1 = $(`#gdp`).val();
    let describe1 = $(`#des`).val();
    let nation_id = $(`#listNation1`).val();

    let city = {
        "name": name,
        "area": area,
        "population": population,
        "gdp1": gdp1,
        "describe1": describe1,
        "nation":{
            "id":nation_id
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(city),
        url: `http://localhost:8080/city`,
        success: showListCity
    })
    event.preventDefault();
}




