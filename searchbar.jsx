function SearchBar({

  search,
  setSearch,
  searchVideos,
  history = []

}) {

  return (

    <div className="search-bar-container">

      <div className="search-bar">

        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <button
          onClick={searchVideos}
        >

          Search

        </button>

      </div>

      <div className="suggestions">

        {

          history.slice(0, 5).map((item, index) => (

            <div

              key={index}

              className="suggestion-item"

              onClick={() => {

                setSearch(
                  item.searchTerm
                );

              }}

            >

              🔍 {item.searchTerm}

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default SearchBar;