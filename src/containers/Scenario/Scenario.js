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
                <svg width="42" height="50" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={`thoughts_secondGroup ${style.bubble}`} d="M23.6903 36.0049C26.9556 36.1188 30.2329 38.2038 29.987 41.3859C29.7556 44.3794 26.7634 45.9353 23.6903 45.9982C20.4019 46.0655 17 44.2139 17 41.0016C17 37.7893 20.4033 35.8903 23.6903 36.0049ZM23.6903 44.5C26.8307 44.5 28.5 43.3846 28.5 41.3859C28.5 39.541 27.3414 37.5 24.5 37.5H23C19.9258 37.5249 18.8406 39.0968 19 41.5C19.1638 43.9694 20.6993 44.5 23.6903 44.5Z" fill="#CD1316"/>
                    <path className={`thoughts_secondGroup ${style.bubble}`} d="M23.6903 44.5C26.8307 44.5 28.5 43.3846 28.5 41.3859C28.5 39.541 27.3414 37.5 24.5 37.5H23C19.9258 37.5249 18.8406 39.0968 19 41.5C19.1638 43.9694 20.6993 44.5 23.6903 44.5Z" fill="black"/>
                    <path className={`thoughts_firstGroup ${style.bubble}`} d="M36.87 42.0018C39.477 41.9355 42.1442 43.6621 41.9939 46.2368C41.8504 48.6972 39.3612 50.06 36.87 49.998C34.4591 49.938 32.1455 48.6159 32.0062 46.235C31.8599 43.7369 34.3406 42.0662 36.87 42.0018ZM37 48.5C39.5506 48.5 40.6535 48.0967 40.6938 46.2446C40.7303 44.567 39.4205 43.5 36.87 43.5C34.3194 43.5 33.385 44.464 33.5 46.2446C33.6114 47.97 34.4494 48.5 37 48.5Z" fill="#CD1316"/>
                    <path className={`thoughts_firstGroup ${style.bubble}`} d="M37 48.5C39.5506 48.5 40.6535 48.0967 40.6938 46.2446C40.7303 44.567 39.4205 43.5 36.87 43.5C34.3194 43.5 33.385 44.464 33.5 46.2446C33.6114 47.97 34.4494 48.5 37 48.5Z" fill="black"/>
                    <path className={`thoughts_thirdGroup ${style.bubble}`} d="M0 17.6341C0 14.0107 2.49757 10.9307 6.06553 10.0249C6.06553 10.0249 6.06553 10.0249 6.06553 9.96447C6.06553 5.61634 9.68446 2.05329 14.1189 2.05329C15.4951 2.05329 16.8714 2.41563 18.0947 3.07993C19.6238 1.14742 21.9684 0 24.466 0C28.034 0 31.1432 2.29485 32.1626 5.55595C32.4175 5.55595 32.6214 5.49556 32.8252 5.49556C34.966 5.49556 36.9539 6.28064 38.483 7.73002C40.0631 9.23979 40.9296 11.2327 40.9296 13.3464C40.9296 14.4938 40.6238 15.7016 40.1141 16.7886C41.3374 18.1776 42 19.9893 42 21.8615C42 26.2096 38.3811 29.7726 33.9466 29.7726C33.284 29.7726 32.5704 29.6519 31.8568 29.4707C30.5316 32.1883 27.7282 34 24.568 34C22.4782 34 20.4903 33.2149 18.9612 31.7655C17.534 32.8526 15.801 33.4565 13.966 33.4565C9.53155 33.4565 5.91262 29.8934 5.91262 25.6057C5.91262 25.4849 5.91262 25.3037 5.91262 25.1829C2.4466 24.2771 0 21.1972 0 17.6341ZM6.93204 23.492C7.13592 23.5524 7.33981 23.6732 7.49272 23.9147C7.59466 24.1563 7.64563 24.3979 7.59466 24.6394C7.54369 24.9414 7.49272 25.3037 7.49272 25.6057C7.49272 28.9272 10.3981 31.5844 13.966 31.5844C15.699 31.5844 17.2791 30.9805 18.5534 29.833C18.8592 29.5311 19.318 29.5915 19.5728 29.8934C20.8471 31.3428 22.6311 32.1279 24.568 32.1279C27.3204 32.1279 29.818 30.4973 30.6845 28.0213C30.8374 27.659 31.0922 27.4174 31.3981 27.4174C31.449 27.4174 31.551 27.4174 31.6019 27.4778C32.4175 27.7797 33.1311 27.9005 33.8956 27.9005C37.4636 27.9005 40.3689 25.1829 40.3689 21.9218C40.3689 20.3517 39.7063 18.8419 38.534 17.7549C38.1772 17.4529 38.1262 16.849 38.3811 16.4263C38.9927 15.46 39.2985 14.4334 39.2985 13.4067C39.2985 11.8366 38.6359 10.3872 37.4636 9.23979C36.2403 8.09236 34.5583 7.42806 32.8252 7.42806C32.4684 7.42806 32.1116 7.48845 31.7039 7.54884C31.2961 7.60924 30.9393 7.30728 30.8374 6.82416C30.2767 3.98579 27.5752 1.9325 24.466 1.9325C22.1723 1.9325 20.0825 3.01954 18.9102 4.89165C18.6553 5.254 18.2476 5.37478 17.8908 5.13321C16.7694 4.34813 15.4442 3.98579 14.1189 3.98579C10.551 3.98579 7.64563 6.70337 7.64563 9.96447C7.64563 10.0853 7.64563 10.206 7.6966 10.3872C7.6966 10.4476 7.6966 10.5684 7.74757 10.6288C7.79854 10.8703 7.74757 11.1119 7.59466 11.3535C7.44175 11.5346 7.28883 11.7158 7.08495 11.7158C3.92476 12.1989 1.63107 14.675 1.63107 17.5737C1.5801 20.5329 3.82281 23.0089 6.93204 23.492Z" fill="#CD1316"/>
                    <path className={`thoughts_thirdGroup ${style.bubble}`} d="M6.93204 23.492C7.13592 23.5524 7.33981 23.6732 7.49272 23.9147C7.59466 24.1563 7.64563 24.3979 7.59466 24.6394C7.54369 24.9414 7.49272 25.3037 7.49272 25.6057C7.49272 28.9272 10.3981 31.5844 13.966 31.5844C15.699 31.5844 17.2791 30.9805 18.5534 29.833C18.8592 29.5311 19.318 29.5915 19.5728 29.8934C20.8471 31.3428 22.6311 32.1279 24.568 32.1279C27.3204 32.1279 29.818 30.4973 30.6845 28.0213C30.8374 27.659 31.0922 27.4174 31.3981 27.4174C31.449 27.4174 31.551 27.4174 31.6019 27.4778C32.4175 27.7797 33.1311 27.9005 33.8956 27.9005C37.4636 27.9005 40.3689 25.1829 40.3689 21.9218C40.3689 20.3517 39.7063 18.8419 38.534 17.7549C38.1772 17.4529 38.1262 16.849 38.3811 16.4263C38.9927 15.46 39.2985 14.4334 39.2985 13.4067C39.2985 11.8366 38.6359 10.3872 37.4636 9.23979C36.2403 8.09236 34.5583 7.42806 32.8252 7.42806C32.4684 7.42806 32.1116 7.48845 31.7039 7.54884C31.2961 7.60924 30.9393 7.30728 30.8374 6.82416C30.2767 3.98579 27.5752 1.9325 24.466 1.9325C22.1723 1.9325 20.0825 3.01954 18.9102 4.89165C18.6553 5.254 18.2476 5.37478 17.8908 5.13321C16.7694 4.34813 15.4442 3.98579 14.1189 3.98579C10.551 3.98579 7.64563 6.70337 7.64563 9.96447C7.64563 10.0853 7.64563 10.206 7.6966 10.3872C7.6966 10.4476 7.6966 10.5684 7.74757 10.6288C7.79854 10.8703 7.74757 11.1119 7.59466 11.3535C7.44175 11.5346 7.28883 11.7158 7.08495 11.7158C3.92476 12.1989 1.63107 14.675 1.63107 17.5737C1.5801 20.5329 3.82281 23.0089 6.93204 23.492Z" fill="black"/>
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