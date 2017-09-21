var Snake = [];
var direcao = "Down";
var vivo = true;
$(document).ready(function () {
    $(document).keydown(function (t) {
        dirAnterior = direcao;
        var key = t.which;
        switch (key) {
            case 38:
            case 87:
                direcao = "Up";
                break;
            case 40:
            case 83:
                direcao = "Down";
                break;
            case 37:
            case 65:
                direcao = "Left";
                break;
            case 39:
            case 68:
                direcao = "Right";
                break;
        }
    });
    var tabuleiro = "";

    tabuleiro += "<table class='tableCustom'><tbody id='tabuleiro'>";

    for (var i = 0; i < 9; i++) {
        tabuleiro += "<tr>"
        for (var j = 0; j < 10; j++) {
            tabuleiro += "<td  id=" + i + "_" + j + " class='default'></td>";
        }
        tabuleiro += "</tr>"
    }
    tabuleiro += "</tbody></table>";
    $("#containerTabuleiro").append(tabuleiro);

    $("#bestScore").text(localStorage.getItem("bestScore"));
    initSnake();
    geraComida();
    setInterval(function () {
        movimentaSnake()
    }, 400);
});
function initSnake() {
    Snake.push({ status: "corpo", linha: 0, coluna: 0 });
    Snake.push({ status: "corpo", linha: 1, coluna: 0 });
    Snake.push({ status: "cabeça", linha: 2, coluna: 0 });

    pintaSnake();
}
function move() {
    Snake[Snake.length - 1].status = "cabeça";
    for (var i = 0; i < Snake.length - 1; i++) {
        Snake[i].coluna = Snake[i + 1].coluna;
        Snake[i].linha = Snake[i + 1].linha;
        Snake[i].status = "corpo";
    }
}
function logisticaSnake() {
    gameOver();
    move();
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
    gameOver(Snake[Snake.length-1].linha, Snake[Snake.length-1].coluna);
    verColisao(Snake[Snake.length - 1].linha, Snake[Snake.length - 1].coluna);

}
function pintaSnake() {

    for (var i = 0; i <= Snake.length - 1; i++) {
        $("td#" + (Snake[i].linha) + "_" + Snake[i].coluna + "").removeClass("default");
        if (Snake[i].status == "corpo") {
            $("td#" + (Snake[i].linha) + "_" + Snake[i].coluna + "").addClass("colorSnake");
        }

        if (Snake[i].status == "cabeça") {
            $("td#" + (Snake[i].linha) + "_" + (Snake[i].coluna) + "").addClass("colorHead");
        }
    }
}
function apagaSnake() {
    $("#tabuleiro").children("tr").children("td#" + (Snake[0].linha) + "_" + Snake[0].coluna + "").removeClass("colorHead");
    $("#tabuleiro").children("tr").children("td#" + (Snake[0].linha) + "_" + Snake[0].coluna + "").removeClass("colorSnake");
}
function movimentaSnake() {
    if (vivo) {
        apagaSnake();
        logisticaSnake();
        pintaSnake();
    }
}
function geraComida() {
    //cria posições radomicas para geração da comida
    mx = parseInt(Math.random() * 10);
    my = parseInt(Math.random() * 10);

    if ($("td#" + mx + "_" + my + "").attr("class") == "default" || $("td#" + mx + "_" + my + "").attr("class") != "colorHead colorSnake" || $("td#" + mx + "_" + my + "").attr("class") == "colorHead" || $("td#" + mx + "_" + my + "").attr("class")=="colorSnake") {
        if (mx > 8 || my > 10 || mx > 8 && my > 10) {
            ////só permite numeros randomicos dentro do tabuleiro 
            geraComida();
        }
        else {
            $("td#" + mx + "_" + my + "").removeClass("default");
            $("td#" + mx + "_" + my + "").addClass("colorComida");
        }
    } else geraComida();

}
function verColisao(x, y) {
    if (mx == x && my == y) {
        $("td#" + mx + "_" + my + "").removeClass("colorComida");
        geraComida();
        $("#scoreAtual").text(Snake.length - 2);
        //adicionando na ultima posiçaõ do vetor
        Snake.push({ status: "cabeça", linha: x, coluna: y });
    }
    else return false;
}
function gameOver(x,y) {
    var classe = $("td#" + x + "_" + y).attr("class");
    if (classe == "colorHead colorSnake") {
        vivo = false;
        var bestScore = localStorage.getItem("bestScore");
        if (bestScore < Snake.length - 1) {
            localStorage.setItem("bestScore", (Snake.length - 3));
        }
        alert("Ops! Você Perdeu.");
    }
}