window.onload = () => {
    var lista = document.getElementById("S_E");
    lista.onchange = () => {
        if (lista.value == "Deshabilitar")
            location.href = "/"
        else
            window.location = "/S_E:" + lista.value;
    }
}

function myfun1(h) {
    if (h == "search") {
        document.querySelector('.selectE').setAttribute('hidden', false)
        document.querySelector('.Ag').removeAttribute('hidden', false)
    }
    if (h == "search_ag")
        document.querySelector('.selectE').setAttribute('hidden', false)
    else {
        document.querySelector('.selectE').removeAttribute('hidden')
        document.querySelector('.Ag').setAttribute('hidden', false)
    }

}

$(function myfun(h_d) {
    if (h_d == "false") {
        $(".disable").removeAttr('disabled')
    }
    if (h_d == "true" || h_d == "true_defect") {
        $(".disable").attr('disabled')
    }
    if (h_d == "false_v") {
        $(".disable").removeAttr('disabled')
        $(".disable").attr('type', 'radio')
    }
});