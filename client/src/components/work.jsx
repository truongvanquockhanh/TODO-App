import React, { useState, useEffect } from 'react';
import List from './list';
import NewToDo from './NewToDo';
import Navbar from './navbar';

function Work() {
  const [data, setData] = useState("");
  const [checkBox, setCheckbox] = useState(null);
  const [newItems, setNewItems] = useState({
    newItem: null,
    newInput: "",
  });
  const { listTitle, newLists } = data;
  const handleChange = (event) => {
    setCheckbox(event.target.value);
  }
  const handleSubmit = event => {
    event.preventDefault();
    console.log('data add:', event.target.newItem.value);
    setNewItems({
      newItem: event.target.newItem.value,
      newInput: ""
    });
    console.log('data after set:', newItems);
  };
  const handleInput = event => {
    setNewItems(pre => {
      return {
        newItem: pre.newItem,
        newInPut: event.target.value
      }
    })
  };

  useEffect(() => {
    console.log('get data from lh:3000');
    fetch('https://mighty-dusk-05117.herokuapp.com/work')
      .then(response => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (checkBox !== null) {
      console.log('delete data id:', checkBox);
      fetch(`https://mighty-dusk-05117.herokuapp.com/work/${checkBox}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => console.log('success delete:', data))
        .then(() => {
          console.log('get data after delete:')
          return (
            fetch('https://mighty-dusk-05117.herokuapp.com/work')
              .then(response => response.json())
              .then((data) => setData(data))
          )
        }
        )
        .catch(err => console.log('err:', err));
    }
  }, [checkBox]);

  useEffect(() => {
    if (newItems.newItem !== null) {
      console.log('post data', newItems);
      fetch(`https://mighty-dusk-05117.herokuapp.com/work`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItems),
      })
        .then(response => response.json())
        .then(data => console.log('success post:', data))
        .then(() => {
          console.log('get data after post');
          return (
            fetch('https://mighty-dusk-05117.herokuapp.com/work')
              .then(response => response.json())
              .then((data) => setData(data))
          )
        }
        )
        .then(setNewItems({
          newItem: null,
          newInput: ""
        }))
        .catch(err => console.log(err));
    }
  }, [newItems.newItem]);

  function Create(props) {
    return (
      <List
        handleChange={handleChange}
        key={props._id}
        id={props._id}
        name={props.name}
      />
    );
  }

  return (
    <div className='box'>
      <Navbar />
      <div className="item">
        <h1>{listTitle}</h1>
      </div>
      {data !== "" && newLists.map(Create)}
      <NewToDo
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        newItems={newItems.newInput}
      />
    </div>

  );
}

export default Work;

