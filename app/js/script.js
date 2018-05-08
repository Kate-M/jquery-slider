
(function () {
    // $('.content-controls').css('overflow', 'hidden');

    $('.main-controls').find('.btn-main').on('click', function () {
        let category = $(this).data('cotegory');
        console.log(category);
        let marginConteiner = parseInt(0, $('.content-controls').css('marginTop'));
        console.log(marginConteiner);
        $('.content-controls').animate({
            'margin-top': marginConteiner - 420
        });
    });
}());

