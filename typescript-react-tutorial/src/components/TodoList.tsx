import { List } from 'immutable';
import * as React from 'react';
import { TodoItemData } from 'src/store/modules/todos';
import TodoItem from './TodoItem';

interface IProps {
    input: string;
    todoItems: List<TodoItemData>;
    onCreate(): void;
    onRemove(id: number): void;
    onToggle(id: number): void;
    onChange(e: any): void;
}

const TodoList: React.SFC<IProps> = ({
    input, todoItems, onCreate, onRemove, onToggle, onChange
}) => {
    const todoItemList = todoItems.map(
        todo => todo ? (
            <TodoItem
                key={todo.id}
                done={todo.done}
                // tslint:disable-next-line:jsx-no-lambda
                onToggle={() => onToggle(todo.id)}
                // tslint:disable-next-line:jsx-no-lambda
                onRemove={() => onRemove(todo.id)}
                text={todo.text}
            />
        ) : null
    )

    return (
        <div>
            <h1>what's going on?</h1>
            <form
                // tslint:disable-next-line:jsx-no-lambda
                onSubmit = {(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    onCreate();
                }}>
                <input onChange={onChange} value={input} />
                <button type='submit'>추가하기</button>
            </form>
            <ul>
                {todoItemList}
            </ul>
        </div>
    )
}

export default TodoList;