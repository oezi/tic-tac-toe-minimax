type Player = string | Symbol
type Difficulty = 'Easy' | 'Normal' | 'Hard' | number
type Players = { huPlayer: Player, aiPlayer: Player }
type Board = (Player | number)[]
type GameState = {
  winner: 'huPlayer' | 'aiPlayer' | 'draw' | null
  board: Board
}
function ComputerMove(board: Board, players: Players, difficulty: Difficulty): number | undefined
function GameStep(board: Board, players: Players, difficulty: Difficulty): GameState

export default {
  ComputerMove,
  GameStep,
}
