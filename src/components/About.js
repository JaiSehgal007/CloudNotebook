import React, { useEffect } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext)

    useEffect(() => {
      a.update();

      // eslint-disable-next-line 
    }, [])
    //   these comments are used as we do not want the value get updated again and 
    //   again, we just want to use it as componentDIdMount so we use these comments 
    //  at the end
    
    return (
        <div>
            This is About {a.state.name} and he is in classs {a.state.class}
            {/* before defining the update function in the notestate we were using it 
            a.name and a.class, now we have to use like this as we are importing an 
            object, this object has a state and that state has further values as we are
            not exporting s1 we are passing the state "state"*/}
        </div>
    );
}

export default About;