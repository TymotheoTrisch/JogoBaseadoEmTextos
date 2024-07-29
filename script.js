const falas = document.querySelectorAll(".falas-robo p");

const sectionInicioGame = document.querySelector(".section-inicio");
const sectionCenario = document.querySelector(".section-cenario");
const sectionDecisoes = document.querySelector('.section-decisoes');
const sectionValores = document.querySelector('.section-valores');

const pixels = document.querySelectorAll('.pixel');

const pixelTesouro = document.getElementById('pixel-tesouro');
const pixelPovo = document.getElementById('pixel-povo');
const pixelClero = document.getElementById('pixel-clero');
const pixelExercito = document.getElementById('pixel-exercito');


const valores = document.querySelectorAll('.section-valores .img-valor');

const tesouro = document.getElementById('valor-tesouro');
const povo = document.getElementById('valor-povo');
const clero = document.getElementById('valor-clero');
const exercito = document.getElementById('valor-exercito');

let valorTesouro = 8;
let valorPovo = 8;
let valorClero = 8;
let valorExercito = 8;

const carta = document.getElementById('carta');
const boxImg = carta.querySelector('.box-img');
const nomePerson = carta.querySelector('.nome-person');
const imgPersonagem = document.getElementById('img-personagem');
const textoPergunta = document.getElementById('pergunta');

const btnSim = document.getElementById('btn-sim');
const btnNao = document.getElementById('btn-nao');

const btnOqueEsq = document.getElementById('btn-oque-esq');
const btnOqueDir = document.getElementById('btn-oque-dir');

const btnJogarNovamenteS = document.getElementById('btn-jogar-novamenteS');
const btnJogarNovamenteN = document.getElementById('btn-jogar-novamenteN');

const btnContinuar = document.getElementById('btn-continuar');


let perguntaAtual;
let rodadaAtual = 0;
let rodPerguntaMist = 1;
let rodPerguntaBonus = 1;

let ganhou = false;
// Função para rodar o game
function inicioGame() {
    showNextFala();
    setTimeout(() => {
    showNextCenario();
    }, "24000");

}

// Função para ir para a próxima fala do robo Byte
function showNextFala() {
    falas[0].classList.remove('hidden');
    setTimeout(() => {
        falas[0].classList.add('closeFala');
        falas[1].classList.remove('hidden');
    }, "7000");
    setTimeout(() => {
        falas[1].classList.add('closeFala');
        falas[2].classList.remove('hidden');
    }, "16000");
}

// Função para ir para a explicação  docenário do jogo
function showNextCenario() {
    console.log(valorTesouro + " / " + valorPovo + " / " +
        valorClero + " / " + valorExercito);

    sectionInicioGame.classList.add('closeInicio');
    setTimeout(() => {
        sectionCenario.classList.remove("hidden");
        sectionValores.classList.remove("hidden");
    }, "1190");

    const btnIniciar = document.getElementById('btn-iniciar');

    btnIniciar.addEventListener('click', () => {

        sectionCenario.classList.add('hidden');
        sectionValores.classList.add('hidden');

        const mudarCenario = document.getElementById('mudar-cenario')
        mudarCenario.classList.add('comecar-decisoes')

        setTimeout(() => {
            sectionDecisoes.classList.remove('hidden');
            sectionValores.classList.remove('hidden');


            pixels.forEach(pixel => {
                pixel.classList.add('sumir-pixel');
            });
            valores.forEach(valor => {
                valor.classList.add('descer-valores');
            });

            tesouro.src = `./img/ValorTesouro/sprite_0${valorTesouro}.png`;
            povo.src = `./img/valorPovo/sprite_0${valorPovo}.png`;
            clero.src = `./img/valorClero/sprite_0${valorClero}.png`;
            exercito.src = `./img/valorExercito/sprite_0${valorExercito}.png`;
            mudarPergunta();
            mudarCenario.classList.remove('comecar-decisoes')

        }, "2500")
    });
}

