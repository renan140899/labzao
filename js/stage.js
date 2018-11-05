var stageState = {
    player: null,
    grupoBlocos: null,
    horaProximoBloco: 0,
    aceleracaoAndar: 1250,
    aceleracaoAndarFreio: 1750,
    velocidadeAndarMax: 500,
    gravidadeBlocos: 20,
    score: 0,
    highScore:0,
    aceleracaoContador: 0,
    txtLab: "",
    txtScore: "",
    txtGameOver: "",
    txtScoreTela: "",
    txtHighScore: "",
    txtRestart: "",
    txtMenu: "",
    txtNovoHighScore: "",
    leftButton: null,
    rightButton: null,
    left:null,
    right:null,
    create: function () {
      // add a hypothetical 10x10 sprite
      left = game.add.sprite(0,-50, 'test');
      left.inputEnabled = true;
      left.hitArea = new Phaser.Rectangle(0,0, window.innerWidth/2, window.innerHeight+50);
      left.events.onInputDown.add(function() {this.player.body.velocity.x = -250;}, this);

      right = game.add.sprite(window.innerWidth/2,-50, 'e');
      right.inputEnabled = true;
      right.hitArea = new Phaser.Rectangle(0,0, window.innerWidth/2, window.innerHeight+50);
      right.events.onInputDown.add(function() {this.player.body.velocity.x = 250;}, this);

     game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.add.tileSprite(0, 0, 800, 600, "bg");
        game.stage.backgroundColor = "#54a0ff";

        this.player = game.add.sprite(100, window.innerHeight - 40, "player");

        game.physics.arcade.enable(this.player);

        this.player.body.collideWorldBounds = true;
        this.player.animations.add("esquerda", [0, 1, 2, 3], 12, true);
        this.player.animations.add("parado", [4], 1, true);
        this.player.animations.add("direita", [5, 6, 7], 12, true);
        this.player.animations.play("parado");

        // Estamos criando um atributo novo (o JavaScript permite isso)
        this.player.body.velocidadeAntiga = 0;
        this.player.body.animacaoAtual = 0;
        this.player.body.maxVelocity.x = this.velocidadeAndarMax;
        this.player.body.maxVelocity.y = this.velocidadePuloMax;

        this.grupoBlocos = game.add.group();
        this.grupoBlocos.enableBody = true;
        //this.grupoBlocos.createMultiple(15, 'block');
        game.physics.arcade.enable(this.grupoBlocos);


        this.txtScore = game.add.text(160, 40, 'Score: 0', {
            font: '30px emulogic',
            fill: '#fff'
        });
        this.txtScore.anchor.set(0.5);

        this.txtGameOver = game.add.text(game.world.centerX, -50, 'Game Over', {
            font: '60px emulogic',
            fill: '#fff'
            });
            this.txtGameOver.anchor.set(0.5);

        this.txtNovoHighScore = game.add.text(-500, 320, 'Novo High Score!!', {
                font: '35px emulogic',
                fill: '#fff'
            });
            this.txtNovoHighScore.anchor.set(0.5);

        this.txtScoreTela = game.add.text(-300, 400, 'Score: 0', {
                font: '50px emulogic',
                fill: '#fff'
            });
            this.txtScoreTela.anchor.set(0.5);


        this.txtHighScore = game.add.text(-300, 470, 'High Score: 0', {
                font: '20px emulogic',
                fill: '#fff'
            });
            this.txtHighScore.anchor.set(0.5);


        this.txtRestart = game.add.text(window.innerWidth + 300, 550, 'Restart', {
                font: '30px emulogic',
                fill: '#fff'
            });
            this.txtRestart.anchor.set(.5);
            this.txtRestart.inputEnabled = true;
            this.txtRestart.events.onInputDown.add(this.retornaGame, this);


        this.txtMenu = game.add.text(window.innerWidth + 300, 600, 'Menu', {
                font: '25px emulogic',
                fill: '#fff'
            });
            this.txtMenu.anchor.set(.5);
            this.txtMenu.inputEnabled = true;
            this.txtMenu.events.onInputDown.add(this.backMenu, this);

        this.restart();

    },

  /*  atualizarPosicaoPlayer: function () {
        var a = 0;
        var v = this.player.body.velocity.x;
        if (game.input.mousePointer.x < (this.player.body.position.x - 10)) {
            if (v > 0) {
                // Derrapando! (Poderíamos utilizar uma animação especial aqui, para mostrar a derrapagem)
                a = -this.aceleracaoAndarFreio;
            } else {
                a = -this.aceleracaoAndar;
            }
        } else if (game.input.mousePointer.x > (this.player.body.position.x + 10)) {
            if (v < 0) {
                // Derrapando! (Poderíamos utilizar uma animação especial aqui, para mostrar a derrapagem)
                a = this.aceleracaoAndarFreio;
            } else {
                a = this.aceleracaoAndar;
            }
        } else {
            if (v > 0) {
                if (this.player.body.velocidadeAntiga < 0) {
                    // Força a parada!
                    a = 0;
                    v = 0;
                } else {
                    // Ainda estamos parando
                    a = -this.aceleracaoAndarFreio;
                }
            } else if (v < 0) {
                if (this.player.body.velocidadeAntiga > 0) {
                    // Força a parada!
                    a = 0;
                    v = 0;
                } else {
                    // Ainda estamos parando
                    a = this.aceleracaoAndarFreio;
                }
            }
        }

        // Utilizando player.body.onFloor() e player.body.touching.down,
        // também poderíamos criar uma animação especial para quando o
        // personagem está pulando no ar...

        if (v > 0) {
            if (this.player.body.animacaoAtual !== 1) {
                this.player.body.animacaoAtual = 1;
                this.player.animations.play("direita");
            }
        } else if (v < 0) {
            if (this.player.body.animacaoAtual !== -1) {
                this.player.body.animacaoAtual = -1;
                this.player.animations.play("esquerda");
            }
        } else {
            if (this.player.body.animacaoAtual !== 0) {
                this.player.body.animacaoAtual = 0;
                this.player.animations.play("parado");
            }
        }

        this.player.body.velocidadeAntiga = v;
        this.player.body.velocity.x = v;
        this.player.body.acceleration.x = a;
    },*/
    update: function () {

        var agora = game.time.now;

        if (agora >= this.horaProximoBloco) {
            this.horaProximoBloco = agora + 500 + (1000 * Math.random());
            this.aparecerBloco();
        }

        if (agora >= this.aceleracaoContador) {
            this.aceleracaoContador = agora + 50 + (100 * Math.random());
            this.score++;
        }

        this.txtScore.setText("Score: " + this.score);


        this.gravidadeBlocos += 0.4;

        //this.atualizarPosicaoPlayer();

        game.physics.arcade.overlap(this.player, this.grupoBlocos, this.colisaoBloco, null, this);

    },

    restart: function(){



        this.score = 0;
        this.gravidadeBlocos = 20,
        this.player.revive();


    },


    aparecerBloco: function () {

        var x = Math.floor(Math.random() * (window.innerWidth - 0 + 1)) + 0;
        var y = -50;

        var bloco = this.grupoBlocos.create(x, y, 'block');

        game.physics.arcade.enable(bloco);
        bloco.body.enable = true;
        bloco.anchor.x = 0.5;
        bloco.anchor.y = 0.5;
        bloco.body.gravity.y = this.gravidadeBlocos;

    },

    retornaGame: function(){

        game.state.start('stage');
    },

    backMenu: function(){

        game.state.start('menu');
    },

    colisaoBloco: function (player, bloco) {


        this.player.kill();
        game.add.tween(this.txtGameOver).to({y:150},500).start();
        game.add.tween(this.txtScoreTela).to({x:game.world.centerX},500).start();
        game.add.tween(this.txtHighScore).to({x:game.world.centerX},500).start();
        game.add.tween(this.txtRestart).to({x:game.world.centerX},500).start();
        game.add.tween(this.txtMenu).to({x:game.world.centerX},500).start();


        if( this.score > this.highScore){
            this.highScore = this.score;
            game.add.tween(this.txtNovoHighScore).to({x:game.world.centerX},500).start();
        }

        this.txtScoreTela.text = "Score: " + this.score;
        this.txtHighScore.text = "High Score: " + this.highScore;

        this.txtScore.visible = false;

        //game.state.start('end');

    }

};
