class Controller {

    game = undefined;
    modals = {
        welcome: undefined,
        paused: undefined,
        gameOver: undefined,
    };

    constructor() {
        this.game = new Game();
        
        const showCallback = function() {document.querySelector('.board').style.opacity = '0.3';};
        const hideCallback = function() {document.querySelector('.board').style.opacity = '1';};
        this.modals.welcome = new Modal('.modal.welcome', showCallback, hideCallback);
        this.modals.paused = new Modal('.modal.paused', showCallback, hideCallback);

        this.bindKeys();

        this.modals.welcome.Show();
    };

    bindKeys() {
        var me = this;
        document.body.addEventListener('keypress', function (e) {
            console.log('keypress', e.key);
            if(e.key === "Enter") {
                if (me.game.status == Game.enumStatus.notStarted && me.modals.welcome.IsVisible()){
                    me.modals.welcome.Hide();
                    me.game.Start();
                } else if (me.game.status == Game.enumStatus.inProgress) {
                    me.modals.paused.Show();
                    me.game.Pause();
                } else if (me.game.status == Game.enumStatus.paused) {
                    me.modals.paused.Hide();
                    me.game.UnPause();
                }
            }
        });
        document.body.addEventListener('click', function (e) {
            // const cell = e.target;
            // const left = cell.offsetLeft;
            // const top = cell.offsetTop;
            // console.log(top,left,cell);
        });
    }
};



let controller = undefined;
document.addEventListener("DOMContentLoaded", function(){
    controller = new Controller();
});