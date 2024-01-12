import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

function AccountInfo({ user, setUser }) {
    const [editOn, setEditOn] = useState(false)

    const formSchema = yup.object().shape({
        username: yup.string().max(20),
        password: yup.string().max(20),
        email: yup.string().max(50)
    })

    const formik = useFormik({
        initialValues: {
            username: user ? user.username : "",
            password: "",
            email: user ? user.email : "",
            pic: user ? user.photo : ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            values.originalusername = user.username;
            fetch('/login', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            }).then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        setEditOn(!editOn);
                        setUser(user);
                        const check_box = document.querySelector('.switch').firstChild;
                        check_box.checked = false;
                    });
                };
            });
        }
    });

    if (!user) {
        return null
    };

    return (
        <div className="account-wrapper">
            <header><h1>Account Information</h1></header>
            <div className="allInfo">
                <div className="picInfo">
                    <img src={user.photo} />
                </div>
                <form className="textInfo" onSubmit={formik.handleSubmit}>
                    <div>
                        <label id="username" for="usernameinp">Username: </label> 
                        {editOn ? <input id="usernameinp" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} /> : <span>{user.username ?? ''}</span>}
                    </div>
                    <br />
                    <div>
                        <label id="password" for="passwordinp">Password: </label>
                        {editOn ? <input id="passwordinp" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} /> : <span>**********</span>}
                    </div>
                    <br />
                    <div>
                        <label id="email" for="emailinp">E-mail: </label>
                        {editOn ? <input id="emailinp" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} /> : <span>{user.email ?? ""}</span>}
                    </div>
                    <br />
                    <div>
                        {editOn ? <label id="pic" for="picinp">Profile Picture: </label> : null}
                        {editOn ? <input id="picinp" name="pic" type="text" onChange={formik.handleChange} value={formik.values.pic} /> : null}
                    </div>
                    <br />
                    {editOn ? <button type="submit">Save Changes</button> : null}
                </form>
                <div className="editSwitch">
                    <p>Edit:</p>
                    <label class="switch">
                        <input type="checkbox" onClick={() => {
                            setEditOn(!editOn)
                            }} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
