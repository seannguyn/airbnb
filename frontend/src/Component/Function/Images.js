import React from 'react'
import ImageInput from './ImageInput'
import uuid from 'uuid';
import axios from 'axios'

class Images extends React.Component {

  constructor() {
    super();
    this.state = {
      images: [],
      files: [],
      idList: [],
      existing_img: []
    }
  }

  async componentWillMount() {
    const res = await axios.get(`https://localhost:8000/accommodationImage/?accommodation=${this.props.id}`)
    console.log(res.data,'component will mount');

    var i;
    for (i = 0; i < res.data.length; i++) {
      this.setState({
        images: [...this.state.images, res.data[i].a_image],
        files: [...this.state.files, res.data[i].a_image],
        idList: [...this.state.idList, res.data[i].id],
      })
    }

    this.props.imgNumber(res.data.length);

    //>

  }

  async componentWillUpdate(nextProps,nextState) {
    console.log("run in here after delete?",nextProps,this.props,nextState);
  }

  async modifyPic(fileURL, file, imgId) {
    console.log("modify");
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const urlFile = URL.createObjectURL(file);

    var i;
    var formData = new FormData()
    formData.append('a_image',file);
    formData.append('accommodation',this.props.id);

    const res = await axios.put(`https://localhost:8000/accommodationImage/${imgId}/`, formData, config)

    var new_images = this.state.images.map((img) => {img})
    var new_files = this.state.images.map((url) => {url})
    for (i = 0; i < this.state.idList.length; i++) {
      if (this.state.idList[i] === imgId) {
        new_images[i] = file;
        new_files[i] = fileURL;
        this.setState({
          images: new_images,
          files: new_files
        })
        break;
      }
    }
  }

  async uploadPic(file) {

    console.log("upload parent",file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    var i;
    var formData = new FormData()
    formData.append('a_image',file);
    formData.append('accommodation',this.props.id);
    const rest = await axios.post("https://localhost:8000/accommodationImage/",formData,config)
    console.log("postdata",rest.data);

    this.setState({
      images: [...this.state.images,file],
      files: [...this.state.files, URL.createObjectURL(file)],
      idList: [...this.state.idList, rest.data.id]
    })

    this.props.imgNumber(this.state.images.length);

  }


  async deletePic(fileURL, file, imgId) {
    const newImages = this.state.images.filter((img) => {
      return img!==file
    })

    const newURL = this.state.files.filter((url) => {
      return url!==fileURL
    })

    const idList = this.state.idList.filter((id) => {
      return id!==imgId
    })

    const res = await axios.delete(`https://localhost:8000/accommodationImage/${imgId}/`)
    this.setState({images: newImages, files: newURL, idList:idList })
    this.props.imgNumber(idList.length);
  }

  render () {

    var rendering = [];
    let i = 0;

    for (i = 0; i < this.state.images.length; i++) {
      rendering.push(<ImageInput accommodation={this.props.id} url={this.state.files[i]} file={this.state.images[i]} imgId={this.state.idList[i]} key={uuid.v4()} onChang={this.modifyPic.bind(this)} onClick={this.deletePic.bind(this)}/>)
    }

    rendering.push(<ImageInput accommodation={this.props.id} key={uuid.v4()} onChang={this.uploadPic.bind(this)}/>)


    return (
      <div>
        <h1>Images (add at least 2)</h1>
        <div className="row">
        {rendering}
        </div>
      </div>
    );

  }
}
// <button onClick={this.submitPic.bind(this)} type="submit">Submit pic</button>

export default Images;
