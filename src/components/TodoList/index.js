import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { useDispatch, useSelector } from "react-redux";
import { addTodoSuccess } from "../../redux/actions/todoActions";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { todoRemainingSelector } from "../../redux/selectors/todoSelectors";

export default function TodoList() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");

  const dispatch = useDispatch();
  const todoList = useSelector(todoRemainingSelector);

  const handlerAddTodo = () => {
    dispatch(
      addTodoSuccess({
        id: uuidv4(),
        name: name,
        completed: false,
        priority: priority,
      })
    );
  };

  const handlerInputChange = (event) => {
    setName(event.target.value);
  };

  const handlerSelectChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {/* <Todo name="Learn React" prioriry="High" />
        <Todo name="Learn Redux" prioriry="Medium" />
        <Todo name="Learn JavaScript" prioriry="Low" /> */}
        {todoList.map((todo) => (
          <Todo key={todo.id} id={todo.id} name={todo.name} prioriry={todo.priority} completed={todo.completed}/>
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={name} onChange={handlerInputChange} />
          <Select defaultValue="Medium" value={priority} onChange={handlerSelectChange}>
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handlerAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
