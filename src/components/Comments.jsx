import React from 'react';

export default function Comments(props) {
	return (
		<div className="comments-wrap">
			<input
				type="text"
				placeholder="Type a comment..."
				name="comments"
				id="comments"
				className="comments-area"
				disabled={props.isOpened}
				/>
			<button className="btn btn-comment">Go</button>
		</div>
	)
}
