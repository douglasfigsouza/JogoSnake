var Snake = [];
var direcao = "Down";
var dirAnterior = "Down";
var vivo = true;
var Timer = 0;
var intervalo = 400;
var bloqueiaDirecao = true;

$(document).ready(function () {
    $(document).keydown(function (t) {
        if (bloqueiaDirecao) {
            var key = t.which;
            switch (key) {
                case 38:
                case 87:
                    dirAnterior = direcao;
                    direcao = "Up";
                    bloqueiaDirecao = false;
                    break;
                case 40:
                case 83:
                    dirAnterior = direcao;
                    direcao = "Down";
                    bloqueiaDirecao = false;
                    break;
                case 37:
                case 65:
                    dirAnterior = direcao;
                    direcao = "Left";
                    bloqueiaDirecao = false;
                    break;
                case 39:
                case 68:
                    dirAnterior = direcao;
                    direcao = "Right";
                    bloqueiaDirecao = false;
                    break;
            }
        }
    });

    var tabuleiro = "";
    tabuleiro += "<table class='tableCustom'><tbody id='tabuleiro'>";

    for (var i = 0; i < 9; i++) {
        tabuleiro += "<tr>"
        for (var j = 0; j < 10; j++) {
            tabuleiro += "<td  id=" + i + "_" + j + " class='default'></td>";
        }
        tabuleiro += "</tr>";
    }
    tabuleiro += "</tbody></table>";
    $("#containerTabuleiro").append(tabuleiro);
    $("#bestScore").text(localStorage.getItem("bestScore"));
    initSnake();
    geraComida();
    movimentaSnake();
});

function initSnake() {
    Snake.push({ status: "cabeça", linha: 2, coluna: 0 });
    Snake.push({ status: "corpo", linha: 0, coluna: 0 });
    Snake.push({ status: "corpo", linha: 1, coluna: 0 });

    pintaSnake();
};
//Faz todas as posições do corpo mudarem para posição da cabeça
function move() {
    Snake[Snake.length - 1].status = "cabeça";
    for (var i = 0; i < Snake.length - 1; i++) {
        Snake[i].coluna = Snake[i + 1].coluna;
        Snake[i].linha = Snake[i + 1].linha;
        Snake[i].status = "corpo";
    }
};

function moveCabecaSnake() {
    clearInterval(Timer);
    move();
    //impede que a snake ande na direção oposta a atual
    if (direcao == "Right" && dirAnterior == "Left") {
        direcao = "Left";
    }
    else if (direcao == "Left" && dirAnterior == "Right") {
        direcao = "Right";
    }
    if (direcao == "Up" && dirAnterior == "Down") {
        direcao = "Down";
    }
    else if (direcao == "Down" && dirAnterior == "Up") {
        direcao = "Up";
    }

    switch (direcao) {
        case ("Right"):
            if (Snake[Snake.length - 1].coluna == 9) {
                Snake[Snake.length - 1].coluna = 0;
            } else {
                Snake[Snake.length - 1].coluna = Snake[Snake.length - 1].coluna + 1;
            }
            break;
        case ("Left"):
            if (Snake[Snake.length - 1].coluna == 0) {
                Snake[Snake.length - 1].coluna = 9;
            }
            else {
                Snake[Snake.length - 1].coluna = Snake[Snake.length - 1].coluna - 1;
            }
            break;
        case ("Down"):
            if (Snake[Snake.length - 1].linha == 8) {
                Snake[Snake.length - 1].linha = 0;
            }
            else {
                Snake[Snake.length - 1].linha = Snake[Snake.length - 1].linha + 1;
            }
            break;
        case ("Up"):
            if (Snake[Snake.length - 1].linha == 0) {
                Snake[Snake.length - 1].linha = 8;
            }
            else {
                Snake[Snake.length - 1].linha = Snake[Snake.length - 1].linha - 1;
            }
            break;
    }
    gameOver(Snake[Snake.length - 1].linha, Snake[Snake.length - 1].coluna);
    comer(Snake[Snake.length - 1].linha, Snake[Snake.length - 1].coluna);
};

function pintaSnake() {
    for (var i = 0; i <= Snake.length - 1; i++) {
        if (Snake[i].status == "corpo") {
            $("td#" + (Snake[i].linha) + "_" + Snake[i].coluna + "").attr("class", "colorSnake");
        }
        if (Snake[i].status == "cabeça") {
            $("td#" + (Snake[i].linha) + "_" + (Snake[i].coluna) + "").attr("class", "colorHead");
        }
    }
};

function apagaSnake() {
    $("td#" + (Snake[0].linha) + "_" + Snake[0].coluna + "").attr("class", "default");
};

function movimentaSnake() {
    if (vivo) {
        apagaSnake();
        moveCabecaSnake();
        pintaSnake();
        Timer = setInterval(function () {
            bloqueiaDirecao = true;
            movimentaSnake();
        }, intervalo);
     }
};

function geraComida() {
    //cria posições radomicas para geração da comida
    var linhaComida = parseInt(Math.random() * 10);
    var colunaComida = parseInt(Math.random() * 10);

    if ($("td#" + linhaComida + "_" + colunaComida + "").attr("class") == "default") {
        if ((linhaComida > 8 || colunaComida > 9) || (linhaComida > 8 && colunaComida > 9)) {
            ////só permite numeros randomicos dentro do tabuleiro 
            geraComida();
        }
        else {
            $("td#" + linhaComida + "_" + colunaComida + "").attr("class", "colorComida");
        }
    } else {
        geraComida();
    }

};

function comer(x, y) {
    var classe = $("td#" + x + "_" + y).attr("class");
    if (classe == "colorComida") {
        $("td#" + x + "_" + y + "").attr("class", "default");
        geraComida();
        $("#scoreAtual").text(Snake.length);

        clearInterval(Timer);
        intervalo -= 10;
        //adicionando na ultima posiçaõ do vetor
        Snake.splice(0, 0, { status: "cabeça", linha: x, coluna: y });
    }
    else return false;
};

function gameOver(x, y) {
    var classe = $("td#" + x + "_" + y).attr("class");
    if (classe == "colorSnake") {
        vivo = false;
        var bestScore = localStorage.getItem("bestScore");
        if (bestScore < Snake.length - 1) {
            localStorage.setItem("bestScore", (Snake.length));
        }
        alert("Ops! Você Perdeu.");
    }
};