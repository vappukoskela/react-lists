import './App.css';
import { useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

function App() {
  const [namesLeft, setNamesLeft] = useState( ["Olivia", "Emily",  "Isla", "Sophie", "Ella", "Ava", "Amelia", "Grace", "Freya", "Charlotte"]);
  const [namesRight, setNamesRight] = useState(["Jack", "Oliver", "James", "Charlie", "Harris", "Lewis", "Leo", "Noah",  "Alfie", "Rory"]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [filteredLeft, setFilteredLeft] = useState([...namesLeft]);
  const [filteredRight, setFilteredRight] = useState([...namesRight]);

  const constructList = (array) => {
    if (array.length === 0){
      return "This list is empty";
    }else{
      return (
        <div>
          {array.map((value, index) => {
            return (
            <div key={index} onClick={() => nameSelect(value)}><Checkbox checked={selectedNames.indexOf(value) !== -1} hidden={true}/>{value}</div>
            )
          })}
        </div>
      );
    }
  }

  // search function
  const filterLeft = (event) => {
    setFilteredLeft(namesLeft.filter(name => name.toLowerCase()
    .includes(event.target.value.toLowerCase())));
  }
  const filterRight = (event) => {
    setFilteredRight(namesRight.filter(name => name.toLowerCase()
    .includes(event.target.value.toLowerCase())));
  }
  
  // sort function
  const sortListLeft = () => {
    const newLeftNames = [...namesLeft];
    newLeftNames.sort();
    updateListStatus(newLeftNames, namesRight);
  }
  const sortListRight = () => {
    const newRightNames = [...namesRight];
    newRightNames.sort();
    updateListStatus(namesLeft,newRightNames);
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
    // update arrays maintaining all values in each list
    setNamesLeft(newLeftNames);
    setNamesRight(newRightNames);

    // update arrays used in search to reset the search
    setFilteredLeft(newLeftNames);
    setFilteredRight(newRightNames);
  }

  const swapNames = () => {
    // remaining names: select all except those that have been selected
    const remainingNamesOnRight = namesRight.filter(name => !selectedNames.includes(name));
    // this is the names from the right to be moved to the left
    const filteredSelectedNamesToLeft = selectedNames.filter(name => !namesLeft.includes(name));
    
    // vice versa
    const remainingNamesOnLeft = namesLeft.filter(name => !selectedNames.includes(name));
    const filteredSelectedNamesToRight = selectedNames.filter(name => !namesRight.includes(name));

    // concatenate the stripped old list and newcomers from the other list
    const newLeftNames = remainingNamesOnLeft.concat(filteredSelectedNamesToLeft);
    const newRightNames = remainingNamesOnRight.concat(filteredSelectedNamesToRight);

    // update all values 
    updateListStatus(newLeftNames, newRightNames);
    // reset checked
    setSelectedNames([]);
  }

  // select all visible
  const selectAllNamesLeft = () => {
    setSelectedNames(selectedNames.concat(filteredLeft.filter(name => !selectedNames.includes(name))));
  }
  const selectAllNamesRight = () => {
    setSelectedNames(selectedNames.concat(filteredRight.filter(name => !selectedNames.includes(name))));
  }

  return (
    <div>
      <div className="listsContainer">
        <div className="topButtons">
            <button className="topButton"onClick={() => moveToRight()}>{">>>"}</button>
            <button className="topButton"onClick={() => moveToLeft()}>{"<<<"}</button>
            <button className="topButton"onClick={() => swapNames()}>SWAP</button>
        </div>
        <div className="listL">
          <div className="sortTitle">
            <div className="searchBox"><input type="text"  placeholder="Search" onChange={(e) => filterLeft(e)}></input></div>
              <div className="buttons">
                <button className="button" onClick={() => sortListLeft()}>Sort</button> 
                <button className="button" onClick={() => selectAllNamesLeft()}>Select All</button>
              </div>
            </div>
            {constructList(filteredLeft)}
          </div> 
          <div className="listR">
            <div className="sortTitle">
              <div className="searchBox"><input type="text" placeholder="Search" onChange={(e) => filterRight(e)}></input></div>
              <div className="buttons">
                <button className="button" onClick={() => sortListRight()}>Sort</button> 
                <button className="button" onClick={() => selectAllNamesRight()}>Select All</button>
              </div>
            </div>
            {constructList(filteredRight)}
          </div>
        </div>
      </div>
  );
}

export default App;
