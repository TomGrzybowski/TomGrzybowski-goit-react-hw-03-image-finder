import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index.js';
import { faMagnifyingGlass } from '../../../node_modules/@fortawesome/free-solid-svg-icons/index.js';

const Searchbar = ({ handleSubmit }) => {
  return (
    <header className="searchbar">
      <form className="search-form" onSubmit={handleSubmit}>
        <button type="submit" className="search-form-button">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: '#000000' }}
          />
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
