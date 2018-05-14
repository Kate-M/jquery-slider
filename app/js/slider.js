export class Slider {
    constructor(rootElement) {
        this.root = rootElement;
        this.mainControls = this.root.find('div.main-controls');
        this.contentControls = this.root.find('div.content-controls');
        this.contentList = this.contentControls.find('ul.list');
        this.mainList = this.mainControls.find('ul.list');
        this.sliderContent = this.root.find('div.slide');
    }
    init() {
        this.mainControls.on('click', this.setActiveSlide.bind(this));
        this.contentControls.on('click', this.setContent.bind(this));
        this.setDefaultParam();
    }
    setActiveSlide(event) {
        event.preventDefault();
        $(event.currentTarget).unbind('click');
        let $targetBtn = $(event.target);
        let currentIndex = $targetBtn.parent().index();
        this.clearActive(this.contentList);
        this.contentList.eq(currentIndex).addClass('active');
        this.setActiveBtn(this.mainControls, $targetBtn);
        this.setContentPosition(-(this.slideHeight * currentIndex));
        this.setDefaultContent(this.contentList);
    }
    setDefaultParam() {
        this.contentControls.height(this.mainList.height());
        this.slideHeight = this.contentControls.children().first()
            .outerHeight(true);
        this.mainControls.find('li.item:first-child .btn')
            .addClass('active');
        this.contentList.first().addClass('active');
        this.setDefaultContent(this.contentList);
    }
    setDefaultContent(element) {
        let currentContent = this.getActiveElement(element)
            .find('li.item:first-child .btn');
        this.sliderContent.empty().append(`<div class="item">${currentContent.text()}</div>`);
        this.setActiveBtn(this.contentControls, currentContent);
    }
    setContent(event) {
        event.preventDefault();
        $(event.currentTarget).unbind('click');
        let $targetContentBtn = $(event.target);
        if (!$targetContentBtn.hasClass('active')) {
            this.currentSlide = $(`<div class="item">${$targetContentBtn.text()}</div>`)
                .appendTo(this.sliderContent).prev();
        }
        this.setSlidePosition(this.currentSlide);
        this.setActiveBtn(this.contentControls, $targetContentBtn);
    }
    setActiveBtn(elements, target) {
        let $btnList = elements.find('.btn');
        this.clearActive($btnList);
        target.addClass('active');
    }
    clearActive(elements) {
        this.getActiveElement(elements).removeClass('active');
    }
    getActiveElement(elements) {
        return elements.filter((i, el) =>
            $(el).hasClass('active'));
    }
    setContentPosition(marginContainer) {
        this.contentControls.animate({
            'margin-top': marginContainer
        }, () =>
                this.mainControls.on('click', this.setActiveSlide.bind(this))
        );
    }
    setSlidePosition(slide) {
        slide.animate({
            'margin-left': '-100%'
        }, () => {
            slide.remove();
            this.contentControls.on('click', this.setContent.bind(this));
        });
    }
}
