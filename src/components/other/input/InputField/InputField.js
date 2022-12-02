import styles from "./styles.module.css";

export const InputField = ({ id, label, inputRef, ...inputAttributes }) => {
	return (
		<div className={styles["inputfield"]}>
			<label htmlFor={id}>{label}</label>
			<input id={id} ref={inputRef} {...inputAttributes} />
		</div>
	);
};

export const TextArea = ({ id, label, inputRef, ...inputAttributes }) => {
	return (
		<div className={styles["textArea"]}>
			<label htmlFor={id}>{label}</label>
			<textarea id={id} ref={inputRef} {...inputAttributes} />
		</div>
	);
};
