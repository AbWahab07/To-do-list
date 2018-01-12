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
            if (this.responseText != null) {
                div.innerHTML = this.responseText;
            } else {
                div.innerHTML = "Error : No data";
            }
        }
    }
    request.send();
}