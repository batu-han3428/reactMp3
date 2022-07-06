import { decodeToken } from "../util/tokenUtil";
import {connect} from 'react-redux';


const useAuth = (props) => {

  var auth = decodeToken(props.Token);
  var isAuthenticated = false;
  var isAllow = true;
  if (auth) {
    isAuthenticated = auth.isAuthenticated;
    if (isAuthenticated && props && props.roles) {
      isAllow = props.roles.some((role) => auth?.roles?.includes(role));
    }
  }
  return { isAuthenticated, isAllow };
};

const mapStateToProps = (store) =>{     
  return {
      Token:store.tokenBilgileri || ""
  }
}

export default connect(mapStateToProps)(useAuth);