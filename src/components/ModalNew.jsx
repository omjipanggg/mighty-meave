import React from 'react';

export default function ModalNew(props) {
	return (
		<div className="overlay hidden" id="modalNew">
			<button className="close" onClick={() => props.hide('modalNew')} />
			<div className="modal-container">
				<div className="modal-header">
					<h3>Tasks</h3>
					<p>Please fill these columns to store your task.</p>
				</div>
				<div className="modal-body">
					<form className="flex" onSubmit={props.submit}>
						<div className="form-group">
							<input 
								type="text"
								ref={props.title}
								name="modal-task-name"
								className="form-control"
								placeholder="Title"
								required={true}
								tabIndex="1"
								value={props.defTitle}
								onChange={(e) => props.changeTitle(e.target.value)}
								autoFocus={true}
								/>
							<button
								type="submit"
								className="btn btn-yep">Save</button>
						</div>
						<textarea
							ref={props.desc}
							name="modal-task-description"
							id="modal-description"
							className="modal-description-area"
							placeholder="Description"
							tabIndex="2"
							value={props.defDesc}
							onChange={(e) => props.changeDesc(e.target.value)}
							/>
					</form>
				</div>
				<div className="modal-footer"></div>
			</div>
		</div>
	)
}
