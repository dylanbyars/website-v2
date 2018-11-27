import React, { Component } from 'react'
import classnames from 'classnames'

const Generation = ({ cellStates }) => (
  <div className="flex">
    {cellStates.map((cellState, i) => (
      <span key={`${cellState}-${i}`} className={classnames(['h-12', 'w-12', 'm-1', 'rounded', ...cellState])} />
    ))}
  </div>
)

class CellularAutomaton extends Component {
  constructor() {
    super()

    const rules = [
      // rule 126
      {
        '1,1,1': 'bg-grey-lighter',
        '0,0,0': 'bg-grey-lighter',
        '1,1,0': 'bg-teal-lighter',
        '1,0,1': 'bg-teal-lighter',
        '1,0,0': 'bg-teal-lighter',
        '0,1,1': 'bg-teal-lighter',
        '0,1,0': 'bg-teal-lighter',
        '0,0,1': 'bg-teal-lighter'
      },
      // rule 60
      {
        '1,1,1': 'bg-grey-lighter',
        '0,0,0': 'bg-grey-lighter',
        '1,1,0': 'bg-grey-lighter',
        '1,0,1': 'bg-teal-lighter',
        '1,0,0': 'bg-teal-lighter',
        '0,1,1': 'bg-teal-lighter',
        '0,1,0': 'bg-teal-lighter',
        '0,0,1': 'bg-teal-lighter'
      }
    ]

    this.state = {
      generations: [],
      rule: rules[Math.floor(Math.random() * 2)]
    }
  }

  componentWillMount() {
    // make rows with enough cells to fill the window's width
    const cellCount = Math.floor(window.innerWidth / 57)

    // On initial render, build a page's-worth of rows
    const rows = Math.floor(window.innerHeight / 58)

    const setCellStateRandomly = () => (!!Math.floor(Math.random() * 2) ? 'bg-teal-lighter' : 'bg-grey-lighter')

    // generate a random row to start
    const initialGeneration = [...Array(cellCount)].fill().map(setCellStateRandomly)

    // generate an initial page-worth of generations
    const initialGenerations = [...Array(rows)]
      .fill()
      .reduce((acc, _, i) => [...acc, this.nextGeneration(acc[i])], [initialGeneration])

    this.setState({ generations: [...initialGenerations] })
  }

  componentDidMount() {
    setInterval(this.generationInterval, 1500)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    clearInterval(this.generationInterval)
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => this.componentWillMount()

  nextGeneration = prevGeneration => {
    // function for getting the state of a cell and its neighbors from a previous generation
    const prevCellState = (prevGeneration, newCell) => {
      const isActive = i => (i === 'bg-grey-lighter' ? 1 : 0)

      let self = prevGeneration[newCell]
      let leftSibling = prevGeneration[newCell - 1] || prevGeneration[prevGeneration.length - 1]
      let rightSibling = prevGeneration[newCell + 1] || prevGeneration[0]
      return [leftSibling, self, rightSibling].map(item => isActive(item))
    }

    // function to determine a new row's cell's state based on a previous generation
    const nextCellState = prevStates => {
      let cases = Object.keys(this.state.rule)
      let states = Object.values(this.state.rule)
      switch (prevStates.toString()) {
        case cases[0]:
          return states[0]
        case cases[1]:
          return states[1]
        case cases[2]:
          return states[2]
        case cases[3]:
          return states[3]
        case cases[4]:
          return states[4]
        case cases[5]:
          return states[5]
        case cases[6]:
          return states[6]
        case cases[7]:
          return states[7]
      }
    }

    return prevGeneration.map((cell, index) => {
      return nextCellState(prevCellState(prevGeneration, index))
    })
  }

  generationInterval = () => {
    let currentState = this.state.generations
    let nextGeneration = this.nextGeneration(currentState[currentState.length - 1])
    // check if the new generation is either all active or inactive
    // if it is, scrap the whole lineage and start over
    if (!nextGeneration.includes('bg-teal-lighter')) {
      this.componentWillMount()
    } else if (!nextGeneration.includes('bg-grey-lighter')) {
      this.componentWillMount()
    } else {
      let newState = [...currentState.slice(1), nextGeneration]
      this.setState({ generations: newState })
    }
  }

  render() {
    return (
      <div className="flex flex-col justify-center items-center">
        {this.state.generations.map((cellStates, i) => (
          <Generation key={`${cellStates[0]}-${i}`} cellStates={cellStates} />
        ))}
      </div>
    )
  }
}

export default CellularAutomaton
