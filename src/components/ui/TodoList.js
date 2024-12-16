import React, { useState, useEffect } from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import TodoItem from './TodoItem';  
import { applyFilter, search, FILTER_ACTIVE } from '../../services/filter';

export default function TodoList(props) {
    const { list, filter, mode, query } = props.data;
    const { addNew, changeFilter, changeMode, setSearchQuery } = props.actions;

    const [tasks, setTasks] = useState(list || []);
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Medium'); 
    const [completed, setCompleted] = useState(false);
    const [dueDate, setDueDate] = useState(''); 
    const [sortBy, setSortBy] = useState('none'); 

    const addTask = () => {
        if (text.trim()) {
            const newTask = {
                id: Date.now(),
                text,
                priority: priority || 'Medium',
                completed,
                dueDate, 
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setText('');
            setPriority('Medium');
            setDueDate('');
        }
    };

    const changeStatus = (taskId, completed) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed } : task
            )
        );
    };

    useEffect(() => {
        let sortedTasks = [...tasks]; 
        if (sortBy === 'dueDateAsc') {
            sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sortBy === 'dueDateDesc') {
            sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        } else if (sortBy === 'priority') {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 }; 
            sortedTasks.sort((a, b) => {
                const aPriority = a.priority ? a.priority : 'Medium';
                const bPriority = b.priority ? b.priority : 'Medium';
                return priorityOrder[aPriority] - priorityOrder[bPriority];
            });
        }
        setTasks(sortedTasks);
    }, [sortBy, tasks]);

    const activeItemCount = applyFilter(tasks, FILTER_ACTIVE).length;
    const items = search(applyFilter(tasks, filter), query);

    return (
        <div className="container">
            <div className="row">
                <div className="todolist">
                    <Header
                        addNew={addNew} 
                        mode={mode} 
                        query={query} 
                        setSearchQuery={setSearchQuery} 
                    />
                    
                    {/* Todo Form with Due Date */}
                    <div className="todo-form">
                        <h2>Prioritize Your Task</h2>
                        <input
                            type="text"
                            placeholder="Enter task"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        
                        {/* Due Date Input */}
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        
                        <button onClick={addTask}>Add Task</button>
                    </div>

                    {/* Sorting Options */}
                    <div className="sort-options">
                        <button onClick={() => setSortBy('dueDateAsc')}>Sort by Due Date (Asc)</button>
                        <button onClick={() => setSortBy('dueDateDesc')}>Sort by Due Date (Desc)</button>
                        <button onClick={() => setSortBy('priority')}>Sort by Priority</button>
                    </div>
                    
                    {/* Filtered Task List */}
                    <FilteredList
                        items={items}
                        changeStatus={changeStatus}
                    />
                    
                    {/* Footer for active task count */}
                    <Footer
                        activeItemCount={activeItemCount}
                        filter={filter}
                        changeFilter={changeFilter}
                        mode={mode}
                        changeMode={changeMode}
                    />
                    
                    {/* Info */}
                    <Info mode={mode} />
                </div>
            </div>
        </div>
    );
}
