import { slider } from './slider';

(function () {
    if (slider.root.length) {
        slider.init();
    } else { console.log('Slider not exist'); }
}());

