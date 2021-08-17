import React, { FC, useEffect, useState, Dispatch } from 'react';
import styled from 'styled-components'
import NewColumn from './NewColumn';
import Column from './Column';
import { LSGetColumns, LSGetComments, LSGetTasks, LSSetColumns, LSSetComments, LSSetTasks } from '../utils/localStorage';

export const BoardContext = React.createContext<{
  setComments: Dispatch<any>
  author: string
}>({
  setComments: () => { },
  author: ''
})

type PropsBoard = {
  userName: string
}

const Board: FC<PropsBoard> = ({ userName }) => {
  const [columns, setColumns] = useState<any>({})
  const [tasks, setTasks] = useState<any>({})
  const [comments, setComments] = useState<any>({})

  useEffect(() => {
    setColumns(LSGetColumns())
    setTasks(LSGetTasks())
    setComments(LSGetComments())
  }, [])

  useEffect(() => {
    LSSetColumns(columns)
  }, [columns])
  useEffect(() => {
    LSSetTasks(tasks)
  }, [tasks])
  useEffect(() => {
    LSSetComments(comments)
  }, [comments])

  return (
    <BoardContext.Provider value={{ setComments, author: userName }}>
      <Wrap className='board'>
        {Object.keys(columns).map(id => {
          return <Column key={id}
            columnId={id}
            title={columns[id].title}
            setColumns={setColumns}
            tasks={tasks}
            setTasks={setTasks}
            comments={comments} />
        })}
        <NewColumn
          setColumns={setColumns} />
      </Wrap>
    </BoardContext.Provider>
  );
}

const Wrap = styled.div`
display: flex;
align-items: flex-start;
white-space: nowrap;
padding: 15px;
`

export default Board;
