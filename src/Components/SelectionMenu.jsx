import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// const admin_input_type_context = React.createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

// const options = [
//   'Show some love to Material-UI',
//   'Show all notification content',
//   'Hide sensitive notification content',
//   'Hide all notification content',
// ];

export default function SelectionMenu({ options, prompt_label, func }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [disabled_option, setDisabledOption] = React.useState(false);



  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);

    // 只能出现一次
    if (index === 0) {
      console.log('disabled')
      setDisabledOption(0)
    }

    console.log('chosen_type')
    console.log(options[index])
    console.log(options)
    console.log(index)
    func(options[index])
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //   const chosen_type = useContext(admin_input_type_context);
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label={prompt_label}
          onClick={handleClickListItem}
        >
          <ListItemText primary={prompt_label} secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (

          <MenuItem
            key={option}

            disabled={(index === disabled_option)}

            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>

        ))}
      </Menu>
    </div>
  );
}