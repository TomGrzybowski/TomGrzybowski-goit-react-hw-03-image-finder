import PropTypes from 'prop-types';

const Searchbar = ({ handleSubmit }) => {
  return (
    <header className="searchbar">
      <form className="search-form" onSubmit={handleSubmit}>
        <button type="submit" className="search-form-button">
          <span className="search-form-button-label"></span>
        </button>

        <input
          className="search-form-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};

export default Searchbar;
