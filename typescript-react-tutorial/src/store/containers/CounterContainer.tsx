import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Counter from 'src/components/Counter';
import { IStoreState } from 'src/store/modules'
import { actionCreators as counterActions } from 'src/store/modules/counter';

interface IProps {
    value: number;
    CounterActions: typeof counterActions;
}

class CounterContainer extends React.Component<IProps> {
    public onIncrement = () => {
        const { CounterActions } = this.props;
        CounterActions.increment();
    }
    public onDecrement = () => {
        const { CounterActions } = this.props;
        CounterActions.decrement();
    }
    public render() {
        const { onIncrement, onDecrement } = this;
        const { value }  = this.props;
        return (
            <Counter 
                onIncrement = {onIncrement}
                onDecrement = {onDecrement}
                value = {value}
            />
        )
    }
}

export default connect(
    ({counter}: IStoreState) => ({
        value: counter.value
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch)
    })
)(CounterContainer);