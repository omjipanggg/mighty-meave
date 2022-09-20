import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlane } from '@fortawesome/free-solid-svg-icons';
import { v4 } from 'uuid';

import './App.css';

import Tasks from './components/Tasks.jsx';
import ModalDel from './components/ModalDel.jsx';
import ModalNew from './components/ModalNew.jsx';
import Description from './components/Description.jsx';

const LOCAL_KEY = 'tasks';

const initialState = [
  { 
    id: 1,
    name: "Buy groceries",
    status: true,
    comments: [
      {
        id: 1,
        name: "Awesome!",
        created: "2022-03-12 07:03:19",
      },
      { 
        id: 2,
        name: "Buy milk.",
        created: "2022-06-14 09:16:38",
      },

    ],
    created: "2022-02-24 04:48:11",
    description: "Do not forget honey and milk.",
  },
  {
    id: 2,
    name: "Wash dishes",
    status: false,
    comments: [],
    created: "2022-10-05 05:27:17",
    description: "Do it before 6 pm.",
  },
  { 
    id: 3,
    name: "Wash car",
    status: false,
    comments: [
      {
        id: 1,
        name: "Wash.",
        created: "2022-09-12 06:12:02",
      },
      { 
        id: 2,
        name: "The.",
        created: "2022-09-11 06:13:17",
      },
      { 
        id: 3,
        name: "Car.",
        created: "2022-09-10 09:09:17",
      },
      { 
        id: 4,
        name: "ASAP!",
        created: "2022-09-10 11:02:45",
      },
    ],
    created: "2022-01-06 12:19:12",
    description: "",
  },
  { 
    id: 4,
    name: "Submit application",
    status: true,
    comments: [
      { 
        id: 1,
        name: "Prepare the requirements.",
        created: "2022-09-12 01:09:36",
      },
    ],
    created: "2022-03-10 04:24:55",
    description: "By Friday, on the website.",
  },
];

export default function App() {
  const [tasks, setTasks] = React.useState(initialState);
  const [isHidn, setIsHidn] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(false);
  const [commentsId, setCommentsId] = React.useState('');
  const [titleId, setTitleId] = React.useState('');
  const [descriptionId, setDescriptionId] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(null);

  const selectedTask = tasks.find((context) => context.id === selectedId);

  const refComments = React.useRef(null);

  React.useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (storedTask) {
      setTasks(storedTask);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function dateNow() {
    var date = new Date();
    return date.getFullYear() + "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getDate()).slice(-2) + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
  }
  
  const removeTask = (id) => {
    const newTasks = tasks.filter((item) => {
      return item.id !== id;
    });
    setTasks(newTasks);
    hideModal('modalDel');
    setIsOpened(true);
  }

  const handleChoose = (id) => {
    setIsOpened(false);
    setSelectedId(id);
  }

  const toggleStatus = (id) => {
    const newTasks = [...tasks];
    const data = newTasks.find((item) => item.id === id);
    data.status = !data.status;
    setTasks(newTasks);
    setIsChecked(false);
  }

  const toggleAllStatus = (event) => {
    setTasks((prev) => {
      return prev.map((item) => {
        return { ...item, status: event.target.checked, };
      })
    });
    setIsChecked(!isChecked);
  }

  const handleChange = (event) => {
    setTasks((prev) => {
      return prev.map((item) => {
        if (item.id === selectedId) {
          return { 
            ...item,
            [event.target.name]: event.target.value,
          };
        } else { return item; }
      })
    })
  }

  const handleComment = (event) => {
    event.preventDefault();
    setTasks((prev) => {
      return prev.map((item) => {
        if (item.id === selectedId) {
          return {
            ...item, 
            comments: [
              ...item.comments, {
                id: v4(),
                name: refComments.current.value,
                created: dateNow(),
              },
            ],
          }
        } else { return item; }
      })
    })
    setCommentsId('');
  }

  const title = React.useRef('');
  const desc = React.useRef('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setTasks((prev) => {
      return [...prev, {
        id: v4(),
        name: title.current.value,
        description: desc.current.value,
        created: dateNow(),
        comments: [],
        status: false,
      }]
    })
    hideModal('modalNew');
    setTitleId('');
    setDescriptionId('');
  }

  const openModal = (id) => { document.getElementById(id).classList.remove('hidden'); }
  const hideModal = (id) => { document.getElementById(id).classList.add('hidden'); }

  const handleEnter = (event) => {
    event.target.children[1].classList.toggle('hidden');
  }
  const handleLeave = (event) => {}

  return (
    <React.Fragment>
      <ModalDel
        task={selectedTask}
        hide={hideModal}
        confirm={removeTask}
        />
      <ModalNew 
        tasks={tasks}
        hide={hideModal}
        submit={handleSubmit}
        title={title}
        desc={desc}
        defTitle={titleId}
        defDesc={descriptionId}
        changeTitle={setTitleId}
        changeDesc={setDescriptionId}
        />

      <div className="big-body flex">
        <div className="left">
          <div className="left-header flex">
            <p>Tasks</p>
            <button onClick={() => openModal("modalNew")} className="btn btn-add">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="left-body">
            <ul className="task-list">
              { tasks && tasks.length ? tasks.map((item) =>
                <Tasks
                  key={item.id}
                  tasks={item}
                  chosen={handleChoose}
                  change={toggleStatus}
                  openModal={openModal}
                  isHidn={isHidn}
                  />) : 
                <p>No tasks.</p> 
              }
            </ul>
          </div>
            { tasks && (tasks.length > 0) && (
            <div className="left-footer flex">
              <div className="mark-all flex">
                <input type="checkbox" onChange={toggleAllStatus} checked={isChecked} />
                <p>Mark all as complete</p>
              </div>
              <p className="remaining">
                {tasks.filter((item) => !item.status).length} task(s) remaining
              </p>
            </div>
            )}
        </div>
        <div className="right">
          <div className="right-header flex">
              <p>{ isOpened ? 'Description' : `Created at ${selectedTask?.created}`}</p>
          </div>
          <div className="right-body">
            <Description
              key={ selectedTask?.id }
              task={ selectedTask }
              value={ selectedTask?.description }
              change={ handleChange }
              isOpened={ isOpened }
              />
            <div className="comments-box">
              <ul className="comments-list flex">
              { isOpened ? <li className="small no comments-item">No comments yet.</li> :
                selectedTask?.comments.map((item) => 
                  <li
                    key={ item.id }
                    className="small no comments-item">
                    { item.name }
                    <span className="push-right">
                    { moment(item.created).fromNow() }
                    </span>
                  </li>)
              }
              </ul>
            </div>
          </div>
          <div className="right-footer">
            <form onSubmit={handleComment}>
            <input
              type="text"
              ref={refComments}
              name="comments"
              value={commentsId}
              className="comments-area"
              placeholder="Type a comment..."
              disabled={ isOpened }
              onChange={(e) => setCommentsId(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}