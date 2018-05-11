export class Slider {
    constructor(rootElement) {
        this.root = rootElement;
        this.mainControls = this.root.find('div.main-controls');
        this.contentControls = this.root.find('div.content-controls');
        this.contentList = this.contentControls.find('ul.list');
        this.mainList = this.root.find(this.mainControls).find('ul.list');
        this.mainBtns = this.root.find('button.btn-main');
        this.contentBtns = this.root.find('button.btn-content');
        this.sliderContent = this.root.find('div.slide-content');
        
        this.setActiveSlide = this.setActiveSlide.bind(this);
        this.setContent = this.setContent.bind(this);
    }
    init() {
        this.mainBtns.on('click', this.setActiveSlide);
        this.contentBtns.on('click', this.setContent);
        this.setDefaultParam();
    }
    setActiveSlide(event) {
        event.preventDefault();
        let $targetBtn = $(event.currentTarget);
        let targetCategory = $targetBtn.data('category');
        let currentIndex = $targetBtn.parent().index();
        this.setActiveBtn(this.mainBtns, $targetBtn);
        this.setActiveContentList(currentIndex);
        this.setActivePosition(-(this.slideHeight * currentIndex));
        this.setDefaultContent(this.contentList);
    }
    setContent(event) {
        event.preventDefault();
        let $targetContentBtn = $(event.currentTarget);
        this.sliderContent.text($targetContentBtn.text());
        this.setActiveBtn(this.contentBtns, $targetContentBtn);
    }
    setDefaultParam() {
        this.root.css({ 
            display: 'flex'
        });
        this.contentControls.height(this.mainList.height());
        this.slideHeight = this.contentControls.children().first()
            .outerHeight(true);
        this.mainControls.find('li.item').first().find(this.mainBtns)
            .addClass('active')
            .attr('disabled', true);
        this.contentList.first().addClass('active');
        this.setDefaultContent(this.contentList);
    }
    setDefaultContent(element) {
        let currentContent = this.getActiveElement(element)
            .find('li.item:first-child').find(this.contentBtns);
        this.sliderContent.text(currentContent.text());
        this.setActiveBtn(this.contentBtns, currentContent);
    }
    setActiveBtn(elements, target) {
        this.clearActive(elements);
        target.addClass('active');
        elements.filter((i, el) => $(el).prop('disabled') === true)
            .attr('disabled', false);
        target.attr('disabled', true);
    }
    setActiveContentList(index) {
        this.clearActive(this.contentList);
        this.contentList.eq(index).addClass('active');
    }
    clearActive(elements) {
        this.getActiveElement(elements).removeClass('active');
    }
    getActiveElement(elements) {
        return elements.filter((i, el) =>
            $(el).hasClass('active'));
    }
    setActivePosition(marginContainer) {
        this.contentControls.animate({
            'margin-top': marginContainer
        });
    }
}

export const slider = new Slider($('.slider-action'));
