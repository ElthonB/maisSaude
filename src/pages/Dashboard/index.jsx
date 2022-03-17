import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { ToastContainer, Slide, toast } from "react-toastify";
import NewTask from "../../components/NewTask";
import { DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import CardTask from "../../components/CardTask";
import './Dashboard.css'

export function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [tasksFiltred, setTasksFiltred] = useState([]);


  useEffect(() => {
    setTasksFiltred(tasks);
  }, [tasks]);

 

  return (
    <>
      <Header />
      <Container className='px-5 mt-4 container'>
        <Row>
          <Col>
            <NewTask
              setTasks={setTasks}
              value={{ ToastContainer, Slide, toast }}
            />
          </Col>
          <Col className='justify-content-end d-flex'>
            <FilterBtn  tasks={tasks} setTasksFiltred={setTasksFiltred}/>
          </Col>
        </Row>
        <Row >
          <Col className='justify-content-center d-flex' id='divCards'>
            <ul className='p-0'>
              {tasksFiltred.map(
                ({
                  id,
                  titulo,
                  descricao,
                  prioridade_tarefa,
                  categoria,
                  data_e_hora_tarefa,
                  status,
                }) => {
                  return (
                    <li key={id} className='text-white list-unstyled'>
                      <CardTask
                        value={{
                          id,
                          titulo,
                          descricao,
                          prioridade_tarefa,
                          categoria,
                          data_e_hora_tarefa,
                          status,
                          setTasks,
                          Slide,
                          toast,
                        }}
                      />
                    </li>
                  );
                }
              )}
            </ul>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
}

function FilterBtn({tasks,setTasksFiltred}) {

  function filterTasks(status) {
    if(status === 3){
      setTasksFiltred(tasks)
    }else{
      let filter = tasks.filter(task=> (task.status === status));
      setTasksFiltred(filter)
    }
  }
  return (
    <DropdownButton align='end' title='Filtro' className='z-index-1'>
      <Dropdown.Item onClick={() => filterTasks(3)}>todos</Dropdown.Item>
      <Dropdown.Item onClick={() => filterTasks(0)}>
        Não inciados
      </Dropdown.Item>
      <Dropdown.Item onClick={() => filterTasks(1)}>
        Em andamento
      </Dropdown.Item>
      <Dropdown.Item onClick={() => filterTasks(2)}>Concluidos</Dropdown.Item>
    </DropdownButton>
  );
}
