let $mainControls = $('.main-controls');
let $contentControls = $('.content-controls');
let $mainBtn = $mainControls.find('.btn-main');
let slideHeight = $contentControls.find('.list:first-child').outerHeight(true);

$contentControls.height($mainControls.find('.list').height());

export let onSlider = {
    init() {
        $mainBtn.on('click', this.setActive.bind(this));
    },
    setActive(event) {
        event.preventDefault();
        let $targetBtn = $(event.currentTarget);
        let targetCategory = $targetBtn.data('category');
        let indexBtn = $targetBtn.parent().index();
        this.setActiveStyle($targetBtn);
        this.setActivePosition(-(slideHeight * indexBtn));
    },
    setActivePosition(marginConteiner) {
        $contentControls.animate({
            'margin-top': marginConteiner
        });
    },
    setActiveStyle(targetBtn) {
        $mainBtn.filter((i, el) =>
            $(el).attr('class').indexOf('active') > -1)
            .removeClass('active');
            targetBtn.addClass('active');
    }
};
