$(function () {
    //滚动动画
    window.scrollReveal = new scrollReveal();
    //数字动画
    $("[data-ride|='numberGrow']").countUp({
        delay: 10,
        time: 800
    });
});
$(function () {
    $(".product-prop1").click(function () {
        $(this).next().stop().slideToggle(400);
    })
});

$(function () {
    $(".common-footer-layout>ul>li").click(function () {
        $(this).children("ul").stop().slideToggle(400);
    })
});
//箭头翻转
$(function () {
    var list = document.querySelectorAll('.layout-list');
    function accordion(e) {
        e.stopPropagation();
        if (this.classList.contains('arrow-up')) {
            this.classList.remove('arrow-up');
        } else if (this.parentElement.classList.contains('arrow-up')) {
            this.classList.add('arrow-up');
        } else {
            for (i = 0; i < list.length; i++) {
                list[i].classList.remove('arrow-up');
            }
            this.classList.add('arrow-up');
        }
    }
    for (i = 0; i < list.length; i++) {
        list[i].addEventListener('click', accordion);
    }
})

$(function () {
    $('.footer-layout-gotop div a').click(function () {
        $('html , body').animate({
            scrollTop: 0
        }, 'fast');
    });
});
$(function () {
    $('.text-layout').click(function () {
        $(this).css("color", "#3b83ff");
    })
});