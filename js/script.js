window.onload = init;

function init() {
    getPetData();
}

function getPetData() {
    var request = new XMLHttpRequest();
    var url = "http://localhost/to-do-list/js/pets.json";
    request.open("GET", url);
    request.onreadystatechange = function() {
        var div = document.getElementById('pets');
        if (this.readyState == this.DONE && this.status == 200) {
            var type = request.getResponseHeader("Content-type");
            console.log("Content-type : " + type);
            console.log("Status : " + this.status);
            if (this.responseText != null) {
                div.innerHTML = this.responseText;
            } else {
                div.innerHTML = "Error. No data";
            }
        }
    }
    request.send();
}