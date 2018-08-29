import React from 'react'
import './ImageInput.css';
class ImageInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileURL: '',
      file: {}
    }

  }

  componentWillMount() {
    this.setState({
     fileURL: this.props.url,
     file: this.props.file
    })
  }

  uploadPic(e) {

    e.preventDefault();

    this.setState({
     fileURL: URL.createObjectURL(e.target.files[0])
    })

    console.log("upload child", e.target.files[0]);
    this.props.onChange(e.target.files[0]);
  }

  deletePic(fileURL, file) {
    console.log("delete pic",fileURL,file);
    this.props.onClick(fileURL, file)
  }

  render () {

    // send back the file, delete from the parent state
    const {fileURL,file} = this.state;

    return (

      <div id="home_images" className="col-lg-4 col-md-6 col-sm-12 space-top-5"
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
        }}
        >
      		<input onChange={this.uploadPic.bind(this)} hidden type="file" className="input-file" id="photo-image" name="image" accept="image/jpg, image/jpeg, image/png, image/gif" multiple="" tabIndex="-1"/>
      		<label className="col label--no-margin-padding" htmlFor="photo-image" tabIndex="0" role="group">
      			<div aria-label="Add another" className="panel photos-list__add-photo photos__empty-drag-highlight" style={{height:"180px"}}>
      				<div className="va-container va-container-v va-container-h">
      					<div className="va-middle text-center">
      						<div className="img__icon-plus-grey img-center"></div>
      						<div className="text-gray space-top-2">
      							<span>Add Photo</span>
                    <br/>
                    <img height="150px" width="150px" src={fileURL}/>
                    <br/>
                    <button style={{height:"25px", width:"60px"}} onClick={this.deletePic.bind(this, fileURL, file )} className="btn btn-danger"></button>
      						</div>
      					</div>
      				</div>
      			</div>
      		</label>
      </div>


      // <div>
      //   <input className="imgInput" type="file" name="imageInput" onChange={this.uploadPic.bind(this)}/>
      //   <img src={this.state.fileURL} height="400" width="400"/>
      //   <button onClick={this.decrease.bind(this,this.state.fileURL)}>Delete photo</button>
      // </div>
    );
  }
}

export default ImageInput;
