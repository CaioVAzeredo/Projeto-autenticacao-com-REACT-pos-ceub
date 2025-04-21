import React from 'react';
import './ModalConfirmacao.css';

const ModalConfirmacao = ({ getMessage, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="confirmation-modal">
                <div className="modal-content">
                    <p className="confirmation-message">{getMessage() || "Tem certeza de que deseja excluir este item?"}</p>
                    
                    <div className="button-group">
                        <button 
                        className="confirm-btn" 
                        onClick={onConfirm}
                        >
                            Sim, tenho certeza
                        </button>
                        <button 
                        className="cancel-btn" 
                        onClick={onCancel}
                        >
                            Não, cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacao;