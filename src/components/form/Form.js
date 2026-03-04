import "./form.scss";

import {Formik, ErrorMessage, Form, Field} from 'formik';
import * as yup from 'yup';

const FormComponent = () => {

    return (
        <Formik
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {yup.object({
                name: yup.string()
                    .min(3, 'Must be at least 3 characters long')
                    .max(20, 'Must be no longer than 20 characters')
                    .required('Required'),
                    email: yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                    amount: yup.number()
                    .moreThan(50, 'Must be more than 50')
                    .required('Required'),
                    currency: yup.string()
                    .required('Required'),
                    text: yup.string(),
                    terms: yup.boolean()
                    .oneOf([true], "Required")
                    .required('Required')
            })}
            onSubmit = {(values) => {
                console.log(JSON.stringify(values, null, 2));
            }}
        >
            <Form className="form">
                <h2>Send Donation</h2>
                <label htmlFor="name">Name</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className='error' name="name" id="name" component="div" />
                <label htmlFor="email">Email</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className='error' name="email" id="email" component="div" />
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className='error' name="amount" id="amount" component="div" />
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                >
                    <option value="">Choose currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="EUR">EUR</option>
                </Field>
                <ErrorMessage className='error' name="currency" id="currency" component="div" />
                <label htmlFor="text">Message</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className='error' name="text" id="text" component="div" />
                <label className="checkbox">
                    <Field
                        name="terms"
                        type="checkbox"
                    />
                    I agree with Terms and Conditions
                </label>
                <ErrorMessage className='error' name="terms" id="terms" component="div" />
                <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default FormComponent;