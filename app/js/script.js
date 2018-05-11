import { Slider } from './slider';

let slider = new Slider($('.slider-action'));

(function () {
    if ($('*').is(slider.root)) {
        slider.init();
    } else { console.log('Slider not exist'); }
}());

