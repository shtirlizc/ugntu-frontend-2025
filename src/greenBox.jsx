import OrangeBox from './orangeBox.jsx';

function Modal(props) {
    

    return (
        <div style={{ border: '3px dashed green' }}>
            {props.children}

            <button onClick={props.onOK}>OK</button>
            <button onClick={props.onCancel}>Cancel</button>
        </div>
    )
}

export default GreenBox;