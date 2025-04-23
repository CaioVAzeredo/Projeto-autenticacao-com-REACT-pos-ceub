import './ModalVisualizar.css'

function Modal({ onClose, titulo, descricao, prioridade }) {
    return (
        <div className="modal-overlay">
            <div className="tarefa-modal">
                <div className="modal-header">
                    <h2>Detalhes da Tarefa</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="form-group">
                    <label>Título</label>
                    <div>{titulo}</div>
                </div>

                <div className="form-group">
                    <label>Descrição</label>
                    <div>{descricao}</div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Prioridade</label>
                        <div>{prioridade}</div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Modal;