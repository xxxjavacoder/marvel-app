import "./charForm.scss";

import { NavLink } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from 'yup';
import {useEffect, useState} from "react";
import useMarvelServices from "../../services/MarvelServices";
import Spinner from '../spiner/Spinner';


const CharForm = () => {
    const [charName, setName] = useState("");
    const [char, setChar] = useState({});
    const {loading, getCharacterByName, clearError} = useMarvelServices();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    useEffect(() => {
        clearError();
        if (charName.length > 0) {
            getCharacterByName(charName)
                .then(onCharLoaded)
        }
    }, [charName])

    return (
        <Formik
            initialValues={{
                name: '',
            }}
            validationSchema={yup.object({
                name: yup.string()
                    .min(3)
                    .max(30)
                    .required('Required')
            })}
            onSubmit={(values) => {
                setName(values.name);
            }}
        >
            {
                loading ? <Spinner/> :
                <Form className="char-form">
                    <label htmlFor="name" className="char-form__title">
                        Or find a character by name:
                    </label>
                    <div className="input-group">
                        <Field name="name" label="Name" required={true} />
                        <button type="submit" className="btn btn-red">Find</button>
                    </div>
                    <ErrorMessage name="name" />
                    {char.id ? <CharLink char={char} /> : null}
                </Form>
            }
        </Formik>
    )
}

const CharLink = ({char}) => {
    console.log(char);
    return (
        <NavLink className="char-link" to={`/characters/${char.id}`}>Go to {char.name} page</NavLink>
    )
}

export default CharForm;