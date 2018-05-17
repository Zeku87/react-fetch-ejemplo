import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
        console.log(JSON.stringify(posts));
      });
  }

  render() {
    return (
      <div>
        <h1>Ejemplo de llamada asíncrona a una API usando promesas mediante Axios en React</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
    <FetchDemo subreddit="reactjs"/>,
    document.getElementById('root')
  );