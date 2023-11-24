import classes from './Button.module.scss';

type ButtonProps = {
	classes: string;
	children: React.ReactNode;
	type: 'button' | 'submit' | 'reset';
	onClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button type={props.type} className={`${classes.button} ${props.classes}`} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default Button;
