import './style.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';  
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { rawData } from './data'; // assuming rawData is an array of objects
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
const MessageCenter = () => {
  const [value, setValue] = React.useState(0);
  const [clickMessage, setClickMessage] = React.useState<number | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
     setClickMessage(null);
  };

  const archiveMessageOnchange =(id:number) =>{
    if(rawData && id){ 
        rawData.filter((x)=>x.id === id)
        .map((u)=> u.isArchived = true)
        setClickMessage(null);
        console.log(rawData,id,"temp")
    }
  }
  const unarchiveMessageOnchange =(id:number) =>{
    if(rawData && id){ 
        rawData.filter((x)=>x.id === id)
        .map((u)=> u.isArchived = false)
        setClickMessage(null);
        console.log(rawData,id,"unarc")
    }
  }

  return (
    <div className="main-container">
      <h1 className="title">Message Center</h1>
      <div className="container">
        <div className="left-side">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} indicatorColor="secondary" 
           textColor="secondary"
          variant="fullWidth" className="tabs" >
              <Tab label="Messages" {...a11yProps(0)} />
              <Tab label="Archived" {...a11yProps(1)} />
            </Tabs>
             <Divider sx={{borderColor:"purple" }}  />
            {value === 0 ? (
              <Messages setClickMessage={setClickMessage} value={value}/>
            ) : (
              <Messages setClickMessage={setClickMessage} value={value}/>
            )}
          </Box>
        </div>
        <div className="right-side">
          <div className="show-description">
            {/* Display the clicked message details on the right side */}
            {clickMessage !== null ? (
              rawData
                .filter((message) => message.id === clickMessage)
                .map((message) => (
                  <div key={message.id}>
                    <h2 >{message.title} <span className='archive-icon'>
                        {message.isArchived
                         ?
                         <>
                         <Icon onClick={()=>{unarchiveMessageOnchange(message.id)}}
                        >
                   <UnarchiveIcon/>
                </Icon>
                         </> 
                         :
                          <>
                          <Icon onClick={()=>{archiveMessageOnchange(message.id)}}
                        >
                   <ArchiveIcon/>
                </Icon>
                          </>}
                        </span></h2>
                    <p>{message.description}</p>
               <div >
                    
                </div>
                    
                   
                    {/* You can display more message details here */}
                  </div>
                ))
            ) : (
              <p className='default-message'>No Message Selected , Please Select Message to Read</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Messages Component
const Messages = (props: { setClickMessage: React.Dispatch<React.SetStateAction<number | null>> ,value :number}) => {
  const { setClickMessage ,value} = props;

  const [readStates, setReadStates] = React.useState<{ [key: number]: boolean }>({});

  const toggleIcon = (id: number) => {
    setReadStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the value for the specific id
    }));
  };

  const messageClick = (id: number) => {
    setClickMessage(id); // Set the clicked message's id
  };

  return (
    
      <List sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper' ,paddingTop:"0px"}}>
        {value === 0
         ? 
         <>{rawData &&
        rawData.filter((f)=> f.isArchived != true)
         .map((x: any) => (
            <React.Fragment key={x.id}>
              <ListItem alignItems="flex-start" className="message-list" onClick={() => messageClick(x.id)} sx={{  paddingRight:"0px"}}>
                <ListItemAvatar className="avatar">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/5.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={x.title}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2">
                        {x.description}
                      </Typography>
                      {' — I\'ll be in your neighborhood doing errands this…'}
                    </React.Fragment>
                  }
                />
                <Icon onClick={() => toggleIcon(x.id)} style={{marginTop:"7px"}}>
                  {readStates[x.id] ? <MarkEmailReadIcon /> : <MarkEmailUnreadIcon />}
                </Icon>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}</> 
         :
         <>
         {rawData &&
        rawData.filter((f)=> f.isArchived == true)
         .map((x: any) => (
            <React.Fragment key={x.id}>
              <ListItem alignItems="flex-start" className="message-list" onClick={() => messageClick(x.id)} sx={{  paddingRight:"0px"}}>
                <ListItemAvatar className="avatar">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={x.title}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2">
                        {x.description}
                      </Typography>
                      {' — I\'ll be in your neighborhood doing errands this…'}
                    </React.Fragment>
                  }
                />
                <Icon onClick={() => toggleIcon(x.id)} style={{marginTop:"7px"}}>
                  {readStates[x.id] ? <MarkEmailReadIcon /> : <MarkEmailUnreadIcon />}
                </Icon>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
         </> }
        
      </List>
    
  );
};
