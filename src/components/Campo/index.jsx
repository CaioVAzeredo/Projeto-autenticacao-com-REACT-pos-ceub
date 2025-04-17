import './Campo.css'

function Campo({ placeholder, valor, onChange, type }) {
    return (<div className='campo'>
        <label htmlFor="">{placeholder}</label>
        <input
            valor={valor}
            type={type}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>)
}

export default Campo