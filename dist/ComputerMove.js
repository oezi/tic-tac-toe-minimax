"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ComputerMove;

var _AIHelpers = require("./AIHelpers");

var _AIHelpers2 = _interopRequireDefault(_AIHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_VALUE = 99999999;

function ComputerMove(board, symbols, difficulty) {
	var huPlayer = symbols.huPlayer,
	    aiPlayer = symbols.aiPlayer;


	function evaluate() {
		if (_AIHelpers2.default.playerWon(board, huPlayer)) {
			return -10;
		} else if (_AIHelpers2.default.playerWon(board, aiPlayer)) {
			return +10;
		} else {
			return 0;
		}
	}

	function minimax(depth, isMaximizingPlayer) {
		var score = evaluate();

		if (Math.abs(score) === 10) {
			return score;
		}

		if (!_AIHelpers2.default.isMovesLeft(board, symbols)) {
			return 0;
		}

		var bestVal = MAX_VALUE;
		var leftMoves = _AIHelpers2.default.getEmptyIndexies(board, symbols);

		if (isMaximizingPlayer) {
			bestVal *= -1;

			leftMoves.forEach(function (move) {
				board[move] = aiPlayer;
				var value = minimax(depth + 1, false);
				bestVal = Math.max(bestVal, value);
				board[move] = move;
			});
			return bestVal;
		} else {

			leftMoves.forEach(function (move) {
				board[move] = huPlayer;
				var value = minimax(depth + 1, true);
				bestVal = Math.min(bestVal, value);
				board[move] = move;
			});
			return bestVal;
		}
	}

	function findBestMove() {
		var bestVal = -1 * MAX_VALUE;
		var bestMove = undefined;

		// Traverse all cells, evalutae minimax function for
		// all empty cells. And return the cell with optimal
		// value.
		var leftMoves = _AIHelpers2.default.getEmptyIndexies(board, symbols);

		leftMoves.forEach(function (move) {
			// Do the move
			board[move] = aiPlayer;

			// Calculate val of move
			var moveVal = minimax(0, false);

			// Undo the move
			board[move] = move;

			// If the value of the current move is
			// more than the best value, then update
			// best/
			if (moveVal > bestVal) {
				bestMove = move;
				bestVal = moveVal;
			}
		});
		return bestMove;
	}

	function findEasyMove() {
		var leftMoves = _AIHelpers2.default.getEmptyIndexies(board, symbols);
		var randomIndex = Math.floor(Math.random() * leftMoves.length);
		return leftMoves[randomIndex];
	}

	function findNormalMove(chance) {
		return Math.random() < chance ? findBestMove() : findEasyMove();
	}

	var ret = -1;
	switch (difficulty) {
		case "Easy":
			ret = findNormalMove(0);
			break;
		case "Normal":
			ret = findNormalMove(0.75);
			break;
		case "Hard":
			ret = findNormalMove(1);
			break;
		default:
			if (typeof difficulty === 'number' && difficulty >= 0 && difficulty <= 1) {
				ret = findNormalMove();
			} else {
				throw Error("Difficulty not valid!");
			}
	}
	return ret;
}