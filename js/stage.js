var stageState = {
    player: null,
    blocks: null,
    horaProximoBloco: 0,
    aceleracaoAndar: 1250,
    aceleracaoAndarFreio: 1750,
    velocidadeAndarMax: 500,
    gravidadeBlocos: 0,

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.tileSprite(0, 0, 800, 600, "bg");

        this.player = game.add.sprite(100, window.innerHeight - 40, "player");

        game.physics.arcade.enable(this.player);

        this.player.body.collideWorldBounds = true;
        this.player.animations.add("esquerda", [0, 1, 2, 3], 12, true);
        this.player.animations.add("parado", [4], 1, true);
        this.player.animations.add("direita", [5, 6, 7, 8], 12, true);
        this.player.animations.play("parado");

        // Estamos criando um atributo novo (o JavaScript permite isso)
        this.player.body.velocidadeAntiga = 0;
        this.player.body.animacaoAtual = 0;
        this.player.body.maxVelocity.x = this.velocidadeAndarMax;
        this.player.body.maxVelocity.y = this.velocidadePuloMax;

        this.blocks = game.add.physicsGroup();
    },

    atualizarPosicaoPlayer: function () {
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
    },

    update: function () {

        var agora = game.time.now;

        if (agora >= this.horaProximoBloco) {
            this.horaProximoBloco = agora + 500 + (1000 * Math.random());
            this.aparecerBloco();
        }

        this.gravidadeBlocos += 0.4;

        this.atualizarPosicaoPlayer();

        game.physics.arcade.collide(this.player, this.blocks, this.collisionHandler, null, this);
    },
    aparecerBloco: function () {
        var x = Math.floor(Math.random() * (window.innerWidth - 0 + 1)) + 0;
        var y = -50;

        this.blocks = game.add.sprite(x, y, 'block', this);
        game.physics.enable(this.blocks, Phaser.Physics.ARCADE);
        this.blocks.body.gravity.y = this.gravidadeBlocos;
    },
    collisionHandler: function (obj1, obj2) {
        //console.log('elmeri is collising');
        //alert('Game Over');
    },
    gameOver: function (p, b) {
        console.log('elmeri is collising')
    }

};