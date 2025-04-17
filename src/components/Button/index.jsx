import './Button.css'
function Button({ onclick, info }) {
    return (<>
        <button onClick={onclick} className="button">{info}</button>
    </>)
}

export default Button