import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import image from '../images/missing-profile.png'

function AccountInfo({ user, history }) {
    const [editOn, setEditOn] = useState(false)
    if (!user) {
        return null
    }
    return (
        <div className="account-wrapper">
            <header><h1>Account Information</h1></header>
            <div className="allInfo">
                <div className="picInfo">
                    <img src={image} onerror="this.src={image}" alt='profile pic' />
                    {editOn ? <button>Change Profile Picture</button> : null}
                </div>
                <form className="textInfo">
                    <div>
                        <label>Username: </label> 
                        {editOn ? <input defaultValue={user.username} type="text" /> : <span>{user.username}</span>}
                    </div>
                    <br />
                    <div>
                        <label>Password: </label>
                        {editOn ? <input type="password" /> : <span>**********</span>}
                    </div>
                    <br />
                    <div>
                        <label>E-mail: </label>
                        {editOn ? <input defaultValue={'EMAIL HERE'}type="text" /> : <span>{'EMAIL HERE'}</span>}
                    </div>
                    <br />
                    {editOn ? <button type="submit">Save Changes</button> : null}
                </form>
                <div className="editSwitch">
                    <p>Edit:</p>
                    <label class="switch">
                        <input type="checkbox" onClick={() => setEditOn(!editOn)} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default AccountInfo;
