import { Navbar,Nav,Button,FormControl,Form } from 'react-bootstrap';
import { IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useContext } from 'react';
import { searchContext } from '../context/search';
import { useHistory } from 'react-router-dom';
const NavBar = () => {
    const search = useContext(searchContext);
    const move = useHistory();
    const [ input,setInput] = useState('');
    const handleSubmit=(e)=>{
      e.preventDefault();
      search.search(input).then((data)=>{
          search.setData(data.results);
          localStorage.setItem('myData',JSON.stringify(data.results));
          move.push('./results');
      })
  }
    return (  
       
<Navbar className="navbar-color" expand="lg" variant="light" position="sticky">
   <Navbar.Brand href="/random-anime-recommendation-and-search-list/#/"><div className="font-color">ANIME LIST VIEWER</div>
 </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
    <Form inline onSubmit={handleSubmit} className="navBar-form">
      <FormControl type="text" placeholder="Search" className="navBar-searchBar" onChange={(e)=>{setInput(e.target.value)}} />
      <IconButton
            variant="contained" 
            color="primary"
            type="submit"
            disabled={!input}
            className="navBar-iconButton"
            onClick={handleSubmit}
             >
            <SearchIcon/>
             </IconButton>
    </Form>
      <Nav.Link href="/random-anime-recommendation-and-search-list/" ><Button  variant="custom" className ="button-color" >Home</Button> </Nav.Link>
      <Nav.Link href="/random-anime-recommendation-and-search-list/#/about"><Button  variant="custom" className ="button-color" >About</Button></Nav.Link>
      </Nav>
  </Navbar.Collapse>
</Navbar>


    );
}
 
export default NavBar;