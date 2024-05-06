import CodeMirror from "@uiw/react-codemirror";
import style from './Scenario.module.css';
import { useEffect, useState } from 'react';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

import ScenarioButtons from '../ScenarioButtons/ScenarioButtons'
import RestartButton from '../RestartButton/RestartButton';

export default function Scenario() {

    const [step, setStep] = useState(0);
    const [scenarioOpen, setScenarioOpen] = useState(true);

    function addStep() {
        setStep(step + 1);
        handlePopupAnimation();
    }
    
    function removeStep() {
        setStep(step - 1);
        handlePopupAnimation();
    }

    function handlePopupAnimation() {
        setScenarioOpen(false);
        setTimeout(() => {
            setScenarioOpen(true);
        }, 250);
    }
    
    function restart() {
        window.location.reload(false);
    }

    const scenario = 
        [
            {
                description : 'Apprenons à donner vie ensemble à un site web !',
            }, 
            {
                description : "D'abord, commençons par créer un élément HTML. Ici, nous allons créer un titre avec la balise <h1> qui sera contenu dans une section <section>. En HTML, toutes les balises ont une signification et doivent être utilisées correctement !",
                code : `<section>
    <h1>Hello World</h1>
</section>`, type: 'HTML'
            },
            {
                description : "Parfait ! Par contre ça manque de style... Pour cela, nous allons utiliser du CSS et selectionner l'élément que l'on cherche à modifier !",
                code: `section {
/*  Ici on modifie la taille de l'élément pour qu'il prenne tout l'écran */
    width: 100vw;
    height: 100vh;
    /*  On change la couleur du font  */  
    background-color: #000;
    /*  On centre l'élement qu'il contient, c'est à dire le titre  */
    display: flex;
    justify-content: center;
    align-items: center;
}
h1 {
    /*  Pour changer le style de police  */
    font-family: Arial;
    /*  Pour changer la couleur  */
    color: #FFF;
}`, type: 'CSS'
            },
            {
                description: "Et si on animait un peut  tout  ça ? Faisons un peu de Javascript !",
            },
            {
                description : "Nous allons rajouter le nom de l'école dans notre HTML, comme ceci :",
                code : `<section>
    <h1>Hello World</h1>
    <h2><span>3</span><span>W</span><span>A</span></h2>
</section>`, type: 'HTML'
            },
            {
                description : "Les balises span sont des balises qui permettent de modifier le style d'une partie du texte ! Nous allons donc commencer par préparer le CSS afin d'animer les lettres :",
                code : `section {
    /*  Ici on modifie la taille de l'élément pour qu'il prenne tout l'écran */
    width: 100vw;
    height: 100vh;
    /*  On change la couleur du font  */  
    background-color: #000;
    /*  On centre l'élement qu'il contient, c'est à dire le titre  */
    display: flex;
    justify-content: center;
    align-items: center;
}
h1, h2 {
    /*  Pour changer le style de police  */
    font-family: Arial;
    /*  Pour changer la couleur  */
    color: #FFF;
}
h2 span {
    /*  Pour modifier le temps d'animation  */
    transition : .5s;
    display: inline-block;
}
span.animate {
    color: #CD1316;
    transform: translateY(-5px);
}
`, type: 'CSS'
            },
            {
                description : "Maintenant, nous allons coder du Javascript permetttant d'ajouter la classe animate à chaque lettre de notre titre ! Vous pouvez écrire :",
                code: `// On récupère toutes les lettres
const letters = document.querySelectorAll('h2 span');

    // On va créer une fonction pour pouvoir la réutiliser
function addAnimateToLetter() {

    // Ceci est une boucle sur toutes les lettres
    letters.forEach((letter, index) => {
    
        // setTimeout agit comme un timer
        setTimeout(() => {
        // On ajoute le class pour appliquer le style CSS
            letter.classList.add('animate');
        }, 500 * index);

        setTimeout(() => {
        // On supprime le class pour retirer le style CSS
            letter.classList.remove('animate');
        }, 500 * index + 250);
    });
}

// setInterval permet de rappeler une fonction au bout de X temps
setInterval(addAnimateToLetter, 1500);
                `,
                type: 'Javascript'
            },
            {
                description : "Et voilà ! Vous avez codé votre premier élément ! Vous pouvez maintenant recommencer si vous voulez !",
            }
        ]

    function choseExtension(type) {
        switch(type) {
            case 'HTML':
                return [html()]
            case 'CSS':
                return [css()]
            case 'Javascript':
                return [javascript()]
            default:
                return []
        }
    }

    function handleCloseScenario(e) {
        const closest = e.target.closest('.button');
        if (closest && closest.classList.contains("button")) return;
        setScenarioOpen(false);
    }

    function handleScenario() {   
        setScenarioOpen(!scenarioOpen);
    } 

    function animePopUp(stateOfTheWindow) {
        const text = document.getElementById('text-scenario');
        const pingouinRightHand = document.querySelector(`.${style.rightHand}`);

        if (stateOfTheWindow) {
            // Remove popOut class if exist and add popUp class
            text.classList.contains('popOut') ? 
                text.classList.replace('popOut', 'popUp')
                : text.classList.add('popUp');

            setTimeout(() => {
                text.style.display = 'flex';

                // Anime the pinguin hand
                if (!pingouinRightHand.classList.contains(style.active)) {
                    pingouinRightHand.classList.add(style.active);
                }
            }, 250);        
        } else {
            // Remove popUp class if exist and add popOut class
            text.classList.contains('popUp') ?
            text.classList.replace('popUp', 'popOut')
            : text.classList.add('popOut');

            // Anime the pinguin hand
            if (pingouinRightHand.classList.contains(style.active)) {
                pingouinRightHand.classList.remove(style.active);
            }
            setTimeout(() => {
                text.style.display = 'none';
            }, 250);
        }
    }

    useEffect(() => {
        animePopUp(scenarioOpen);
    }, [scenarioOpen])

    return (
        <section id="scenario">
            <div className={style.scenarioText} id="text-scenario" onClick={handleCloseScenario}>
                <p className={style.text}>{scenario[step]['description']}</p>
                {scenario[step]['code'] ?
                    <div className={`codeMirror-container ${style.codeMirror}`}>
                        <div className={`typeCode ${scenario[step]['type']}`}>{scenario[step]['type']}</div>
                        <CodeMirror
                        value={scenario[step]['code']}
                        width="100%"
                        height="200px"
                        theme={vscodeDark}
                        editable={false}
                        extensions={choseExtension(scenario[step]['type'])}/>
                    </div>
                    : null
                }
                <ScenarioButtons 
                    addStep={addStep} 
                    removeStep={removeStep} 
                    step={step}
                    max={scenario.length}
                    ></ScenarioButtons>
                { step === scenario.length - 1 ?
                    <RestartButton restart={restart} ></RestartButton>
                    : null 
                }
            </div>
            <div className={style.penguin} onClick={handleScenario}>
                <div className={style.penguinBottom}>
                    <div className={`${style.rightHand} ${style.active}`}></div>
                    <div className={style.leftHand}></div>
                    <div className={style.rightFeet}></div>
                    <div className={style.leftFeet}></div>
                </div>
                <div className={style.penguinTop}>
                    <div className={style.rightCheek}></div>
                    <div className={style.leftCheek}></div>
                    <div className={style.belly}></div>
                    <div className={style.rightEye}>
                    <div className={style.sparkle}></div>
                    </div>
                    <div className={style.leftEye}>
                    <div className={style.sparkle}></div>
                    </div>
                    <div className={style.blushRight}></div>
                    <div className={style.blushLeft}></div>
                    <div className={style.beakTop}></div>
                    <div className={style.beakBottom}></div>
                </div>
            </div>
        </section>
    )
}