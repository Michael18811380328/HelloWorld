// 2019-2-14 comments0list.js

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { processor } from '@seafile/seafile-editor/dist/utils/seafile-markdown2html';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { gettext } from '../utils/constants';
import { seafileAPI } from '../utils/seafile-api';
import '../css/comment-list.css';

const { repoID, filePath } = window.app.pageOptions;
const { username } = window.app.userInfo;
const CommentListPropTypes = {
  toggelCommentsList: PropTypes.func.isRequired
};

class CommentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commentsList: [],
      showResolvedComment: true,
    };
  }

  toggleResolvedComment = () => {
    this.setState({
      showResolvedComment: !this.state.showResolvedComment
    });
  }

  listComments = () => {
    seafileAPI.listComments(repoID, filePath).then((res) => {
      this.setState({
        commentsList: res.data.comments
      });
    });
  }

  handleCommentChange = (event) => {
    this.setState({
      comment: event.target.value
    });
  }

  submitComment = () => {
    let comment = this.refs.commentTextarea.value;
    if (comment.trim()) {
      seafileAPI.postComment(repoID, filePath, comment).then(() => {
        this.listComments();
      });
    }
    this.refs.commentTextarea.value = '';
  }

  resolveComment = (e) => {
    seafileAPI.updateComment(repoID, e.target.id, 'true').then(() => {
      this.listComments();
    });
  }

  deleteComment = (e) => {
    seafileAPI.deleteComment(repoID, e.target.id).then((res) => {
      this.listComments();
    });
  }

  ComponentDidMount() {
    this,listComments();
  }

  render() {
    return (
      {/*JSX*/}
    );
  }

}

CommentsList.propTypes = CommentsListPropTypes;
