import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

 const SearchField = (props)  =>{
      return (
        <TextField
          label="Search with image name"
          onChange={props?.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={props?.handleSearch}>
                <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      );
    
  }
  
  export default SearchField;