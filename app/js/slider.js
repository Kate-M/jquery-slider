let $mainControls = $('.main-controls');
let $contentControls = $('.content-controls');
let $contentList = $('.content-controls').find('.list');
let $mainBtns = $mainControls.find('.btn-main');
let $contentBtns = $contentControls.find('.btn-content');
let slideHeight = $contentControls.find('.list:first-child').outerHeight(true);

$contentControls.height($mainControls.find('.list').height());

export let onSlider = {
    init() {
        $mainBtns.on('click', this.setActiveSlide.bind(this));
        $contentBtns.on('click', this.setContent.bind(this));
        this.setDefaultParam();
    },
    setActiveSlide(event) {
        event.preventDefault();
        let $targetBtn = $(event.currentTarget);
        let targetCategory = $targetBtn.data('category');
        // this.holdActiveButton($mainBtns, $targetBtn);
        let currentIndex = $targetBtn.parent().index();
        this.setActiveBtn($mainBtns, $targetBtn);
        this.setActiveContentList($contentList, currentIndex);
        this.setActivePosition(-(slideHeight * currentIndex));
        this.setDefaultContent($contentList);
    },
    setContent(event) {
        event.preventDefault();
        let $targetContentBtn = $(event.currentTarget);
        $('.slide-content').text($targetContentBtn.text());
        this.setActiveBtn($contentBtns, $targetContentBtn);
    },
    setDefaultParam() {
        $mainControls.find('.item').first().find($mainBtns)
        .addClass('active')
        .attr('disabled', true);
        $contentList.first().addClass('active');
        this.setDefaultContent($contentList);
    },
    setDefaultContent(element) {
        let currentContent = this.getActiveElement(element)
            .find('.item:first-child').find($contentBtns);
        $('.slide-content').text(currentContent.text());
        this.setActiveBtn($contentBtns, currentContent);
    },
    setActiveBtn(elements, target) {
        this.clearActive(elements);
        target.addClass('active');
        elements.filter((i, el) => $(el).prop('disabled') === true)
        .attr('disabled', false);
        target.attr('disabled', true);
    },
    setActiveContentList(elements, index) {
        this.clearActive(elements);
        elements.eq(index).addClass('active');
    },
    clearActive(elements) {
        this.getActiveElement(elements).removeClass('active');
    },
    getActiveElement(elements) {
        return elements.filter((i, el) =>
            $(el).attr('class').indexOf('active') > -1);
    },
    setActivePosition(marginConteiner) {
        $contentControls.animate({
            'margin-top': marginConteiner
        });
    },
    // holdActiveButton(buttons, target) {
    //     let hold = buttons.filter((i, el) => 
    //         $(el).attr('disable'));
    //     console.log(hold);
    //     target.attr('disabled', true);
    // }
};
