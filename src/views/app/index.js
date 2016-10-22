import React, {Component, PropTypes} from "react";

export class App extends Component {
    render() {
        return (
            <div>
                <main className="main">{this.props.children}</main>
            </div>
        );
    }
}