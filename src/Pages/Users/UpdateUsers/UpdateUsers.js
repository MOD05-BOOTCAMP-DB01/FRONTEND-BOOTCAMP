import React, { useEffect,useState } from "react";
import { Api } from "../../../Api/Api";
import Select from 'react-select'
import CardUser from "../../../components/CardUser/CardUser";
import {Link} from 'react-router-dom';
import Input from './../../../components/Input/Input'
import './UpdateUsers.css'
import  Button  from "./../../../components/Button/Button";

export default function UpdateUsers() {
  let [searchString,setSearchString] = useState('')
  let [users,setUsers] = useState([])

  useEffect(()=>{
    const loadAllUsers = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllUsers(),true);
      const data = await response.json();
      const filteredData= data.filter((u)=>u.role != 'ADMIN')
      setUsers(filteredData)
    }
    loadAllUsers()
  },[])

  const roleOptions = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'USER', label: 'Usuário Comum' },
  { value: 'MANAGER', label: 'Gerente' }
]
const statusOptions = [
  { value: true, label: 'habilitado' },
  { value: false, label: 'desabilitado' },
]

const handleSubmit = (e)=>{

}

  const handleChange = (e)=> {
    setSearchString(e.target.value);
  }
 
  searchString = searchString.trim().toLowerCase();
    
    if(searchString.length > 0) {
      //We are searching, filter the results.
      users = users.filter(function(l) {
        return l.username.toLowerCase().match( searchString );
      }).filter((l)=>l.role != 'ADMIN')
    }
                                                                          

  return <div className="update-user-container">
    <form onSubmit={handleSubmit}>
    <div >
      <label htmlFor="">Nome de usuário</label>
      <Input id="username" name="username" type="text"/>
    </div>
    <div>
    <label htmlFor="">Email</label>
    <Input id="email" name="email" type="text" />
    </div>
    <Button type="submit">Salvar</Button>
    </form>

  <div>
  <h2>Buscar colaboradores</h2>
  <Input type="text" value={searchString} onChange={handleChange} placeholder="Buscar usuário" />
  </div>
  <div className="">
  {searchString && (
        users.map((user) =>(
        <Link to={`atualizar/user/${user.id}`}>
        <CardUser user={user}/>
        </Link>
       )))}
  </div>
  </div>;
}

// Alterar um usuário (id) - username, e-mail, role ou status