import Popup from "./Popup";

const WebPageAddons = ({ isChecked, eventInputHandler, budget }) => {
	return (
		isChecked && (
			<>
				<div>
					<span>Número de páginas </span>
					<button type="button" name="pages_num" value={budget.webpage.pages_num + 1} onClick={eventInputHandler}>
						+
					</button>
					<input type="number" name="pages_num" onChange={eventInputHandler} value={budget.webpage.pages_num} />
					<button type="button" name="pages_num" value={budget.webpage.pages_num - 1} onClick={eventInputHandler}>
						-
					</button>
					<Popup value={budget.webpage.pages_num} text="Indique el número de páginas que necesita en el proyecto, ahora tiene:" />
				</div>
				<div>
					<span>Número de idiomas </span>
					<button type="button" name="pages_langs" value={budget.webpage.pages_langs + 1} onClick={eventInputHandler}>
						+
					</button>
					<input type="number" name="pages_langs" onChange={eventInputHandler} value={budget.webpage.pages_langs} />
					<button type="button" name="pages_langs" value={budget.webpage.pages_langs - 1} onClick={eventInputHandler}>
						-
					</button>
					<Popup  value={budget.webpage.pages_langs} text="Indique el número de idiomas que necesita en el proyecto, ahora tiene:" />
				</div>
			</>
		)
	);
};

export default WebPageAddons;
