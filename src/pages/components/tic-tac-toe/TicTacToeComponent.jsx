import { Board } from './Board';
import { useState } from "react";
import { Card, Container, Form } from 'react-bootstrap';

function TicTacToeComponent() {

const [gridSize, setGridSize] = useState(3);

  return (
    <Container>
      <Card>
        <Card.Header as="h1" className='text-center'> Tic Tac Toe</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="gridSizeInput">Enter Gridsize</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter Grid Size (Ex. 3)" 
                value={gridSize} 
                onChange={(event) => setGridSize(event.target.value)}/>
            </Form.Group>
            </Form>
            </Card.Body>
        </Card>
          <Board gridSize = {gridSize} />
    </Container>
  )
}

export default TicTacToeComponent
