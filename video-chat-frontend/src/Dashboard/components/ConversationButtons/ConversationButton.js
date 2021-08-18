import React from 'react';

const styles = {
  button: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    cursor:'pointer',
    border: '2px solid #e6e5e8',
    textDecoration: 'none',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '35px',
    marginRight: '35px',
    marginBottom:'3px',
    boxShadow: 'none',
    borderImage: 'none', 
    borderStyle: 'none',
    borderWidth: '0px',
    outline: 'none' 
  }
};

const ConversationButton = (props) => {
  const { onClickHandler } = props;
  return (
    <button style={styles.button} onClick={onClickHandler}>
      {props.children}
    </button>
  );
};

export default ConversationButton;
