window.onload = () => {
    var lista = document.getElementById("S_E"),
        lista2 = document.getElementById("C_R")
    lista.onchange = () => {
        alert(lista.value)
        redirect("S_E", lista.value)

    }
    lista2.onchange = () => {
        redirect("C_R", lista2.value)
    }
}

function redirect(l, value) {
    if (value == "Deshabilitar")
        location.href = "/"
    else
        window.location = "/" + l + ":" + value;
}

function on() {
    var listaAdd = document.getElementById("inputGroupSelect01")
    location.href = "/agregar:nums=" + listaAdd.value;
}

function onsub(cant) {

    var i = 0
    while (i <= cant) {}
}

function hilos(cant) {
    $('.submit' + i).click()
    i++
}

function myfun(h_d, h, e) {
    var select = 0,
        inputGroupSelect01 = document.getElementById("inputGroupSelect01")
    if (h_d == "false") {
        $(".disable").removeAttr('disabled')
        select = 1
    }
    if (h_d == "true_defect") {
        $(".disable").attr('disabled')
        select = 0
    }
    if (h_d == "false_v") {
        $(".disable").removeAttr('disabled')
        $(".disable").attr('type', 'radio')
        select = 2
    }
    document.querySelector(".selectE").options.item(select).setAttribute('selected', false)

    if (h == "search") {
        document.querySelector(".selectE").setAttribute('hidden', false)
        document.querySelector(".Ag").removeAttribute('hidden')
    } else if (h == "search_ag")
        document.querySelector(".selectE").setAttribute('hidden', false)
    else {
        document.querySelector(".selectE").removeAttribute('hidden')
        document.querySelector(".Ag").setAttribute('hidden', false)
    }
    if (inputGroupSelect01 != null)
        inputGroupSelect01.options.item(e).setAttribute('selected', false)
}