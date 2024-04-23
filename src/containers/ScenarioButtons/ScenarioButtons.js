import style from './ScenarioButtons.module.css';

export default function ScenarioButtons({addStep, removeStep, step}) {
    return (
    <div className={style.buttonsContainer}>
        <div className={style.previousNextContainer}>
            {step > 0 && <button className="button" onClick={removeStep}><i className="fa-solid fa-arrow-left"></i>Etape précédente</button>}
            <button className="button" onClick={addStep}>Prochaine étape<i className="fa-solid fa-arrow-right"></i></button>
        </div>
    </div>
    )
}