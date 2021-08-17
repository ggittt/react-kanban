import React, { useEffect, useState, } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import SignUpModal from './components/SignUpModal';
import { LSGetUser, LSSetColumns, LSSetComments, LSSetTasks, LSSetUser } from './utils/localStorage';
import initialColumns from './assets/initial/initialColumns.json'
import initialTasks from './assets/initial/initialTasks.json'
import initialComments from './assets/initial/initialComments.json'


function App() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    setUserName(LSGetUser())
  }, [userName])

  const handleSignUp = (userName: string) => {
    setUserName(userName)
    LSSetUser(userName)
    LSSetColumns(initialColumns)
    LSSetTasks(initialTasks)
    LSSetComments(initialComments)
  }

  return (
    <div className="App">
      <SignUpModal
        show={!userName}
        handleSignUp={handleSignUp}
      />
      {userName &&
        <>
          <Header userName={userName} />
          <Board userName={userName}/>
        </>
      }
    </div>
  );
}

export default App;
