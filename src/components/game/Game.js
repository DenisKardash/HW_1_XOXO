import React from 'react';

import { useState } from 'react';
import { GameArea } from '../gameArea/GameArea';
import { linesWins } from '../constants';

import styles from './Game.module.css';

export const Game = () => {
	const [gameArea, setGameArea] = useState(Array(9).fill(null));
	const [playerXNext, setPlayerXNext] = useState(true);

	const checkWinner = (cells) => {
		// const linersWins is in constant.js
		for (let i = 0; i < linesWins.length; i += 1) {
			const [a, b, c] = linesWins[i];
			if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a];
		}
	};

	const winner = checkWinner(gameArea);

	const cellClick = (index) => {
		const checkGameArea = [...gameArea];
		if (winner || checkGameArea[index]) return; // есть победитель или ячейка занята (return)
		checkGameArea[index] = playerXNext ? 'X' : 'O'; // определение хода ()
		setGameArea(checkGameArea); // обновляем наш массив (после каждого клика)
		setPlayerXNext(!playerXNext); // меняем состояние на противоположное (после каждого клика)
	};

	const startNewGame = () => {
		return (
			<button
				className={styles.reset_btn}
				onClick={() => setGameArea(Array(9).fill(null))}
			>
				New Game
			</button>
		);
	};

	return (
		<div className={styles.container}>
			<p className={styles.info}>
				{winner ? 'WINNER !!!! - ' + winner : 'ходит ' + (playerXNext ? 'X' : 'O')}
			</p>
			{/* передаем пропы в GameArea */}
			<GameArea cells={gameArea} click={cellClick} />
			{startNewGame()}
		</div>
	);
};
