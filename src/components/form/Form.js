import "./form.scss";

import {useFormik, validateYupSchema} from 'formik';
import * as yup from 'yup';

// const validateForm = values => {
//     const errors = {};
//
//     if (!values.name) {
//         errors.name = "Name is required";
//     } else if ( values.name.length < 3 ) {
//         errors.name = "Name must be at least 3 characters long";
//     } else if ( values.name.length > 20 ) {
//         errors.name = "Name must be at least 20 characters long";
//     }
//
//     if (!values.email) {
//         errors.email = "Email is required";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//         errors.email = "Invalid email address";
//     }
//
//     return errors;
// }

const Form = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        },
        validationSchema: yup.object({
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
        }),
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        }
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Send Donation</h2>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.name && formik.touched.name ? <div className='error'>{formik.errors.name}</div> : null
            }
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.email && formik.touched.email ? <div className='error'>{formik.errors.email}</div> : null
            }
            <label htmlFor="amount">Amount</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.amount && formik.touched.amount ? <div className='error'>{formik.errors.amount}</div> : null
            }
            <label htmlFor="currency">Currency</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                <option value="">Choose currency</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="EUR">EUR</option>
            </select>
            {
                formik.errors.currency && formik.touched.currency ? <div className='error'>{formik.errors.currency}</div> : null
            }
            <label htmlFor="text">Message</label>
            <textarea
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.text && formik.touched.text ? <div className='error'>{formik.errors.text}</div> : null
            }
            <label className="checkbox">
                <input
                    name="terms"
                    type="checkbox"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                I agree with Terms and Conditions
            </label>
            {
                formik.errors.terms && formik.touched.terms ? <div className='error'>{formik.errors.terms}</div> : null
            }
            <button type="submit" onSubmit={() => formik.handleSubmit()}>Send</button>
        </form>
    )
}

export default Form;