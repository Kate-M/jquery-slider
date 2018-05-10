let $mainControls = $('.main-controls');
let $mainListHeight = $mainControls.find('.list').height();
let $contentControls = $('.content-controls');
let $contentList = $contentControls.find('.list');
let marginList = parseInt($(contentControls)
    .children()
    .first()
    .css('marginBottom'),
    10);
let heightContainer = $contentControls.height();
let slideHeight = heightContainer + marginList;
let $mainBtn = $mainControls.find('.btn-main');

$contentControls.height($mainListHeight);

export let onSlider = {

    init() {
        $mainControls.find('.btn-main')
            .on('click', this.setActive.bind(this));
    },
    setActive(event) {
        event.preventDefault();
        let $targetBtn = $(event.currentTarget);
        let targetCategory = $targetBtn.data('category');
        let indexBtn = $targetBtn.parent().index();
        let marginValue = -(slideHeight * indexBtn);
        this.setActiveStyle($targetBtn);
        this.setActivePosition(marginValue);
    },
    setActivePosition(marginConteiner) {
        $contentControls.animate({
            'margin-top': marginConteiner
        });
    },
    setActiveStyle(targetBtn) {
        let currentActive = $mainBtn.filter((i, el) =>
            $(el).attr('class').indexOf('active') > -1);
        currentActive.removeClass('active');
        targetBtn.addClass('active');
    }
};

