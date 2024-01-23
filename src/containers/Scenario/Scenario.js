import { useEffect, useState } from "react";

import style from './Scenario.module.css';

export default function Scenario() {

    const scenario = 
        [
            {
                description : 'Apprenons à donner vie ensemble à un site web !',
            }, 
            {
                description : "D'abord, commençons par créer un élément HTML. Ici, nous allons créer un titre avec la balise <h1> qui sera contenu dans une section <section>. En HTML, toutes les balises ont une signification et doivent être utilisées correctement !",
                code : `<section>
    <h1>Hello World</h1>
<section>`, type: 'HTML'
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
<section>`, type: 'HTML'
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

    const [step, setStep] = useState(0);
    
    function displayCode(scenario) {
        switch(scenario['type']) {
            case 'HTML': 
            return (
                <div className={style.code}><div className={`${style.typeCode} ${style.HTML}`}>{scenario['type']}</div>{scenario['code']}</div>
                )
            case 'CSS':
                return (
                    <div className={style.code}><div className={`${style.typeCode} ${style.CSS}`}>{scenario['type']}</div>{scenario['code']}</div>
                )
            case 'Javascript':
                return (
                    <div className={style.code}><div className={`${style.typeCode} ${style.Javascript}`}>{scenario['type']}</div>{scenario['code']}</div>
                )
            default : 
                return null
        }
    }


    console.log(scenario[1]['description'])
    return (
        <section id="scenario">
            <div class={style.scenarioText}>
                <p>{scenario[step]['description']}</p>
                {scenario[step]['code'] ?
                    displayCode(scenario[step])
                    : null
                }
            </div>
            <div>
                <div>
                    {step === 1 && <button onClick={() => setStep(step - 1)}>Etape précédente</button>}
                    <button onClick={() => setStep(step + 1)}>Prochaine étape</button>
                </div>
                <button onClick={() => window.location.reload(false)}>Recommencer</button>
            </div>
        </section>
    )
}