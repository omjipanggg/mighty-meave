import React from 'react';

export default function ModalDel(props) {
	const handleSubmit = (e) => {
		e.preventDefault();
	}
	return (
		<div className="overlay hidden" id="modalDel">
			<button className="close" onClick={() => props.hide('modalDel')} />
			<div className="modal-container">
				<div className="modal-header">
					<h3>Confirmation</h3>
					<p>Are you sure to delete this record?</p>
				</div>
				<div className="modal-body flex">
					<button className="btn-nah" onClick={() => props.hide('modalDel')}>Cancel</button>					
					<button className="btn btn-yep" onClick={() => props.confirm(props.task.id)}>Sure</button>					
				</div>
				<div className="modal-footer"></div>
			</div>
		</div>
	)
}