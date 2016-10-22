import { List } from 'immutable';
import React, {Component, PropTypes} from 'react';

export class Task extends Component {
    static propTypes = {
        createTask: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
        dismissNotification: PropTypes.func.isRequired,
        filterTasks: PropTypes.func.isRequired,
        filterType: PropTypes.string.isRequired,
        loadTasks: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        notification: PropTypes.object.isRequired,
        tasks: PropTypes.instanceOf(List).isRequired,
        undeleteTask: PropTypes.func.isRequired,
        unloadTasks: PropTypes.func.isRequired,
        updateTask: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.loadTasks();
        this.props.filterTasks(this.props.location.query.filter);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.query.filter !== this.props.location.query.filter){
            this.props.filterTasks(nextProps.location.query.filter);
        }
    }

    componentWillUnmount(){
        this.props.unloadTasks();
    }

    renderNotification(){

    }

    render(){
        return (
            <div className="g-row">
                <div className="g-col">

                </div>

                <div className="g-col">

                </div>
            </div>
        );
    }
}

// const mapStateToProps = createSelector();