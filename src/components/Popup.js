import { useState } from "react";

const Popup = ({ value, text }) => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<button type="button" onClick={() => setVisible(!visible)} style={{ display: "inline-block" }}>
				i
			</button>

			{visible && (
				<div className="modal">
					<div className="background-modal" onClick={() => setVisible(!visible)}></div>
					<div className="modal-content">
						<p>
							{text} {value}
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Popup;
