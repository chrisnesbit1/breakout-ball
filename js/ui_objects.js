// class UiConstants {
//     static get Colors() { return ["green", "red", "blue", "yellow", "fuchsia", "lime", "aqua"]; };
// }

// class Random {

//     static Number(random_min, random_max) {
//         return Math.floor(Math.random() * (random_max - random_min + 1)) + random_min;
//     }

//     static Color() {
//         return UiConstants.Colors[Random.Number(0, UiConstants.Colors.length-1)];
//     }
// }

// class Modal {

//     cssSelector = '.modal';
//     showCallback = undefined;
//     hideCallback = undefined;

//     constructor(model) {
//         this.cssSelector = model.cssSelector;
//         this.showCallback = model.showCallback;
//         this.hideCallback = model.hideCallback;
//     };
//     Show() {
//         document.querySelector(this.cssSelector).style.display = 'block';
//         this.showCallback();
//     };
//     Hide() {
//         document.querySelector(this.cssSelector).style.display = 'none';
//         this.hideCallback();
//     };
//     IsVisible() {
//         return document.querySelector(this.cssSelector).style.display != 'none';
//     }
// };
