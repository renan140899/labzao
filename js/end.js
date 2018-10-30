var endState = {
    
    create: function () {
        
        var txtGameOver = game.add.text(game.world.centerX, 150, 'Game Over', {
                font: '40px emulogic',
                fill: '#fff'
            });
            txtGameOver.anchor.set(0.5);
        
        var txtRestart = game.add.text(game.world.centerX, 550, 'Restart', {
                font: '25px emulogic',
                fill: '#fff'
            });
            txtRestart.anchor.set(.5);
            txtRestart.inputEnabled = true;
            txtRestart.events.onInputDown.add(this.restart, this);
            game.add.tween(txtRestart).to({y:250},1100).start();
        
        var txtMenu = game.add.text(game.world.centerX, 600, 'Menu', {
                font: '20px emulogic',
                fill: '#fff'
            });
            txtMenu.anchor.set(.5);
            txtMenu.inputEnabled = true;
            txtMenu.events.onInputDown.add(this.backMenu, this);

    },
    
    restart: function(){
        
        game.state.start('stage');
    },
    
    backMenu: function(){
        
        game.state.start('menu');
    },

    update: function () {
        
    }

};