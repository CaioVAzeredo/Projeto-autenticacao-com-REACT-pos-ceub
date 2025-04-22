import './Campo.css'

function Campo({ placeholder, valor, onChange, type, required = false }) {
    return (<div className='campo'>
        <label htmlFor="">{placeholder}</label>
        <input
            value={valor}
            type={type}
            required={required}
            onChange={(e) => onChange(e.target.value)
            }
        />
    </div>)
}

export default Campo