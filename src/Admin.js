import React, { useState, useEffect } from 'react'
import {db} from './firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {Route, Routes } from 'react-router-dom';
import Exam from './Exam';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

const pages = ['Add Exam', 'Exam List', 'Admin Page'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [name, setName]=useState('')
    const [phone, setPhone]=useState('')
    const [invoice, setInvoice]=useState('')
    const [exam, setExam]=useState('')
    const [examname, setExamname]=useState('')
    const [exams, setExams]=useState([])
    const userCollectionRef = collection(db, "exam")
    useEffect(() => {
        const getExams = async () => {
        const data = await getDocs(userCollectionRef)
        setExams(data.docs.map((doc)=>(
            {
            ...doc.data(),
            id:doc.id
            }
        )))
        }
        getExams()
    },[])
    const ref = collection(db,"exam")
    const handleSave = async(e) => {
      e.preventDefault()
      let data = {  
        name:name,
        examname:examname,
        phone:phone,
        invoice:invoice,
        exam:exam
      }
      try{
          addDoc(ref,data)
      } catch(e) {
          console.log(e)
      }
  }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className='admin'>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ICS INDIA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AutoStoriesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
          >
          Add Exam
          </Button>
          <Button variant="outlined" onClick={handleClickOpen}
          sx={{ my: 2, color: 'white', display: 'block' }}
          >
          Add Student
          </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
      <form>   
      <DialogTitle>Add Student to Exam</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>{
              setName(e.target.value)
            }}
          />
          <TextField
          autoFocus
          margin="dense"
          id="invoice"
          label="Invoice No"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e)=>{
            setInvoice(e.target.value)
          }}
        />
        <TextField
        autoFocus
        margin="dense"
        id="phone"
        label="Phone No"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e)=>{
          setPhone(e.target.value)
        }}
      />
      <TextField
      autoFocus
      margin="dense"
      id="examname"
      label="Exam Name"
      type="text"
      fullWidth
      variant="standard"
      onChange={(e)=>{
        setExamname                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               (e.target.value)
      }}
    />
      <TextField
      autoFocus
      margin="dense"
      id="exam"
      label="Exam Link"
      type="text"
      fullWidth
      variant="standard"
      onChange={(e)=>{
        setExam                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               (e.target.value)
      }}
    />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' onClick={handleSave}>Add Student</Button>
        </DialogActions>
        </form>
      </Dialog>
      <Routes>
      <Route path="/addstudent" element={<Exam />} />
      <Route path="/addstudent" element={<Exam />} />
      </Routes>
      <Table>
        <TableHead>
          <TableCell>Invoice No</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Exam Name</TableCell>
          <TableCell>Exam Link</TableCell>
        </TableHead>
        <TableBody>
        {
          exams.map((ex)=>{
              return (
                  <TableRow>
                  <TableCell>{ex.invoice}</TableCell>
                  <TableCell>{ex.name}</TableCell>
                  <TableCell>{ex.examname}</TableCell>
                  <TableCell> <a href='http://google.com'> <Button variant="contained" endIcon={<CreateIcon />}>
                  Start
                </Button></a></TableCell>
                  </TableRow>
              )
          })
        }
        </TableBody>
      </Table>
    </div>
  );
}
export default ResponsiveAppBar;
