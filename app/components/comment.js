import React from 'react';
import {unixTimeToString} from '../utils.js'
import {Link} from 'react-router';
import {likeComment,unlikeComment} from '../server.js'

export default class Comment extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props
  }
  // prevent bubbling
  handlelikeComment(clickEvent){
    // prevent bubbling
    clickEvent.preventDefault();

    if(clickEvent.button == 0){
      // variable for updating the like counter
      var callbackFunction = (updatedLikeCounter) => {
        // setState will overwrite the 'likeCounter' field on the current
        // state, and will keep the other fields in-tact.
        // This is called a shallow merge:
        // https://facebook.github.io/react/docs/component-api.html#setstate
        this.setState({likeCounter: updatedLikeCounter});
      };

      if(this.didUserLike()){
        // user clicked 'unlike' button
        unlikeComment(this.state.owner, this.state.id,4,callbackFunction);
      } else {
        // user cliked 'like' button
        likeComment(this.state.owner,this.state.id,4,callbackFunction);
      }
    }
  }

  didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id == 4) {
        liked = true;
        break;
      }
    }

    return liked;
  }

  render() {
    var likeCommentText = "Like";
    if(this.didUserLike()) {
      likeCommentText = "Unlike";
    }

    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.state.author._id}>{this.state.author.fullName}</Link> {this.state.children}
          <br /><a href="#" onClick={(e) => this.handlelikeComment(e)}>
            {likeCommentText}</a> · <a href="#">Reply</a> ·
            <a href="#">{this.state.likeCounter.length}</a>
            <a href="#" > <span className="glyphicon glyphicon-thumbs-up"></span></a> ·
            {unixTimeToString(this.state.postDate)}
        </div>
      </div>
    )
  }
}
// return the key
