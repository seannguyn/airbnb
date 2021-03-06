import React from 'react'
import './ImageInput.css'
import { withSnackbar } from 'notistack'

class ImageInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileURL: '',
      file: {},
      imgId: ''
    }
  }

  componentWillMount() {
    this.setState({
      fileURL: this.props.url,
      file: this.props.file,
      imgId: this.props.imgId
    })
  }

  uploadPic(e) {
    e.preventDefault()

    this.setState({
      fileURL: URL.createObjectURL(e.target.files[0]),
      imgId: this.props.imgId,
      file: e.target.files[0]
    })

    if (this.props.imgId) {
      this.props.onChang(
        URL.createObjectURL(e.target.files[0]),
        e.target.files[0],
        this.props.imgId
      )
    } else {
      this.props.onChang(e.target.files[0])
    }
    this.props.onPresentSnackbar('success', 'Upload Successful')
  }

  deletePic(fileURL, file, imgId) {
    if (this.props.imgId) {
      this.props.onClick(fileURL, file, imgId)
      this.props.onPresentSnackbar('error', 'Delete Successful')
    }
  }

  render() {
    // send back the file, delete from the parent state
    const { fileURL, file, imgId } = this.state
    return (
      <div
        id="home_images"
        className="col-lg-4 col-md-6 col-sm-12 space-top-2"
        style={{
          borderStyle: 'solid',
          borderWidth: '1px'
        }}
      >
        <label
          className="col label--no-margin-padding"
          htmlFor="photo-image"
          tabIndex="0"
          role="group"
        >
          <div
            aria-label="Add another"
            className="panel photos-list__add-photo photos__empty-drag-highlight"
            style={{ height: '180px' }}
          >
            <div className="va-container va-container-v va-container-h">
              <div className="va-middle text-center">
                <div className="img__icon-plus-grey img-center" />
                <div className="text-gray space-top-2">
                  {fileURL === undefined ? (
                    <div>
                      <input
                        onChange={this.uploadPic.bind(this)}
                        type="file"
                        name="imgInput"
                        className="imgInput"
                        tabIndex="-1"
                      />
                      <span>Add Photo</span>{' '}
                    </div>
                  ) : null}

                  <br />
                  <img
                    height="150px"
                    width="150px"
                    src={fileURL}
                    alt="images"
                  />
                  <br />
                  {fileURL === undefined ? null : (
                    <button
                      style={{ height: '25px', width: '60px' }}
                      onClick={this.deletePic.bind(this, fileURL, file, imgId)}
                      className="btn btn-danger"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    )
  }
}

export default withSnackbar(ImageInput)
