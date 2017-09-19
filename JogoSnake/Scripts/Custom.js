var Snake = [];
var direcao = "";
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
    Snake.push({ status: "cabeça", linha: 0, coluna: 0 });

    pintaSnake();
}
function pintaSnake() {
    for (var i = 0; i < Snake.length; i++) {
        switch (direcao) { 
            case ("Right"):
                if (Snake[i].status == "cabeça") {
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha) + "_" + (Snake[i].coluna+1) + "").addClass("colorHead");
                }
                else{
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha) + "_" + Snake[i].coluna + "").addClass("colorSnake");
                }
                Snake[i].coluna = Snake[i].coluna + 1;
                break;
            case ("Left"):
                if (Snake[i].status == "cabeça") {
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha) + "_" + (Snake[i].coluna - 1) + "").addClass("colorHead");
                }
                else {
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha) + "_" + Snake[i].coluna + "").addClass("colorSnake");
                }
                Snake[i].coluna = Snake[i].coluna - 1;
                break;
            case ("Down"):
                if (Snake[i].status == "cabeça") {
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha+1) + "_" + Snake[i].coluna + "").addClass("colorHead");
                }
                else {
                    $("#tabuleiro").children("tr").children("td#" + Snake[i].linha + "_" + Snake[i].coluna + "").addClass("colorSnake");
                }
                Snake[i].linha = Snake[i].linha+1;
                break;
            case ("Up"):
                                    verColisao(Snake[i].linha, Snake[i].coluna);
                if (Snake[i].status == "cabeça") {
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - 1) + "_" + Snake[i].coluna + "").addClass("colorHead");
                }
                else {
                    $("#tabuleiro").children("tr").children("td#" + Snake[i].linha + "_" + Snake[i].coluna + "").addClass("colorSnake");
                }
                Snake[i].linha = Snake[i].linha - 1;
                break;
        }
        
    }
    
    
}
function apagaSnake() {
    for (var i = Snake.length; i >= 0; i--) {
        if (i == 0) {
            switch (direcao) {
                case ("Right"):
                    verColisao(Snake[i].linha, Snake[i].coluna);
                    $("#tabuleiro").children("tr").children("td#" + Snake[i].linha + "_" + (Snake[i].coluna - (Snake.length)) + "").removeClass("colorSnake");
                    $("#tabuleiro").children("tr").children("td#" + Snake[i].linha + "_" + (Snake[i].coluna - (Snake.length)) + "").removeClass("colorHead");

                    for (var i = 1; i <Snake,length-1; i++) {
                        //alert(((Snake[i].linha-1) - i) + "_" + (Snake[i].coluna - i));
                        $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - i) + "_" + ((Snake[i].coluna - i)) + "").removeClass("colorSnake");
                        $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - i) + "_" + ((Snake[i].coluna - i)) + "").removeClass("colorHead");


                        $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha + 1) + "_" + (Snake[i].coluna-Snake.length) + "").removeClass("colorSnake");
                        $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha + 1) + "_" + (Snake[i].coluna -Snake.length) + "").removeClass("colorHead");
                    }
                    break;
                case ("Left"):
                    verColisao(Snake[i].linha, Snake[i].coluna);
                    $("#tabuleiro").children("tr").children("td#" + Snake[i].linha + "_" + (Snake[i].coluna + (Snake.length)) + "").removeClass("colorSnake");
                    $("#tabuleiro").children("tr").children("td#" + Snake[i].linha + "_" + (Snake[i].coluna + (Snake.length)) + "").removeClass("colorHead");

                    //retira classe quando muda pra direita
                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - 1) + "_" + (Snake[i].coluna - 1) + "").removeClass("colorSnake");
                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - 1) + "_" + (Snake[i].coluna - 1) + "").removeClass("colorHead");

                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha + 1) + "_" + (Snake[i].coluna - 1) + "").removeClass("colorSnake");
                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha + 1) + "_" + (Snake[i].coluna - 1) + "").removeClass("colorHead");

                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - 1) + "_" + (Snake[i].coluna+1) + "").removeClass("colorSnake");
                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - 1) + "_" + (Snake[i].coluna +1) + "").removeClass("colorHead");

                    break;
                case ("Down"):
                    verColisao(Snake[i].linha, Snake[i].coluna);
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - Snake.length) + "_" + Snake[i].coluna + "").removeClass("colorSnake");
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - Snake.length) + "_" + Snake[i].coluna + "").removeClass("colorHead");

                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - 1) + "_" + (Snake[i].coluna - 1) + "").removeClass("colorSnake");
                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha - 1) + "_" + (Snake[i].coluna - 1) + "").removeClass("colorHead");
                    break;
                case ("Up"):
                    verColisao(Snake[i].linha, Snake[i].coluna);
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha + Snake.length) + "_" + Snake[i].coluna + "").removeClass("colorSnake");
                    $("#tabuleiro").children("tr").children("td#" + (Snake[i].linha + Snake.length) + "_" + Snake[i].coluna + "").removeClass("colorHead");

                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha+1) + "_" + (Snake[i].coluna-1) + "").removeClass("colorSnake");
                    //$("#tabuleiro").children("tr").children("td#" + (Snake[i].linha + 1) + "_" +(Snake[i].coluna-1) + "").removeClass("colorHead");
                    break;
            }
        }
    }
}
function movimentaSnake() {
    pintaSnake();
    apagaSnake();

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
        Snake.push({ status: "corpo", linha: x, coluna: y });
    }
    else return false;
}