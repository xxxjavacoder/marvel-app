import ComicsList from '../components/comicsList/ComicsList';
import {Helmet} from "react-helmet";

function Comics() {

    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="content" title="Page with list of comics" />
                <title>Marvel app comics page</title>
            </Helmet>
            <ComicsList />
        </>
    );
}

export default Comics;
