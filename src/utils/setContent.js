import Spinner from "../components/spiner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return <Spinner/>
        case 'error':
            return <ErrorMessage/>
        case 'confirmed':
            return <Component data={data} />
        default:
            return <ErrorMessage/>
    }
}

export default setContent;