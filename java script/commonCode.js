// Method to slide the mobile and watches products
function scrollToDiv(id) {
    var element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
}


// Method to change colour of mobile and watches products slider colour change
function changeColor(btnClass) {
    if (btnClass == 'productMoveBtnLeft') {
        document.querySelector('.productMoveBtnLeft').style.backgroundColor = "#72AEC8";
        document.querySelector('.productMoveBtnRight').style.backgroundColor = "transparent";
    }
    else if (btnClass == 'productMoveBtnRight') {
        document.querySelector('.productMoveBtnLeft').style.backgroundColor = "transparent";
        document.querySelector('.productMoveBtnRight').style.backgroundColor = "#72AEC8";
    }
    else if (btnClass == 'watchMoveBtnLeft') {
        document.querySelector('.watchMoveBtnLeft').style.backgroundColor = "#72AEC8";
        document.querySelector('.watchMoveBtnRight').style.backgroundColor = "transparent";
    }
    else {
        document.querySelector('.watchMoveBtnLeft').style.backgroundColor = "transparent";
        document.querySelector('.watchMoveBtnRight').style.backgroundColor = "#72AEC8";
    }


}