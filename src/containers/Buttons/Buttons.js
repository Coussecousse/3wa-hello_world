import style from './Buttons.module.css';

export default function Buttons({addStep, removeStep, restart, step}) {
    return (
    <div className={style.buttonsContainer}>
        <div className={style.previousNextContainer}>
            {step > 0 && <button onClick={removeStep}><i class="fa-solid fa-arrow-left"></i>Etape précédente</button>}
            <button onClick={addStep}>Prochaine étape<i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <button onClick={restart}>Recommencer</button>
    </div>
    )
}