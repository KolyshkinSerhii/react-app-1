import { actions} from '../../Redux/Messages-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withAuthRedirect } from '../../HOC/WithAuthRedirect';
import { AppStateType } from '../../Redux/Redux-store';


let mapStateToProps = (state: AppStateType) => {
    return {
    messagesPage: state.messagesPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
) (Dialogs)