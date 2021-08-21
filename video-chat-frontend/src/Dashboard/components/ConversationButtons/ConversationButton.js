import React from 'react';

const styles = {
  button: {
  color: '#0548ff',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    cursor:'pointer',
    border: '1px solid #e6e5e8',
    textDecoration: 'none',
    backgroundColor: '#fff',
    textAlign:"center",
    marginLeft: '35px',
    marginRight: '35px',
  marginBottom: '3px',
  padding: '2px',
  fontSize: "36px",
  transition: "0.3s",
            
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
