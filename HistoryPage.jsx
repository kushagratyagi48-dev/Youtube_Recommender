import {

    useEffect,
    useState

} from "react";

function HistoryPage() {

    const [history, setHistory] =
        useState([]);

    useEffect(() => {

        loadHistory();

    }, []);

    async function loadHistory() {

        let response = await fetch(

            "http://localhost:5000/videos/history",

            {

                headers: {

                    Authorization:
                        localStorage.getItem(
                            "token"
                        )

                }

            }

        );

        let data =
            await response.json();

        setHistory(data);

    }

    return (

        <div>

            <h1 className="section-title">

                Search History

            </h1>

            {

                history.length > 0

                ?

                history.map((item, index) => (

                    <div
                        key={index}
                        className="history-item"
                    >

                        🔍 {item.searchTerm}

                    </div>

                ))

                :

                <p className="empty-message">

                    No search history yet

                </p>

            }

        </div>

    );

}

export default HistoryPage;