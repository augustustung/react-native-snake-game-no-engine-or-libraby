import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native'
import Snake from './snake'
import Food from './food'

const GRID_SIZE = 15
const CELL_SIZE = 20
const BOARD_SIZE = GRID_SIZE * CELL_SIZE

const randomFood = () => {
  let max = 19, min = 0
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5
  return [x, y]
}

export default class SnakeScreen extends React.Component {
  state = {
    snakeDots: [
      // [0, 0],
      [3, 7],
    ],
    food: randomFood(),
    direction: 'PLAY',
    speed: 300,
    curScore: 1,
    highestScore: 0
  }

  
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed)
  }

  componentDidUpdate() {
    const { curScore, highestScore } = this.state
    this.checkIfOutBorder()
    this.checkIfCollap()
    this.checkIfEat()
    if(curScore > highestScore){
      this.setState({highestScore: curScore})
    }
  }


  moveSnake = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 1, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 1, head[1]]
        break
      case 'UP':
        head = [head[0], head[1] - 1]
        break
      case 'DOWN':
        head = [head[0], head[1] + 1]
        break
      default:
        break
    }
    // console.log(head)
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots,
    })
  }

  checkIfEat = () => {
    const { snakeDots, food, curScore } = this.state 
    let head = snakeDots[snakeDots.length - 1]
    if (head[0] === food[0] && head[1] === food[1]) {
      // console.log(head, '   ', food)
      this.setState({
        food: randomFood(),
        curScore: curScore+1
      })
      this.longerSnake()
      this.increaseSpeed()
    }
  }

  longerSnake = () => {
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([300, 300])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed = () => {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  checkIfCollap = () => {
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        // console.log(head, '      ',dot)
        this.gameOver()
      }
    })
  }

  checkIfOutBorder = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if ( 
      head[0] >= 19 || 
      head[1] >= 19 || 
      head[0] < 0 || 
      head[1] < 0
    ) {
      this.gameOver()
    }
  }

  gameOver = () => {
    const { snakeDots, highestScore } = this.state
    
    Alert.alert(`Highest Score: ${highestScore}`,`Your Score: ${snakeDots.length}`, [{ text: 'Try again...'} ,{/*{text: 'Go Back', onPress: () => this.setState({ status: 'READY' })},*/} ])
    this.setState({
      snakeDots: [
        // [0, 0],
        [3, 7],
      ],
      food: randomFood(),
      direction: 'PLAY',
      speed: 300,
      curScore: 1
    })
  }

  render() {
    const { snakeDots, food, direction } = this.state
        return (
          <View style={styles.container}>
            <View style={styles.gameArea}>
            {(direction == 'PLAY') && <Text style={styles.start}>PRESS ANY BUTTON TO PLAY</Text>}
            <Snake snakeDots={snakeDots} size={GRID_SIZE} />
            <Food dot={food} size={GRID_SIZE} />
          </View>
  
            <View style={styles.controls}>
              <View style={styles.controlRow}>
                <TouchableOpacity
                  onPress={() => this.setState({ direction: 'UP' })}>
                  <View style={styles.control} />
                </TouchableOpacity>
              </View>
    
              <View style={styles.controlRow}>
                <TouchableOpacity
                  onPress={() => this.setState({ direction: 'LEFT' })}>
                  <View style={styles.control} />
                </TouchableOpacity>
                <View style={[styles.control, { backgroundColor: null }]} />
                <TouchableOpacity
                  onPress={() => this.setState({ direction: 'RIGHT' })}>
                  <View style={styles.control} />
                </TouchableOpacity>
              </View>
    
              <View style={styles.controlRow}>
                <TouchableOpacity
                  onPress={() => this.setState({ direction: 'DOWN' })}>
                  <View style={styles.control} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7d7d7'
  },
  gameArea: {
    position: 'relative',
    borderColor: '#000',
    borderWidth: 7,
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#a4c78d'
  },
  start: {
    position: 'absolute',
    bottom: '10%',
    left: '14%',
    fontWeight: 'bold'
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
    paddingTop: 30,
  },
  controlRow: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: '#070705',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
