interface State{
    state:Number; /// 1(true) | 0(false) | -1(unset)
}

/**
 * Badge used in « TableRowAttendance » Component
 * @param props 
 * @returns 
 */
function AttendBadge(props:State):JSX.Element{
    let result;
    if(props.state===1) result = <div className="badge fs-6 bg-success">Présent</div>;
    else if(props.state===0) result = <div className="badge fs-6 bg-danger">Absent</div>;
    else result = <div className="badge fs-6 bg-secondary">Not Set</div>;
    return result;
}

export default AttendBadge;