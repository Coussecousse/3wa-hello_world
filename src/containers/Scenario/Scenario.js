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
    const [intervalId, setIntervalId] = useState(null);
    const [activeThoughts, setActiveThoughts] = useState(false);

    function addStep() {
        setTimeout(() => {
            setStep(step + 1);
        }, 250);
        handlePopupAnimation();
    }
    
    function removeStep() {
        setTimeout(() => {
            setStep(step - 1);
        }, 250);
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
        setActiveThoughts(true);
    }

    function handleScenario() {   
        if (scenarioOpen) {
            setScenarioOpen(false);
            setActiveThoughts(true);
        } else {
            setScenarioOpen(true);
            setActiveThoughts(false);
        }
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

    useEffect(() => {
        animThoughts();
    }, [activeThoughts])

    function animThoughts() {    
        clearInterval(intervalId);

        
        const thoughts = document.querySelector(`#thoughts`);
        if (activeThoughts) {
            thoughts.style.display = 'block';
            thoughts.classList.add(style.active);
            startAnimationThoughts();
            setIntervalId(setInterval(() => {
                startAnimationThoughts();
            }, 3500));
        } else {
            thoughts.classList.remove(style.active);
            setTimeout(() => {
                thoughts.style.display = 'none';
            }, 200);

            const bubbles = document.querySelectorAll('.bubble');
            bubbles.forEach(bubble => {
                if (bubble.classList.contains('animate')) {
                    bubble.classList.remove('animate');
                };
            });
        }
    }

    function startAnimationThoughts() {
        animateThoughtsCloud(`.thoughts_firstGroup`, 3000);
        setTimeout(() => {
            animateThoughtsCloud(`.thoughts_secondGroup`, 2000);
        }, 1000);
        setTimeout(() => {
            animateThoughtsCloud(`.thoughts_thirdGroup`, 1000);
        }, 2000);
    }

    function animateThoughtsCloud(group, time) {
        const groupBubble = document.querySelectorAll(group);
        groupBubble.forEach(bubble => {
            bubble.classList.add(`${style.animate}`);
            setTimeout(() => {
               bubble.classList.remove(`${style.animate}`); 
            }, time);
        }) 
    }

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
            <div id="thoughts" className={`${style.thoughts} ${style.active}`}>
                <svg width="83" height="65" viewBox="0 0 83 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={`thoughts_secondGroup ${style.bubble}`} d="M67 51.5H67.1C70.4 51.5 73 53.5 73 56C73 58.6 70.5 60.7 67.1 60.7H67C63.7 60.7 61.1 58.7 61.1 56.2C61.1 53.7 63.7 51.6 67 51.5ZM67.1 58.5C69.2 58.5 70.9 57.4 70.9 56.1C70.9 54.9 69.2 53.8 67.3 53.8H67.2C65.2 53.8 63.5 54.9 63.5 56.2C63.4 57.5 65.1 58.5 67.1 58.5Z" fill="#cd1316"/>
                    <path className={`thoughts_secondGroup ${style.bubble}`} d="M67.1 58.5C69.2 58.5 70.9 57.4 70.9 56.1C70.9 54.9 69.2 53.8 67.3 53.8H67.2C65.2 53.8 63.5 54.9 63.5 56.2C63.4 57.5 65.1 58.5 67.1 58.5Z" fill="black"/>
                    <path className={`thoughts_firstGroup ${style.bubble}`} d="M77.7 57.1C80.3 57.1 82.2 58.6 82.3 60.6C82.3 62.6 80.4 64.2 77.9 64.2H77.8C75.3 64.2 73.4 62.7 73.3 60.7C73.2 58.7 75.2 57.1 77.7 57.1ZM77.7 61.9C79 61.9 80 61.2 80 60.6C80 60 79.1 59.4 77.8 59.4H77.7C76.4 59.4 75.5 60.1 75.5 60.7C75.5 61.3 76.4 61.9 77.7 61.9Z" fill="#cd1316"/>
                    <path className={`thoughts_firstGroup ${style.bubble}`} d="M77.7 61.9C79 61.9 80 61.2 80 60.6C80 60 79.1 59.4 77.8 59.4H77.7C76.4 59.4 75.5 60.1 75.5 60.7C75.5 61.3 76.4 61.9 77.7 61.9Z" fill="black"/>
                    <path className={`thoughts_thirdGroup ${style.bubble}`} d="M0 29.2C0 23.2 4.89999 18.1 11.9 16.6C11.9 16.6 11.9 16.6 11.9 16.5C11.9 9.3 19 3.4 27.7 3.4C30.4 3.4 33.1 4 35.5 5.1C38.5 1.9 43.1 0 48 0C55 0 61.1 3.8 63.1 9.2C63.6 9.2 64 9.1 64.4 9.1C68.6 9.1 72.5 10.4 75.5 12.8C78.6 15.3 80.3 18.6 80.3 22.1C80.3 24 79.7 26 78.7 27.8C81.1 30.1 82.4 33.1 82.4 36.2C82.4 43.4 75.3 49.3 66.6 49.3C65.3 49.3 63.9 49.1 62.5 48.8C59.9 53.3 54.4 56.3 48.2 56.3C44.1 56.3 40.2 55 37.2 52.6C34.4 54.4 31 55.4 27.4 55.4C18.7 55.4 11.6 49.5 11.6 42.4C11.6 42.2 11.6 41.9 11.6 41.7C4.8 40.2 0 35.1 0 29.2ZM13.6 38.9C14 39 14.4 39.2 14.7 39.6C14.9 40 15 40.4 14.9 40.8C14.8 41.3 14.7 41.9 14.7 42.4C14.7 47.9 20.4 52.3 27.4 52.3C30.8 52.3 33.9 51.3 36.4 49.4C37 48.9 37.9 49 38.4 49.5C40.9 51.9 44.4 53.2 48.2 53.2C53.6 53.2 58.5 50.5 60.2 46.4C60.5 45.8 61 45.4 61.6 45.4C61.7 45.4 61.9 45.4 62 45.5C63.6 46 65 46.2 66.5 46.2C73.5 46.2 79.2 41.7 79.2 36.3C79.2 33.7 77.9 31.2 75.6 29.4C74.9 28.9 74.8 27.9 75.3 27.2C76.5 25.6 77.1 23.9 77.1 22.2C77.1 19.6 75.8 17.2 73.5 15.3C71.1 13.4 67.8 12.3 64.4 12.3C63.7 12.3 63 12.4 62.2 12.5C61.4 12.6 60.7 12.1 60.5 11.3C59.4 6.6 54.1 3.2 48 3.2C43.5 3.2 39.4 5 37.1 8.1C36.6 8.7 35.8 8.9 35.1 8.5C32.9 7.2 30.3 6.6 27.7 6.6C20.7 6.6 15 11.1 15 16.5C15 16.7 15 16.9 15.1 17.2C15.1 17.3 15.1 17.5 15.2 17.6C15.3 18 15.2 18.4 14.9 18.8C14.6 19.1 14.3 19.4 13.9 19.4C7.69999 20.2 3.2 24.3 3.2 29.1C3.1 34 7.5 38.1 13.6 38.9Z" fill="#cd1316"/>
                    <path className={`thoughts_thirdGroup ${style.bubble}`} d="M13.6 38.9C14 39 14.4 39.2 14.7 39.6C14.9 40 15 40.4 14.9 40.8C14.8 41.3 14.7 41.9 14.7 42.4C14.7 47.9 20.4 52.3 27.4 52.3C30.8 52.3 33.9 51.3 36.4 49.4C37 48.9 37.9 49 38.4 49.5C40.9 51.9 44.4 53.2 48.2 53.2C53.6 53.2 58.5 50.5 60.2 46.4C60.5 45.8 61 45.4 61.6 45.4C61.7 45.4 61.9 45.4 62 45.5C63.6 46 65 46.2 66.5 46.2C73.5 46.2 79.2 41.7 79.2 36.3C79.2 33.7 77.9 31.2 75.6 29.4C74.9 28.9 74.8 27.9 75.3 27.2C76.5 25.6 77.1 23.9 77.1 22.2C77.1 19.6 75.8 17.2 73.5 15.3C71.1 13.4 67.8 12.3 64.4 12.3C63.7 12.3 63 12.4 62.2 12.5C61.4 12.6 60.7 12.1 60.5 11.3C59.4 6.6 54.1 3.2 48 3.2C43.5 3.2 39.4 5 37.1 8.1C36.6 8.7 35.8 8.9 35.1 8.5C32.9 7.2 30.3 6.6 27.7 6.6C20.7 6.6 15 11.1 15 16.5C15 16.7 15 16.9 15.1 17.2C15.1 17.3 15.1 17.5 15.2 17.6C15.3 18 15.2 18.4 14.9 18.8C14.6 19.1 14.3 19.4 13.9 19.4C7.69999 20.2 3.2 24.3 3.2 29.1C3.1 34 7.5 38.1 13.6 38.9Z" fill="black"/>
                </svg>
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