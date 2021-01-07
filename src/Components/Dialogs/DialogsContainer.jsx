import { actions} from '../../Redux/Messages-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withAuthRedirect } from '../../HOC/WithAuthRedirect';


let mapStateToProps = (state) => {
    return {
    messagesPage: state.messagesPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: newMessageBody => {
            dispatch(actions.sendMessageCreator(newMessageBody));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
) (Dialogs)