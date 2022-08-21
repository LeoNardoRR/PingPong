//Variavéis da bolinha
let xball = 300;
let yball = 200;
let diameter = 20;
let radius = diameter / 2;

let colidiu = false;

//Placar do jogo

let meusPontos = 0;
let PontosOponente = 0;

//Variavéis da velocidade da bolinha
let VelocidadexBolinha = 5;
let VelocidadeyBolinha = 5;

//Variavéis da raquete
let xracket = 5;
let yracket = 150;
let racketLength = 10;
let racketHeight = 100;
let border = 3;

//Variavéis da raquete do oponente
let xracket2 = 585;
let yracket2 = 150;

//Sons do jogo

let raquetada;
let trilha;
let ponto;

//Variavéis do meio

let xmed = 300;
let ymed = 0;
let meioLenght = 1;
let meioHeight = 600;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  mostrarMeio();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xracket, yracket);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xracket, yracket);
  mostraRaquete(xracket2, yracket2);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xracket2, yracket2);
  incluiPlacar();
  marcaPonto();
}

function mostrarMeio(){
  noStroke();
  stroke('rgb(255,255,255)');
  strokeWeight(1);
  rect(xmed, ymed, meioLenght, meioHeight);
}

function mostraBolinha(){
  noStroke();
  fill('yellow');
  circle(xball, yball, diameter);
}

function movimentaBolinha(){
  xball += VelocidadexBolinha;
  yball += VelocidadeyBolinha;
}

function verificaColisaoBorda(){

  if (xball + radius > width || 
      xball - radius <0) {
    VelocidadexBolinha *= -1;
  }

  if (yball + radius > height || 
      yball - radius <0) {
    VelocidadeyBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  fill(0);
  stroke('red')
  strokeWeight(4);
  rect(x, y, racketLength, racketHeight, border);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yracket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yracket += 10;
  }
}

function verificaColisaoRaquete(){
  if (xball - radius < xracket + racketLength && yball - radius < yracket + racketHeight && yball + radius > yracket)
  {
    VelocidadexBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, racketLength, racketHeight,xball, yball, radius);
  if(colidiu){
    VelocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yracket2 -= 10;
  }
  if (keyIsDown(83)){
    yracket2 += 10;
  }
}

function incluiPlacar(){
  
  textSize(26);
  textAlign(CENTER);
  fill('red')
  stroke('red')
  strokeWeight(4);
  rect(150, 10, 40, 20, border)
  fill(255);
  text(meusPontos, 170, 29);
  fill('red');
  rect(450, 10, 40, 20, border);
  fill(255);
  text(PontosOponente, 470, 29)
}

function marcaPonto(){
  if (xball > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xball <10){
    PontosOponente += 1;
    ponto.play();
  }
}

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

