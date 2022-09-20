import React from 'react';

export default function Description(props) {
	return (
		<div className="description-box">
			<textarea 
				name="description"
				id="description"
				className="description-area"
				placeholder="Type a description..."
				defaultValue={props.value}
				disabled={props.isOpened}
				onChange={props.change}
				/>
		</div>
	)
}
