import { $contentControls, $contentList, $mainListHeight } from './variable';

export let onContentControls = {
    init() {
        $contentControls.height($mainListHeight);
        $contentList.each((i, el) => {
            let items = $(el).find('.item');
            let itemsHeight = items.length;
            items.height(`${100 / itemsHeight}%`);
        });
    }
};
