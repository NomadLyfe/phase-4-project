import { useFormik } from "formik";
import * as yup from "yup";
import image from '../images/missing-profile.png'

function AccountInfo({ user }) {
    return (
        <div>
            <header><h1>Account Information</h1></header>
            <div className="allInfo">
                <div className="picInfo">
                    <img src={image} onerror="this.src={image}" alt='profile pic' />
                    <button>Change Profile Picture</button>
                </div>
                <div className="textInfo">
                    <h2></h2>
                    <p>Username: <span>{user.username}</span></p>
                    <p>Email: <span>{'EMAIL HERE'}</span></p>
                    <button>Change Password</button>
                </div>
            </div>
        </div>
    );
}

export default AccountInfo;
