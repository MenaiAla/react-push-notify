import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Styled';
import Context from '../../context';

const Close = () => {

    const { type, color, setVisible } = useContext(Context);

    const hide = () => { setVisible(false); }

    return (<Button
        type={type}
        color={color}
        onClick={hide}>
        <FontAwesomeIcon icon={faTimes} />
    </Button>);
}

export default Close;
