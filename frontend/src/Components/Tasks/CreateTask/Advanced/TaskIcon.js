import { ChromePicker } from 'react-color';
import Select from 'react-select';
import classes from './TaskIcon.module.css';
import { useContext, useEffect, useState } from 'react';
import UserDataContext from '../../../../Context/userData-context';

const patterns = [
	{ value: 'default', label: 'Zwykły' },
	{ value: 'moon', label: 'Księżyc' },
	{ value: 'syringe', label: 'Niespodzianka' },
];

const TaskIcon = () => {
	const userCtx = useContext(UserDataContext);

	const [showPicker, setShowPicker] = useState(false);
	const [selectedColor, setSelectedColor] = useState(userCtx.iconColor);
	const [selectedPattern, setSelectedPattern] = useState(userCtx.iconType);
	const [borderColor, setBorderColor] = useState(userCtx.mainColor);
	const [svgClasses, setSvgClasses] = useState('');
	const [paternSelect, setPaternSelect] = useState();
	const [insididePattern, setInsidePattern] = useState('');

	const handleColorChange = (color) => {
		setSelectedColor(color.hex);
		setShowPicker(false);
	};

	const togglePicker = () => {
		setShowPicker(!showPicker);
	};

	const handlePatternChange = (selected) => {
		setSelectedPattern(selected.value);
		setPaternSelect(selected);
	};

	useEffect(() => {
		if (selectedPattern === 'default') {
			setInsidePattern(userCtx.title.split(' ')[0][0]);
			setSvgClasses('');
		} else if (selectedPattern === 'moon') {
			setInsidePattern('');
			setSvgClasses('fa-solid fa-moon');
		} else if (selectedPattern === 'syringe') {
			setInsidePattern('');
			setSvgClasses('fa-solid fa-syringe');
		}
	}, [selectedPattern, userCtx.title]);

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			height: '5rem',
			backgroundColor: '#28282a',
			borderRadius: '2.5rem',
			border: `1px solid ${userCtx.mainColor}`,
			paddingLeft: '1rem',
			cursor: 'pointer',
			color: state.isSelected ? 'white' : 'black',
		}),
		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? 'white' : 'black',
		}),
		singleValue: (provided) => ({
			...provided,
			color: 'white',
		}),
	};

	useEffect(() => {
		userCtx.onAddIcon({ color: selectedColor, type: selectedPattern });
		console.log('add');
	}, [selectedColor, selectedPattern]);

	useEffect(() => {
		if (userCtx.isCleared) {
			setSelectedColor('#FFFFFF');
			setPaternSelect('');
			setSvgClasses('');
			setInsidePattern('');
		}
	}, [userCtx.isCleared]);

	useEffect(() => {
		if (userCtx.isEditMode) {
			setSelectedPattern(userCtx.iconType);
			setSelectedColor(userCtx.iconColor);
			setBorderColor(userCtx.mainColor);
			console.log('changed');
		}
	}, [userCtx.iconType, userCtx.isEditMode]);

	return (
		<div className={classes['task-icon']}>
			<h3>Ikona</h3>
			<div className={classes.tools}>
				<label
					className={classes['icon-color']}
					style={{ borderColor: borderColor }}>
					Kolor
					<div
						className={classes['color-picker']}
						style={{
							backgroundColor: selectedColor,
						}}
						onMouseEnter={togglePicker}
						onClick={togglePicker}>
						{showPicker && (
							<ChromePicker
								color={selectedColor}
								onChange={handleColorChange}
								disableAlpha={true}
								onClose={togglePicker}
							/>
						)}
					</div>
					<i className='fa-solid fa-eye-dropper'></i>
				</label>

				<Select
					styles={customStyles}
					className={classes.select}
					options={patterns}
					value={paternSelect}
					onChange={handlePatternChange}
					placeholder='Wybierz wzór'
				/>
				<div
					className={classes['icon-result']}
					style={{ backgroundColor: borderColor }}>
					<i
						className={`${classes['icon-pattern']} ${
							svgClasses.length > 1 ? svgClasses : ''
						}`}
						style={{ color: selectedColor }}>
						{insididePattern}
					</i>
				</div>
			</div>
		</div>
	);
};

export default TaskIcon;
