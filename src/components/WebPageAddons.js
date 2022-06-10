const WebPageAddons = ({ isChecked, onChangeHandler, currValue }) => {
	return (
		isChecked && <div>
			<p>
				Número de páginas <button type="button" name="pages_num" className="sum" onClick={onChangeHandler}>+</button>
				<input type="number" name="pages_num" onChange={onChangeHandler} placeholder="0" min="0" value={currValue["pages_num"]} />
				<button type="button" name="pages_num" className="min" onClick={onChangeHandler}>-</button>
			</p>
			<p>
				Número de idiomas <button type="button" name="pages_langs" className="sum" onClick={onChangeHandler}>+</button>
				<input type="number" name="pages_langs" onChange={onChangeHandler} placeholder="0" min="0" value={currValue["pages_langs"]} />
				<button type="button" name="pages_langs" className="min" onClick={onChangeHandler}>-</button>
			</p>
		</div>
	);
};

export default WebPageAddons;