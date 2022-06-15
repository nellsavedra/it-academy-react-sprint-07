const WebPageAddons = ({ isChecked, eventInputHandler, budget }) => {
	return (
		isChecked && <div>
			<p>
				Número de páginas <button type="button" name="pages_num" value={budget.webpage.pages_num + 1} onClick={eventInputHandler}>+</button>
				<input type="number" name="pages_num" onChange={eventInputHandler} value={budget.webpage.pages_num} />
				<button type="button" name="pages_num" value={budget.webpage.pages_num - 1} onClick={eventInputHandler}>-</button>
			</p>
			<p>
				Número de idiomas <button type="button" name="pages_langs"  value={budget.webpage.pages_langs + 1} onClick={eventInputHandler}>+</button>
				<input type="number" name="pages_langs" onChange={eventInputHandler} value={budget.webpage.pages_langs} />
				<button type="button" name="pages_langs"  value={budget.webpage.pages_langs - 1} onClick={eventInputHandler}>-</button>
			</p>
		</div>
	);
};

export default WebPageAddons;