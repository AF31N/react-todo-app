import React, { useState, useEffect } from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
    const { data, changeStatus } = props;
    const [isChecked, setIsChecked] = useState(data.completed);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        setIsChecked(data.completed);
    }, [data.completed]);

    const handleChange = (checked) => {
        console.log('Checkbox clicked', checked);
        setShowConfirmation(true); 
    };

    const handleConfirm = () => {
        setIsChecked(true);
        changeStatus(data.id, true);
        setShowConfirmation(false); 
    };

    const handleCancel = () => {
        setIsChecked(data.completed);
        setShowConfirmation(false); 
    };

    const className = 'todo-item ui-state-default ' + (isChecked ? 'completed' : 'pending');
    
    const priority = data.priority ? data.priority.toLowerCase() : 'medium';

    const dueDate = data.dueDate ? new Date(data.dueDate).toLocaleDateString() : 'No Due Date';

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox checked={isChecked} onChange={handleChange} />
                    {data.text}
                    {/* Display priority next to the task */}
                    <span className={`priority ${priority}`}>{data.priority}</span>
                    {/* Display the due date */}
                    <span className="due-date">{dueDate}</span>
                </label>
            </div>

            {/* Show confirmation dialog when attempting to mark as completed */}
            {showConfirmation && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to mark this task as completed?</p>
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </li>
    );
}
