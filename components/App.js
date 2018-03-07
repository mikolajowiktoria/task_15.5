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
        this.getGif(searchingText)
            .then((gif) => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            })
            .catch(error => console.log(error));
    },

    getGif: function(searchingText) {

        return new Promise((resolve, reject) => {
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText).data;
                    var gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif);
                } else {
                    reject(new Error(xhr.status));
                }
            }
            xhr.open('GET', url);
            xhr.send();
        });
    },

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
});