// Função para mostrar a pergunta
function mostrarPergunta() {
    if (perguntaAtual.impacto_sim.hasOwnProperty("final")) {
        boxImg.classList.add('pergunta-misteriosa')
    } else {
        boxImg.classList.remove('pergunta-misteriosa')
    }
    if (perguntaAtual.hasOwnProperty("bonus")) {
        boxImg.classList.add('pergunta-bonus')
        nomePerson.innerHTML = perguntaAtual.bonus
    } else {
        boxImg.classList.remove('pergunta-bonus')
        nomePerson.innerHTML = perguntaAtual.nome
    }

    textoPergunta.innerHTML = ""

    imgPersonagem.src = `./img/${perguntaAtual.personagem}.gif`;
    btnSim.disabled = true
    btnNao.disabled = true

    new TypeIt("#pergunta", {
        speed: 18,
        waitUntilVisible: true,
    })
        .type(perguntaAtual.pergunta)
        .go();

    setTimeout(() => {
        btnSim.disabled = false
        btnNao.disabled = false

    }, "5000")

    btnSim.addEventListener('mouseover', () => {
        configButtons(perguntaAtual.impacto_sim);
    });
    btnSim.addEventListener('mouseleave', () => {
        pixels.forEach(pixel => {
            pixel.classList.remove('aparecer-pixel');
            pixel.classList.add('sumir-pixel');
        });
        valores.forEach(valor => {
            valor.classList.remove('subir-valores');
            valor.classList.add('descer-valores');
        });
    });



    btnNao.addEventListener('mouseover', () => {
        configButtons(perguntaAtual.impacto_nao);
    });
    btnNao.addEventListener('mouseleave', () => {
        pixels.forEach(pixel => {
            pixel.classList.remove('aparecer-pixel');
            pixel.classList.add('sumir-pixel');
        });
        valores.forEach(valor => {
            valor.classList.remove('subir-valores');
            valor.classList.add('descer-valores');
        });
    });
}

btnSim.addEventListener('click', () => {
    impactoDesicao(true);
});
btnNao.addEventListener('click', () => {
    impactoDesicao(false);
});

btnOqueEsq.addEventListener('click', () => {
    final(ganhou);
});
btnOqueDir.addEventListener('click', () => {
    final(ganhou);
});

btnJogarNovamenteS.addEventListener('click', () => {
    reiniciarJogo();
});
btnJogarNovamenteN.addEventListener('click', () => {
    boxImg.classList.remove('pergunta-bonus');
    boxImg.classList.remove('pergunta-misteriosa');
    textoPergunta.innerHTML = "Que pena. O Byte fica feliz que você tenha jogado.";

    imgPersonagem.src = `./img/Robo_Tchau.gif`;

    nomePerson.innerHTML = "Byte dando Tchau";

    btnJogarNovamenteS.classList.add('hidden');
    btnJogarNovamenteN.classList.add('hidden');


});

btnContinuar.addEventListener('click', () => {
    final();
})

// Função para configurar os impactos que o botão infuienciará
function configButtons(impacto) {
    if (impacto.tesouro != 0) {
        pixelTesouro.style.width = '12px';

        if (impacto.tesouro >= 3 || impacto.tesouro <= -3) {
            pixelTesouro.style.width = '24px';
        } else if (impacto.tesouro == 2 || impacto.tesouro == -2) {
            pixelTesouro.style.width = '19px';
        }

        pixelTesouro.classList.remove('sumir-pixel');
        pixelTesouro.classList.add('aparecer-pixel');

        tesouro.classList.remove('descer-valores');
        tesouro.classList.add('subir-valores');
    }
    if (impacto.amor_do_povo != 0) {
        pixelPovo.style.width = '12px';

        if (impacto.amor_do_povo >= 3 || impacto.amor_do_povo <= -3) {
            pixelPovo.style.width = '24px';
        } else if (impacto.amor_do_povo == 2 || impacto.amor_do_povo == -2) {
            pixelPovo.style.width = '19px';
        }

        pixelPovo.classList.remove('sumir-pixel');
        pixelPovo.classList.add('aparecer-pixel');

        povo.classList.remove('descer-valores');
        povo.classList.add('subir-valores');
    }
    if (impacto.poder_do_clero != 0) {
        pixelClero.style.width = '12px';

        if (impacto.poder_do_clero >= 3 || impacto.poder_do_clero <= -3) {
            pixelClero.style.width = '24px';
        } else if (impacto.poder_do_clero == 2 || impacto.poder_do_clero == -2) {
            pixelClero.style.width = '19px';
        }

        pixelClero.classList.remove('sumir-pixel');
        pixelClero.classList.add('aparecer-pixel');

        clero.classList.remove('descer-valores');
        clero.classList.add('subir-valores');
    }
    if (impacto.poder_do_exercito != 0) {
        pixelExercito.style.width = '12px';

        if (impacto.poder_do_exercito >= 3 || impacto.poder_do_exercito <= -3) {
            pixelExercito.style.width = '24px';
        } else if (impacto.poder_do_exercito == 2 || impacto.poder_do_exercito == -2) {
            pixelExercito.style.width = '19px';
        }

        pixelExercito.classList.remove('sumir-pixel');
        pixelExercito.classList.add('aparecer-pixel');

        exercito.classList.remove('descer-valores');
        exercito.classList.add('subir-valores');
    }
}

