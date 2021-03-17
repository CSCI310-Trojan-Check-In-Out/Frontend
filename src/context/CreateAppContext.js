import React, {useReducer} from 'react';

export default function CreateAppContext(reducer, actions, initialValue) {
  const Context = React.createContext();

  const Provider = (props) => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer, initialValue);
    const dispatchActions = {};
    for (let action in actions) {
      dispatchActions[action] = actions[action](dispatch);
    }

    return (
      <Context.Provider value={{state, ...dispatchActions}}>
        {children}
      </Context.Provider>
    );
  };
  return {Context, Provider};
}
