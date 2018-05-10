let $mainControls = $('.main-controls');
let $contentControls = $('.content-controls');
let $contentList = $('.content-controls').find('.list');
let $mainBtns= $mainControls.find('.btn-main');
let $contentBtn = $contentControls.find('.btn-content');
let slideHeight = $contentControls.find('.list:first-child').outerHeight(true);

$contentControls.height($mainControls.find('.list').height());

export let onSlider = {
    init() {
        $mainBtns.on('click', this.setActiveSlide.bind(this));
        $contentBtn.on('click', this.setContent.bind(this));
        this.setDefaultContent($contentList);
    },
    setActiveSlide(event) {
        event.preventDefault();
        let $targetBtn = $(event.currentTarget);
        let targetCategory = $targetBtn.data('category');
        let currentIndex = $targetBtn.parent().index();
        this.setActiveBtn($mainBtns, $targetBtn);
        this.setActiveContentList($contentList, currentIndex);
        this.setActivePosition(-(slideHeight * currentIndex));
        this.setDefaultContent($contentList);
        this.clearActiveClass($contentBtn);
    },
    setContent(event) {
        event.preventDefault();
        let $targetContentBtn = $(event.currentTarget);
        $('.slide-content').text($targetContentBtn.text());
        this.setActiveBtn($contentBtn, $targetContentBtn);
    },
    setDefaultContent(element) {
        let currentContent = this.getActiveElement(element).find('.item:first-child').text();
        $('.slide-content').text(currentContent);
    },
    setActivePosition(marginConteiner) {
        $contentControls.animate({
            'margin-top': marginConteiner
        });
    },
    setActiveBtn(element, target) {
        this.clearActiveClass(element);
        target.addClass('active');
    },
    setActiveContentList(element, index) {
        this.clearActiveClass(element);
        element.eq(index).addClass('active');
    },
    clearActiveClass(element) {
        this.getActiveElement(element).removeClass('active');
    },
    getActiveElement(element) {
            return element.filter((i, el) =>
            $(el).attr('class').indexOf('active') > -1);
    },
};
