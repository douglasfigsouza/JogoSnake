var Snake = [];
var colunaAux;
var direcao = "Down";
$(document).ready(function () {
    $(document).keydown(function (t) {
        var key = t.which;
        switch (key) {
            case 38:
                direcao = "Up";
                break;
            case 40:
                direcao = "Down";
                break;
            case 37:
                direcao = "Left";
                break;
            case 39:
                direcao = "Right";
                break;
        }
    });
    var tabuleiro = "";

    tabuleiro += "<table class='tableCustom'><tbody id='tabuleiro'>";

    for (var i = 0; i < 9; i++) {
        tabuleiro += "<tr>"
        for (var j = 0; j < 10; j++) {
            tabuleiro += "<td  id=" + i + "_" + j + " >"+i+"_"+j+"</td>";
        }
        tabuleiro += "</tr>"
    }
    tabuleiro += "</tbody></table>";
    $("#containerTabuleiro").append(tabuleiro);

    initSnake();
    geraComida();
    setInterval(function () {
        movimentaSnake()
    }, 600);
});
function initSnake() {
    Snake.push({ status: "corpo", linha: 0, coluna: 0 });
    Snake.push({ status: "cabeça", linha: 1, coluna: 0 });

    pintaSnake();
}
function move() {
    for(var i = 0; i < Snake.length -1; i++) {
        Snake[i].coluna = Snake[i +1].coluna;
        Snake[i].linha = Snake[i + 1].linha;
        Snake[i].status = "corpo";
    }
    Snake[Snake.length-1].status = "cabeça";
}
function logisticaSnake() {
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
                if (Snake[Snake.length - 1].linha == 9) {
                    Snake[Snake.length - 1].linha = 0;
                }
                else {
                    Snake[Snake.length - 1].linha = Snake[Snake.length - 1].linha + 1;
                }
                break;
            case ("Up"):
                if (Snake[Snake.length - 1].linha == 0) {
                    Snake[Snake.length - 1].linha = 9;
                }
                else {
                    Snake[Snake.length - 1].linha = Snake[Snake.length - 1].linha - 1;
                }
                break;
    }
    verColisao(Snake[Snake.length - 1].linha,Snake[Snake.length - 1].coluna);
}
function pintaSnake() {

    for (var i = 0; i <= Snake.length - 1; i++)
    {
        if (Snake[i].status == "corpo") {
            $("td#" + (Snake[i].linha) + "_" + Snake[i].coluna + "").addClass("colorHead");
        }

        if (Snake[i].status == "cabeça") {
            $("td#" + (Snake[i].linha) + "_" + (Snake[i].coluna) + "").addClass("colorSnake");
        }
    }
}
function apagaSnake() {
    $("#tabuleiro").children("tr").children("td#" + (Snake[0].linha) + "_" + Snake[0].coluna + "").removeClass("colorHead");
    $("#tabuleiro").children("tr").children("td#" + (Snake[0].linha) + "_" + Snake[0].coluna+ "").removeClass("colorSnake");
}
function movimentaSnake() {
    apagaSnake();
    logisticaSnake();
    pintaSnake();
}
function geraComida() {
    //cria posições radomicas para geração da comida
    mx = parseInt(Math.random() * 10);
    my = parseInt(Math.random() * 10);

    //só permite numeros randomicos dentro do tabuleiro 
    if (mx > 8 || my > 10 || mx > 8 && my > 10) geraComida();
    //impede que a comida seja criada em cima da snake
    if ($("#tabuleiro").children("tr").children("td#" + mx + "_" + my + "").attr("class") == "colorSnake") geraComida();
    $("#tabuleiro").children("tr").children("td#" + mx + "_" + my + "").addClass("colorComida");

}
function verColisao(x, y) {
    if (mx == x && my == y) {
        $("#tabuleiro").children("tr").children("td#" + mx + "_" + my + "").removeClass("colorComida");
        geraComida();
        //adicionando na ultima posiçaõp do vetor
        debugger;
        Snake.push({ status: "corpo", linha: x, coluna: y });
    }
    else return false;
}