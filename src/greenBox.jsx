import OrangeBox from './orangeBox.jsx';

function GreenBox(props) {
    console.log('####: props', props);
    let updatedTitle = props.greenTitle + '!!!';

    return (
        <div style={{ border: '3px dashed green' }}>
            <h2>{updatedTitle}</h2>
            <OrangeBox orangeTitle={props.orangeTitle} />
        </div>
    )
}

export default GreenBox;