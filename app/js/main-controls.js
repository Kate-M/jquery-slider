import { $mainControls, $contentControls } from './variable';

let marginList = parseInt($contentControls
    .children()
    .first()
    .css('marginBottom'),
    10);
let heightContainer = $contentControls.height();
let slideHeight = heightContainer + marginList;
let $mainBtn = $mainControls.find('.btn-main');

export let onSlider = {

    init() {
        $mainControls.find('.btn-main')
            .on('click', this.switchAction.bind(this));
    },
    switchAction(event) {
        event.preventDefault();
        let $targetBtn = $(event.currentTarget);
        let targetCategory = $targetBtn.data('category');
        switch (targetCategory) {
            case 'car':
                this.setActive($targetBtn, 0);
                break;
            case 'movie':
                this.setActive($targetBtn, -slideHeight);
                break;
            case 'location':
                this.setActive($targetBtn, -slideHeight * 2);
                break;
            default:
                this.setActive($targetBtn, 0);
        }
    },
    setActive(btn, margin) {
        this.setActiveStyle(btn);
        this.setActivePosition(margin);
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

