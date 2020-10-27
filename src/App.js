import './App.css';
import { useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

function App() {
  const [namesLeft, setNamesLeft] = useState( ["Olivia", "Emily",  "Isla", "Sophie", "Ella", "Ava", "Amelia", "Grace", "Freya", "Charlotte"]);
  const [namesRight, setNamesRight] = useState(["Jack", "Oliver", "James", "Charlie", "Harris", "Lewis", "Leo", "Noah",  "Alfie", "Rory"]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [filteredLeft, setFilteredLeft] = useState([...namesLeft]);
  const [filteredRight, setFilteredRight] = useState([...namesRight]);


  const filterLeft = (event) => {
    setFilteredLeft(namesLeft.filter(name => name.toLowerCase()
    .includes(event.target.value.toLowerCase())));
  }
  const filterRight = (event) => {
    setFilteredRight(namesRight.filter(name => name.toLowerCase()
    .includes(event.target.value.toLowerCase())));
  }
  const constructList = (array) => {
    return (
      <div>
        {array.map((value) => {
          return (
          <div onClick={() => nameSelect(value)}><Checkbox checked={selectedNames.indexOf(value) !== -1} hidden={true}/>{value}</div>
          )
        })}
    </div>
    )
  }
  
  const sortListLeft = () => {
    const newLeftNames = [...namesLeft];
    newLeftNames.sort();
    setNamesLeft(newLeftNames);
  }

  const sortListRight = () => {
    const newRightNames = [...namesRight];
    newRightNames.sort();
    setNamesRight(newRightNames);
  }

  const nameSelect = (name) => {
    const newSelectNames = [...selectedNames];
    const nameIndexInArray = selectedNames.indexOf(name);
    if (nameIndexInArray !== -1){
      newSelectNames.splice(nameIndexInArray,1); // unselect
    } else {
      newSelectNames.push(name); // add to selectionarray
    }
    setSelectedNames(newSelectNames);
  }

  const moveToRight = () => {
    // filter away the names being moved from the left
    const newLeftNames = namesLeft.filter(name => !selectedNames.includes(name));

    // filter away names that are already on the right so not to duplicate
    const filteredSelectedNames = selectedNames.filter(name => !namesRight.includes(name));
    const newRightNames = namesRight.concat(filteredSelectedNames);
    updateListStatus(newLeftNames, newRightNames);
    setSelectedNames([]);
  }

  const moveToLeft = () => {
    // filter away the names being moved from the right
    const newRightNames = namesRight.filter(name => !selectedNames.includes(name));

    // filter away names that are already on the left so not to duplicate
    const filteredSelectedNames = selectedNames.filter(name => !namesLeft.includes(name));
    const newLeftNames = namesLeft.concat(filteredSelectedNames);
    updateListStatus(newLeftNames, newRightNames);
    setSelectedNames([]);
  }

  const updateListStatus = (newLeftNames, newRightNames) => {
    setNamesLeft(newLeftNames);
    setNamesRight(newRightNames);
    setFilteredLeft(newLeftNames);
    setFilteredRight(newRightNames);
  }

  const swapNames = () => {
    const remainingNamesOnRight = namesRight.filter(name => !selectedNames.includes(name));
    const filteredSelectedNamesToLeft = selectedNames.filter(name => !namesLeft.includes(name));
    
    const remainingNamesOnLeft = namesLeft.filter(name => !selectedNames.includes(name));
    const filteredSelectedNamesToRight = selectedNames.filter(name => !namesRight.includes(name));

    const newLeftNames = remainingNamesOnLeft.concat(filteredSelectedNamesToLeft);
    const newRightNames = remainingNamesOnRight.concat(filteredSelectedNamesToRight);

    updateListStatus(newLeftNames, newRightNames);
    setSelectedNames([]);
  }

  return (
    <div>
      <div className="listsContainer">
        <div className="listL">
          
          <div className="sortTitle">
            <input type="text" className="searchBox" placeholder="Search" onChange={(e) => filterLeft(e)}></input>
            <button onClick={() => sortListLeft()}><SortByAlphaIcon/></button>
            </div>
          {constructList(filteredLeft)}
        </div>
        <div className="listR">
          <div className="sortTitle">
          <input type="text" className="searchBox" placeholder="Search" onChange={(e) => filterRight(e)}></input>
            <button onClick={() => sortListRight()}><SortByAlphaIcon/></button></div>
          {constructList(filteredRight)}
        </div>

          <button onClick={() => moveToRight()}>{">>>"}</button>
          <button onClick={() => moveToLeft()}>{"<<<"}</button>
          <button onClick={() => swapNames()}>SWAP SELECTED NAMES</button>
      </div>
    </div>
  );
}

export default App;
