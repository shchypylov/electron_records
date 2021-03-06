import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addComment, addPost, editPost, editComment } from '../actions'

const typeToInputPlaceholders = {
    addPost: {
        title: 'Title',
        content: 'Content',
    },
    editPost: {
        title: 'New title',
        content: 'New content',
    },
    addComment: {
        title: 'Comment title',
        content: 'Comment content',
    },
    editComment: {
        title: 'New comment title',
        content: 'New content',
    },
}

class Form extends Component {
    state = {
        formIsVisible: this.props.formIsVisible || false,
        newPostTitle: '',
        newPostBody: '',
    }

    toggleFormVisibility = () => {
        this.setState({
            formIsVisible: !this.state.formIsVisible,
        })
    }

    submitNewValues = () => {
        const { newPostTitle: title, newPostBody: body } = this.state,
            { addPost, editPost, addComment, editComment, type, id, foreignId } = this.props

        switch (type) {
            case 'addPost':
                addPost(title, body, id)
                break
            case 'editPost':
                editPost(title, body, id)
                break
            case 'addComment':
                addComment(title, body, id, foreignId)
                break
            case 'editComment':
                editComment(title, body, id)
                break
            default:
                return true
        }

        this.setState({
            newPostTitle: '',
            newPostBody: '',
            formIsVisible: false,
        })
    }

    render() {
        const { formIsVisible } = this.state,
            { buttonTitle, type } = this.props

        return (
            <div className="row">
                <div className="col-8 mx-auto d-flex flex-column mt-3">
                    {buttonTitle && (
                        <button className="btn btn-success my-3 mx-auto" onClick={this.toggleFormVisibility}>
                            {buttonTitle}
                        </button>
                    )}

                    {formIsVisible && (
                        <div className="bg-warning text-dark p-3 d-flex flex-column mb-3">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder={typeToInputPlaceholders[type].title}
                                    onChange={e =>
                                        this.setState({
                                            newPostTitle: e.target.value,
                                        })
                                    }
                                    type="text"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder={typeToInputPlaceholders[type].content}
                                    onChange={e =>
                                        this.setState({
                                            newPostBody: e.target.value,
                                        })
                                    }
                                    type="text"
                                />
                            </div>
                            <button className="btn btn-primary mx-auto mb-3" onClick={this.submitNewValues}>
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(
    connect(
        null,
        { addPost, editPost, addComment, editComment }
    )(Form)
)
