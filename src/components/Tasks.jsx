import React from 'react';

export default function Tasks(props) {
	return (
		<li className="task-item no flex" onClick={() => props.chosen(props.tasks.id)}>
			<div className="group flex gap-3">
				<input type="checkbox" onChange={() => props.change(props.tasks.id)} checked={props.tasks.status} />
				{props.tasks.name}
			</div>
			<span onClick={() => props.openModal('modalDel')} className="btn-close">✖</span>
		</li>
	)
}
