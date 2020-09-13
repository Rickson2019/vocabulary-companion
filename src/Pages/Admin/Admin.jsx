import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Admin() {

    const [wordlist, setWordList] = useState([])



    return (
        <Fragment>
            
            {wordlist.length == 0 && <CircularProgress />}
            
            {wordlist.length > 0 &&
                <div>
                    <Button>
                    
                    </Button>
                </div>}
        </Fragment>

    )
}
