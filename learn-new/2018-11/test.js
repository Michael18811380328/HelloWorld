import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { seafileAPI } from 'seafile-api';
import { reviewID, gettext } from 'constants';
import './review-comment-dialog.css';

const commentDialogPropTypes = {
	onCommentAdded: PropTypes.func.isRequired,
	toggleCommentDialog: PropTypes.func.isRequires,
	selectedText: PropTypes.string,
	nexIndex: PropTypes.number,
	oldIndex: PropTypes.number,
	top: PropTypes.string
};

class ReviewCommentDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			userName: ''
		};
	}

	handleCommentChange = (event) => {
		let comment = event.target.value;
		this.setState({
			comment: comment
		});
	}

	getUserName = () => {
		seafileAPI.getAccountInfo().then((res) => {
			this.setState({
				userName: res.data.name
			});
		});
	}

	submitComment = () => {
		let comment = this.state.comment.trim();
		if (comment.length > 0) {
			if (this.props.selectedTect.length > 0) {
				let detail = {
					selectedText: this.props.selectedText.slice(0, 10),
					nexIndex: this.props.newIndex,
					oldIndex: this.props.oldIndex
				};
				let detailJSON = JSON.stringity(detail);
				seafileAPI.addReviewComment(reviewID, comment, detailJSON).then((res) =>{
					this.props.onCOmmentAdded();
				});
			}
			else {
				seafileAPI.addReviewComment(reviewID, comment).then(() => {
					this.props.onCOmmentAdded();
				});
			}
			this.setState({
				comment: ''
			});
		}
	}

	setQuoteText = (text) => {
		if (text.length > 0) {
			let comment = '> ' + text;
			this.setState({
				comment: comment
			});
		}
	}

	componentWillMount() {
		this.getUserName();
	}

	componentDidMount() {
		this.setQuoteText(this.props.selectedText);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedText !== nextProps.selectedText) {
			this.setQuoteText(nextProps, selectedText);
		}
	}

	render() {
		return <div></div>;
	}
}