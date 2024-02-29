import React, { useState } from 'react'

import AppNav from './src/navigation/AppNav'
import UserContext from './src/data/Context'

const defaultValues = {
  registered: [2],
  favourites: [],
  tickets: [],
};

export default function App() {

  const [userValues, setUserValues] = useState({
    registered: [2],
    favourites: [],
    tickets: [{assertId:'FQE4B6ARNM2S9gGRCNHZJfu85wcTFjRuWkXxBQet81wf',eventName:'Renaissance'}],
  });

  return (
    <UserContext.Provider value={{userValues, setUserValues}}>
      < AppNav />
    </UserContext.Provider> 
  );
}
