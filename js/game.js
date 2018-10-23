var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS);


/* ESTADOS DO GAME */ 

// game.state.add(identity, state); tudo global nesse caraio
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('stage', stageState);
game.state.add('end', endState);

game.state.start('boot'); // inicio do game