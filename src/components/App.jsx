// @ts-nocheck
import Searchbar from './Searchbar/Searchbar.jsx';
import css from '../styles.css';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import { Component } from 'react';
import Button from './Button/Button.jsx';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Modal from './Modal/Modal.jsx';

const KEY = '33185043-dc389dc3b605958bff2737f65';

class App extends Component {
  state = {
    galleryItems: [],
    pages: 0,
    currentInput: '',
    isLoading: false,
    isModalShown: false,
    modalImageSource: '',
    modalAlt: '',
  };

  fetchPictures = async url => {
    const pictures = await fetch(url);
    const picturesJson = await pictures.json();
    return picturesJson.hits;
  };

  handleSubmit = async event => {
    event.preventDefault();
    Loading.standard({ svgColor: '#3f51b5' });

    const page = 1;
    const input = event.target[1]['value'];
    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    const pictures = await this.fetchPictures(URL);

    this.setState({
      galleryItems: pictures,
      currentInput: input,
      pages: page,
    });
  };

  handleLoadMore = async () => {
    // event.prefentDefault();
    Loading.standard({ svgColor: '#3f51b5' });
    const prevGalleryItems = this.state.galleryItems;
    const page = this.state.pages + 1;
    const input = this.state.currentInput;

    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const newPictures = await this.fetchPictures(URL);

    this.setState({
      galleryItems: [...prevGalleryItems, ...newPictures],
      pages: page,
    });
  };

  componentDidUpdate() {
    Loading.remove();
  }

  handleImageClick = event => {
    const id = event.target.id;

    const pictureObject = this.state.galleryItems.find(
      element => element.id === Number(id)
    );

    this.setState({
      isModalShown: true,
      modalImageSource: pictureObject.largeImageURL,
    });
    document.addEventListener('keydown', this.escFunction);
  };

  escFunction = event => {
    if (event.key === 'Escape') {
      this.setState({
        isModalShown: false,
      });
    }
  };

  render() {
    const { galleryItems, isModalShown, modalImageSource, modalAlt } =
      this.state;
    const isGalleryItemsShown = galleryItems['length'] === 0 ? false : true;

    return (
      <>
        {isModalShown ? <Modal src={modalImageSource} alt={modalAlt} /> : <></>}
        <Searchbar handleSubmit={this.handleSubmit} />

        <ImageGallery
          galleryItems={galleryItems}
          handleImageClick={this.handleImageClick}
        />

        {isGalleryItemsShown ? (
          <Button handleLoadMore={this.handleLoadMore} />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
