import React from 'react'
import './ImageInput.css';
class ImageInput extends React.Component {

  constructor(props) {
    super(props);
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
      e.preventDefault();

      this.setState({
       fileURL: URL.createObjectURL(e.target.files[0]),
       imgId: this.props.imgId,
       file: e.target.files[0],
      })

      console.log("upload child", e.target.files[0]);

      if (this.props.imgId) {
        this.props.onChang(URL.createObjectURL(e.target.files[0]), e.target.files[0], this.props.imgId);
      } else {
        this.props.onChang(e.target.files[0]);
      }
        // this.props.onChange(e.target.files[0]);

  }

  deletePic(fileURL, file, imgId) {

    if (this.props.imgId) {
      console.log("delete pic",fileURL,file, imgId);
      this.props.onClick(fileURL, file, imgId)
    }

  }

  render () {

    // send back the file, delete from the parent state
    const {fileURL,file,imgId} = this.state;

    return (

      <div id="home_images" className="col-lg-4 col-md-6 col-sm-12 space-top-2"
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
        }}
        >
      		<label className="col label--no-margin-padding" htmlFor="photo-image" tabIndex="0" role="group">
      			<div aria-label="Add another" className="panel photos-list__add-photo photos__empty-drag-highlight" style={{height:"180px"}}>
      				<div className="va-container va-container-v va-container-h">
      					<div className="va-middle text-center">
      						<div className="img__icon-plus-grey img-center"></div>
      						<div className="text-gray space-top-2">
                    <input onChange={this.uploadPic.bind(this)} type="file" name="imgInput" className="imgInput" tabIndex="-1"/>
                  <span>Add Photo</span>
                    <br/>
                    <img height="150px" width="150px" src={fileURL}/>
                    <br/>
                    <button style={{height:"25px", width:"60px"}} onClick={this.deletePic.bind(this, fileURL, file, imgId )} className="btn btn-danger"></button>
      						</div>
      					</div>
      				</div>
      			</div>
      		</label>
      </div>


      // <div>
      //   <input className="imgInput" type="file" name="imageInput" onChange={this.uploadPic.bind(this)}/>
      //   <img src={this.state.fileURL} height="400" width="400"/>
      //   <button onClick={this.deletePic.bind(this, fileURL, file, imgId )}>Delete photo</button>
      // </div>
    );
  }
}

export default ImageInput;
