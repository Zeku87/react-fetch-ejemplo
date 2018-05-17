import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: true,
      hasErrors: false
    };
  }

  componentDidMount() {
    this.setState({isLoading : true})
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
        this.setState({isLoading: false});
        console.log(JSON.stringify(posts));
      }).catch(
          error => {
              this.setState({
                  isLoading:false,
                  hasErrors:true
              });
          }
      );
  }

  renderLoading(){
      return (<div>Cargando...</div>);
  }

  renderData(){
    if(this.state.hasErrors === true)
        return this.renderError();
    
    return (
        <div>            
            <ul>
            {this.state.posts.map(post =>
                <li key={post.id}>{post.title}</li>
            )}
            </ul>
        </div>
    );
  }

  renderError(){
      return( <div>ERROR: revise la url, quizás no tenga derechos de acceso o es incorrecta o bien no tiene conexión a internet</div>);
  }

  render() {
    return(
        <div>
            <h1>Ejemplo de llamada asíncrona a una API usando promesas mediante Axios en React</h1>
            {this.state.isLoading == true ? this.renderLoading() : this.renderData()}
        </div>
    );
  }
}

ReactDOM.render(
    <FetchDemo subreddit="reactjs"/>,
    document.getElementById('root')
  );