class UiConstants {
    static get Colors() { return ["green", "red", "blue", "yellow", "fuchsia", "lime", "aqua"]; };
}

class Random {

    static Number(random_min, random_max) {
        return Math.floor(Math.random() * (random_max - random_min + 1)) + random_min;
    }

    static Color() {
        return UiConstants.Colors[Random.Number(0, UiConstants.Colors.length-1)];
    }
}

class Modal {

    cssSelector: string = '.modal';
    showCallback: () => void;
    hideCallback: () => void;

    constructor(cssSelector: string, showCallback: () => void, hideCallback: () => void) {
        this.cssSelector = cssSelector;
        this.showCallback = showCallback;
        this.hideCallback = hideCallback;
    };
    Show() {
        (document.querySelector(this.cssSelector) as HTMLElement).style.display = 'block';
        this.showCallback();
    };
    Hide() {
        (document.querySelector(this.cssSelector) as HTMLElement).style.display = 'none';
        this.hideCallback();
    };
    IsVisible() {
        return (document.querySelector(this.cssSelector) as HTMLElement).style.display != 'none';
    }
};