// Função para mudar a imagem dos quatro valores do jogo
function impactoDesicao(Button) {
    let impacto;
    let terminou = false;
    if (Button === true) {
        impacto = perguntaAtual.impacto_sim;
    } else if (Button === false) {
        impacto = perguntaAtual.impacto_nao;
    }


    if (valorTesouro - impacto.tesouro <= 0) {
        valorTesouro = 0;
        terminou = true;
    } else if (valorTesouro - impacto.tesouro >= 15) {
        valorTesouro = 15;
        terminou = true;
    } else {
        valorTesouro -= impacto.tesouro;
    }

    if (valorPovo - impacto.amor_do_povo <= 0) {
        valorPovo = 0;
        terminou = true;
    } else if (valorPovo - impacto.amor_do_povo >= 15) {
        valorPovo = 15;
        terminou = true;
    } else {
        valorPovo -= impacto.amor_do_povo;
    }

    if (valorClero - impacto.poder_do_clero <= 0) {
        valorClero = 0;
        terminou = true;
    } else if (valorClero - impacto.poder_do_clero >= 15) {
        valorClero = 15;
        terminou = true;
    } else {
        valorClero -= impacto.poder_do_clero;
    }

    if (valorExercito - impacto.poder_do_exercito <= 0) {
        valorExercito = 0;
        terminou = true;
    } else if (valorExercito - impacto.poder_do_exercito >= 15) {
        valorExercito = 15;
        terminou = true;
    } else {
        valorExercito -= impacto.poder_do_exercito;

    }

    tesouro.src = `./img/ValorTesouro/sprite_0${valorTesouro}.png`;
    povo.src = `./img/valorPovo/sprite_0${valorPovo}.png`;
    clero.src = `./img/valorClero/sprite_0${valorClero}.png`;
    exercito.src = `./img/valorExercito/sprite_0${valorExercito}.png`;

    if (terminou) {
        return terminarJogo();
    }

    mudarPergunta();
}


