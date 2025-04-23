import React, { useState } from 'react';
import './TarefaItem.css';

const TarefaItem = ({ 
    idTarefa,
    title, 
    description, 
    status, 
    priority, 
    createdAt,
    onMenuAction
}) => {
    const [showMenu, setShowMenu] = useState(false);
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    
    const handleStatusChange = () => {
        alert(`Status mudado de ${status} para o próximo estado`);
    };
    
    const handleMenuAction = (action) => {
        onMenuAction(action, idTarefa, title);
        setShowMenu(false);
    };
    
    const getStatusIcon = () => {
        switch(status) {
            case 'PENDENTE':
                return <span className="status-icon pending" title="Pendente">!</span>;
            case 'EM_ANDAMENTO':
                return <span className="status-icon in-progress" title="Em Andamento">↻</span>;
            case 'CONCLUIDO':
                return <span className="status-icon completed" title="Concluída">✓</span>;
            default:
                return <span className="status-icon pending" title="Pendente">!</span>;
        }
    };
    
    const getPriorityClass = () => {
        return `priority-badge ${priority}`;
    };

    const getPriorityShadowClass = () => {
        return `priority-shadow-${priority}`;
    };

    return (
        <div className={`task-card ${getPriorityShadowClass()}`}>
            <div className="card-header">
                <div className="title-container">
                    {getStatusIcon()}
                    <h3 className="task-title">{title}</h3>
                </div>
                <div className="menu-container">
                    <button className="menu-button" onClick={toggleMenu}>⋮</button>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <button onClick={() => handleMenuAction('visualizar')}>Visualizar</button>
                            <button onClick={() => handleMenuAction('editar')}>Editar</button>
                            <button onClick={() => handleMenuAction('excluir')}>Excluir</button>
                        </div>
                    )}
                </div>
            </div>
            
            <p className="task-description">{description}</p>
            
            <div className="card-footer">
                <span className={getPriorityClass()}>{priority}</span>
                <span className="created-date">{createdAt}</span>
            </div>
            
            <button className="status-button" onClick={handleStatusChange}>
                Mudar Status
            </button>
        </div>
    );
};

export default TarefaItem;