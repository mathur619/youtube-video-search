import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';
import _ from 'lodash';

const API_KEY = 'AIzaSyBK_He3Q-h8KZ8d0prr1PlEUeJ6HwxlSSI'; 

//create a component .This component shouls produce some html.
class App extends Component{
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        }; 
        this.videoSearch('dragon ball');
    }
    videoSearch(term){
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
             });
        });
    }
    render(){
        const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300)
        return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch}/>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
        </div>
        );
    }
}

//take this component's html and put it in the page(in the dorm).
ReactDOM.render(<App />, document.querySelector('.container'));