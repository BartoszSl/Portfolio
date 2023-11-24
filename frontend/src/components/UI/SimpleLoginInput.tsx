import React, {
	useRef,
	useImperativeHandle,
	forwardRef,
	useState,
} from 'react';

import classes from './SimpleLoginInput.module.scss';

type SimpleLoginInputProps = {
	id: string;
	type: string;
	label: string;
	special?: string;
};

export type SimpleLoginInputRef = {
	focus: () => void;
	getValue: () => string;
};

const SimpleLoginInput: React.ForwardRefRenderFunction<
	SimpleLoginInputRef,
	SimpleLoginInputProps
> = (props, ref) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState<string>('');

	useImperativeHandle(
		ref,
		() => ({
			focus: () => {
				inputRef.current!.focus();
			},
			getValue: () => value,
		}),
		[value]
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className={classes['input-label']}>
			<div className={classes.labels}>
				<label htmlFor={props.id}>{props.label}</label>
				{props.special && <span>{props.special}</span>}
			</div>
			<input
				ref={inputRef}
				type={props.type}
				id={props.id}
				value={value}
				onChange={handleChange}
				name={props.id}
				required
			/>
		</div>
	);
};

export default forwardRef(SimpleLoginInput);
