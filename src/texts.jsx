export function TextsFunc(props) {
    const h4Text = props.attr + '!!!';
    return <div>
        <h2>{props.attr}</h2>
        <h3>{props.attr2}</h3>
        <h4>{h4Text}</h4>
    </div>
}