// Função para mudar a pergunta
async function mudarPergunta() {

    if (rodadaAtual === 25) {
        ganhou = true;
        return terminarJogo();
    }

    rodadaAtual++;

    const min = Math.ceil(1);
    const max = Math.floor(64);
    const idPergunta = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(idPergunta);

    if (rodPerguntaMist === rodadaAtual) {
        const min = Math.ceil(rodadaAtual + 6);
        const max = Math.floor(rodadaAtual + 9);
        rodPerguntaMist = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log(rodPerguntaMist);
        if (rodadaAtual != 1) {
            return perguntaMisteriosa();
        }
    }
    if (rodPerguntaBonus === rodadaAtual) {
        const min = Math.ceil(rodadaAtual + 2);
        const max = Math.floor(rodadaAtual + 7);
        do {
            rodPerguntaBonus = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (rodPerguntaBonus == rodPerguntaMist)

        console.log(rodPerguntaBonus);
        if (rodadaAtual != 1) {
            return perguntaBonus();
        }
    }


    await fetch('perguntas.json')
        .then(res => {
            res.json().then(dados => {
                dados.perguntas.forEach(pergunta => {
                    if (pergunta.id == idPergunta) {
                        console.log("oi");
                        perguntaAtual = pergunta;
                        mostrarPergunta();
                    }
                });
            });
        });
}


async function perguntaMisteriosa() {

    const min = Math.ceil(1);
    const max = Math.floor(10);
    const idPerguntaMis = Math.floor(Math.random() * (max - min + 1)) + min;

    await fetch('perguntas.json')
        .then(res => {
            res.json().then(dados => {
                dados.perguntas_misteriosas.forEach(pergunta => {
                    if (pergunta.id == idPerguntaMis) {
                        perguntaAtual = pergunta;
                        mostrarPergunta();
                    }
                })
            })
        })
}

async function perguntaBonus() {

    const min = Math.ceil(1);
    const max = Math.floor(5);
    const idPerguntaBonus = Math.floor(Math.random() * (max - min + 1)) + min;

    await fetch('perguntas.json')
        .then(res => {
            res.json().then(dados => {
                dados.perguntas_bonus.forEach(pergunta => {
                    if (pergunta.id == idPerguntaBonus) {
                        perguntaAtual = pergunta;
                        mostrarPergunta();
                    }
                })
            })
        })
}

// Função para terminar o jogo e mostrar a frase final
function terminarJogo() {
    nomePerson.innerHTML = "";
    textoPergunta.innerHTML = "";

    btnSim.classList.add('hidden');
    btnNao.classList.add('hidden');

    if (ganhou) {
        boxImg.classList.add('pergunta-bonus');
        textoPergunta.innerHTML = "";

        imgPersonagem.src = `./img/Vitoria.png`;

        new TypeIt(textoPergunta, {
            speed: 30,
            waitUntilVisible: true,
        })
            .type("Parabéns! Você governou sabiamente seu reino por 1 ano, mantendo o equilíbrio no reino. Seu reinado será lembrado como um dos mais prósperos e justos da história.")
            .go();

        btnContinuar.classList.remove('hidden');
        btnContinuar.disabled = true;

        setTimeout(() => {
            btnContinuar.disabled = false;
        }, "8000")


    } else {
        imgPersonagem.src = `./img/Derrota.png`;

        btnOqueEsq.classList.remove('hidden');
        btnOqueDir.classList.remove('hidden');

        btnOqueDir.disabled = true;
        btnOqueEsq.disabled = true;

        setTimeout(() => {
            btnOqueDir.disabled = false;
            btnOqueEsq.disabled = false;
        }, "7000")

        const frasesDerrota = {
            tesouroMin: "Você se deixou levar pela ganância e acabou arruinando seu reino. Por isso, foi morto pelos nobres e teve um fim trágico e deplorável.",
            tesouroMax: "Seu tesouro transbordou, mas a riqueza trouxe corrupção e decadência. O povo se rebelou, e seu reinado terminou em caos.",
            povoMin: "O descontentamento do povo atingiu um ponto crítico. Eles se revoltaram, e você foi deposto e executado publicamente.",
            povoMax: "Você ganhou o amor incondicional do povo, mas ignorou as necessidades do reino. O clero e o exército conspiraram contra você, resultando em sua queda.",
            cleroMin: "Você desrespeitou o clero e perdeu sua bênção. Sem sua orientação, o reino caiu no caos, e você foi exilado e esquecido.",
            cleroMax: "O clero assumiu controle absoluto. Sua autoridade foi usurpada, e você foi relegado a um papel simbólico antes de ser completamente eliminado.",
            exercitoMin: "Seu exército foi negligenciado e enfraquecido. Invasores aproveitaram a fraqueza, e você foi capturado e morto.",
            exercitoMax: "O poder militar tornou-se excessivo e opressivo. Um golpe de estado foi inevitável, e você foi traído e executado pelos seus próprios comandantes."
        };


        if (valorTesouro === 15) {
            console.log(valorTesouro);
            new TypeIt(textoPergunta, {
                speed: 30,
                waitUntilVisible: true,
            })
                .type(frasesDerrota.tesouroMin)
                .go();

        } else if (valorTesouro === 0) {
            new TypeIt(textoPergunta, {
                speed: 50,
                waitUntilVisible: true,
            })
                .type(frasesDerrota.tesouroMax)
                .go();

        } else if (valorPovo === 15) {
            console.log("oi");

            new TypeIt(textoPergunta, {
                speed: 50,
                waitUntilVisible: true,
            })
                .type(frasesDerrota.povoMin)
                .go();

        } else if (valorPovo === 0) {
            new TypeIt(textoPergunta, {
                speed: 50,
                waitUntilVisible: true,
            })
                .type(frasesDerrota.povoMax)
                .go();

        } else if (valorClero === 15) {
            new TypeIt(textoPergunta, {
                speed: 50,
                waitUntilVisible: true,
            })
                .type(frasesDerrota.cleroMin)
                .go();

        } else if (valorClero === 0) {
            new TypeIt(textoPergunta, {
                speed: 50,
                waitUntilVisible: true,
            })
                .type(frasesDerrota.cleroMax)
                .go();

        } else if (valorExercito === 15) {
            new TypeIt(textoPergunta, {
                speed: 50,
                waitUntilVisible: true,
            })
                .type(frasesDerrota.exercitoMin)
                .go();
        } else if (valorExercito === 0) {
            new TypeIt(textoPergunta, {
                speed: 50,
                waitUntilVisible: true,
            })
                .type(frasesDerrota.exercitoMax)
                .go();
        }

    }


}

function final() {
    console.log(ganhou);

    if (!ganhou) {
        boxImg.classList.add('pergunta-misteriosa')

        textoPergunta.innerHTML = "DERROTA. O Byte está muito triste por isso... Parece que o Byte quer jogar mais, quer continuar jogando?"

        imgPersonagem.src = `./img/Robo_Chorando.gif`;

        nomePerson.innerHTML = "Byte Chorando"

        btnOqueEsq.classList.add('hidden')
        btnOqueDir.classList.add('hidden')

        btnJogarNovamenteS.classList.remove('hidden')
        btnJogarNovamenteN.classList.remove('hidden')
    } else {
        boxImg.classList.add('pergunta-bonus')

        textoPergunta.innerHTML = "VITÓRIA. O Byte está muito feliz por isso!!! Parece que o Byte quer jogar mais, quer continuar jogando?"

        imgPersonagem.src = `./img/Robo_Comemorando.gif`;

        nomePerson.innerHTML = "Byte Comemorando"

        btnContinuar.classList.add('hidden');


        btnJogarNovamenteS.classList.remove('hidden')
        btnJogarNovamenteN.classList.remove('hidden')
    }

}

function reiniciarJogo() {
    sectionDecisoes.classList.add('hidden')
    sectionValores.classList.add('hidden')

    btnJogarNovamenteN.classList.add('hidden')
    btnJogarNovamenteS.classList.add('hidden')

    btnSim.classList.remove('hidden')
    btnNao.classList.remove('hidden')

    pixels.forEach(pixel => {
        pixel.classList.remove('sumir-pixel');
        pixel.style.width = '19px'
    });
    valores.forEach(valor => {
        valor.classList.remove('descer-valores');
    });
    
    console.log(textoPergunta);
    
    textoPergunta.innerHTML = "";

    rodadaAtual = 0;
    rodPerguntaMist = 1;
    rodPerguntaBonus = 1;

    valorTesouro = 8;
    valorPovo = 8;
    valorClero = 8;
    valorExercito = 8;

    tesouro.src = `./img/ValorTesouro/sprite_00.png`;
    povo.src = `./img/valorPovo/sprite_00.png`;
    clero.src = `./img/valorClero/sprite_00.png`;
    exercito.src = `./img/valorExercito/sprite_00.png`;
    showNextCenario();
}


// Utilização do framework TypeIt nas falas do robo
new TypeIt("#FalaOla", {
    speed: 50,
    waitUntilVisible: true,
})
    .type("Olá, meu nome é Byte, e estou aqui para lhe auxiliar nesse jogo de história baseado em textos.")
    .pause(1000)
    .go();

new TypeIt("#FalaHistoria", {
    speed: 50,
    waitUntilVisible: true,
})
    .type("Nessa história, você terá que tomar decisões conforme os eventos se desenrolam. Suas escolhas determinarão o rumo da narrativa.")
    .go();

new TypeIt("#FalaMotivacional", {
    speed: 50,
    waitUntilVisible: true,
})
    .type("Prepare-se para embarcar em uma jornada cheia de mistérios, desafios e aventuras.")
    .go();


// Onde chama a função do início do game
inicioGame();