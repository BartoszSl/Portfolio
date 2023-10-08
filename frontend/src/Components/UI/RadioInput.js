import classes from './RadioInput.module.css';

const RadioInput = (props) => {
	return (
		<input
			id={props.id}
			className={`${classes.radio} ${props.className}`}
			type='radio'
			name={props.name}
			onChange={props.onChange}
			checked={props.checked}
		/>
	);
};

export default RadioInput;
