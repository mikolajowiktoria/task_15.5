var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'YvdtP0Ml4WsuuUAwPhscFTszXHuZ6mKf';


App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });

        this.getGif(searchingText, function(gif){
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

function getGif(searchingText, callback) {
    return new Promise(
        function (resolve, reject) {
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        const xhr = new XMLHttpRequest();        

        xhr.onload = function() {
            if (this.status === 200) {
                let data = JSON.parse(xhr.responseText).data;
                let gif = {};
                resolve(this.response);  
            
            if(data.length !== 0) {
                    gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url,
                    };
                } 
                callback(gif);
            } else {
                reject(new Error(this.statusText));
            }
        };
        xhr.onerror = function() {
            reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
        };
        xhr.open('GET', url);
        xhr.send();
    }
)},

httpGet(url)
    .then(response => console.log('Contents: ' + response))
    .catch(error => console.error('Something went wrong', error));

    render: function(){

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Gif searcher</h1>
                <p>Find gif on <a href='http=://giphy'>giphy</a>. Press ENTER for start search more gifs.</p>
                <Search 
                    onSearch={this.handleSearch}
                />
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>    
        )
    }
})