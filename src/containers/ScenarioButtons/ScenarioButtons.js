import style from './ScenarioButtons.module.css';

export default function ScenarioButtons({addStep, removeStep, step, max}) {

    const nexButton = [
        "C'est parti !",
        "C'était facile",
        "J'ai comprit !",
        "OK !",
        "Bizarre cette histoire...",
        "C'est quoi la suite ? ",
        "Trop cool !"
    ]
    return (
    <div className={style.buttonsContainer}>
        <div className={style.previousNextContainer}>
            {step > 0 && <button className="button" onClick={removeStep}><i className="fa-solid fa-arrow-left"></i>Etape précédente</button>}
            {step < max -1 && <button className="button" onClick={addStep}>{nexButton[step]}<i className='fa-solid fa-arrow-right'></i></button>}
        </div>
    </div>
    )
}