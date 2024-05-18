import style from './ScenarioButtons.module.css';

export default function ScenarioButtons({addStep, removeStep, step, max, close}) {

    const nexButton = [
        "C'est parti !",
        "Je valide !",
        "J'ai comprit !",
        "OK !",
        "Relou mais c'est bon",
        "C'est quoi la suite ? ",
        "Sympa !"
    ]
    return (
    <div className={style.buttonsContainer}>
        <div className={style.previousNextContainer}>
            {step > 0 && <button className="button" onClick={removeStep}><i className="fa-solid fa-arrow-left"></i>Etape précédente</button>}
            {(step > 0 && step !== 3 && step !== 7) && <button className="button" id="i-try" onClick={close}>J'essaye !</button>}
            {step < max -1 && <button className="button" onClick={addStep}>{nexButton[step]}<i className='fa-solid fa-arrow-right'></i></button>}
        </div>
    </div>
    )
}