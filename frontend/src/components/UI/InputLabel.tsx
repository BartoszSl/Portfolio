import React, { useRef, useImperativeHandle, forwardRef } from 'react';

type InputLabelProps = {
	id: string;
	type: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
};

const InputLabel: React.FC<InputLabelProps> = forwardRef((props, ref) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const activate = () => {
		inputRef.current!.focus();
	};

	useImperativeHandle(ref, () => {
		return {
			focus: activate,
		};
	});

	return (
		<div className='input-label'>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				ref={inputRef}
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
});

export default InputLabel;
