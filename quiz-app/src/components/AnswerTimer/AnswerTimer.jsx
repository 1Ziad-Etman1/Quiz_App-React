import "./AnswerTimer.scss";
import React, { useState, useEffect, useRef } from "react";

const AnswerTimer = (props) => {
	const [counter, setCounter] = useState(0);
	const [progressLoaded, serProgressLoaded] = useState(0);
	const intervalRef = useRef();

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCounter((cur) => cur + 0.05);
		}, 50);

		return () => clearInterval(intervalRef.current);
	}, []);

	useEffect(() => {
		serProgressLoaded(100 * (counter / props.duration));

		if (counter >= props.duration) {
			clearInterval(intervalRef.current);
			setTimeout(() => {
				props.onTimeUp();
			}, 1000);
		}
	}, [counter]);

	return (
		<div className="answer-timer-container">
			<div
				style={{
					width: `${progressLoaded}%`,
					backgroundColor: `${
						progressLoaded < 40
							? "lightgreen"
							: progressLoaded < 70
							? "orange"
							: "red"
					}`,
				}}
				className="progress"
			></div>
		</div>
	);
};

export default AnswerTimer;
