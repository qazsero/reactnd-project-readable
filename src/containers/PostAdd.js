import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import crypto from 'crypto'

import {createPost, getCategories} from '../actions'

class PostAdd extends Component {

  state = {
    author:'',
    category:'',
    title:'',
    body:'',

  }

  componentDidMount(){
    if(this.props.categories.length === 0){this.props.getCategories()}
  }

  renderInput = (field) => (
      <div className="field">
        <div className="control">
          <input {...field.input} className="input" type="text" placeholder={field.placeholder} />
        </div>
        <p className="help is-danger">
          {field.meta.touched ? field.meta.error: ''}
        </p>
      </div>
  )

  renderTextArea = (field) => (
      <div className="field">
        <div className="control">
          <textarea {...field.input} className="textarea" placeholder={field.placeholder}></textarea>
        </div>
        <p className="help is-danger">
          {field.meta.touched ? field.meta.error: ''}
        </p>
      </div>
  )

  renderSelect = ({ input, label, type, meta: { touched, error }, children }) => (
      <div className="field">
        <div className="control">
          <div className="select">
            <select {...input}>
              {children}
            </select>
          </div>
        </div>
        <p className="help is-danger">
          {touched ? error: ''}
        </p>
      </div>
)

  onSubmit(values) {
    values.timestamp = Date.now()
    values.id = crypto.randomBytes(16).toString("hex")

    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render(){
    const { handleSubmit } = this.props;

    return (
      <div className="column is-10 is-offset-1">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">From</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded has-icons-left">
                  <Field name="author" placeholder="Name" component={this.renderInput} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Category</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <Field name="category" component={this.renderSelect}>
                  <option value="">Select category</option>
                  {this.props.categories.map((c, index) => (<option key={index} value={c.path}>{c.name}</option>))}
                </Field>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Title</label>
            </div>
            <div className="field-body">
              <Field name="title" placeholder="e.g. Reflections on the Revolution in France" component={this.renderInput} />
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Message</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <Field name="body" placeholder="Express yourself" component={this.renderTextArea} />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label">
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button className="button is-primary">
                    Submit post
                  </button>
                  <Link to="/" className="button is-danger">Cancel</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

}



function mapStateToProps({categories}){
  return {categories}
}


function validate(values){
  const errors = {}

  //Validamos los inputs desde 'values'
  if(!values.author) {
    errors.author = "Insert a username"
  }

  if(!values.title) {
    errors.title = "Insert a title"
  }

  if(!values.body) {
    errors.body = "Write a message"
  }

  if(!values.category) {
    errors.category = "Select a category"
  }

  //Si errors está vacio, el formulario está listo para enviarse
  //Si errors tiene alguna propiedad, redux form asume que el formulario es inválido
  return errors
}


export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(mapStateToProps, {createPost, getCategories})(PostAdd)
)
