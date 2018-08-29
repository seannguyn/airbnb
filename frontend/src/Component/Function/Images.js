import React from 'react'
import ImageInput from './ImageInput'
import uuid from 'uuid';
import axios from 'axios'

class Images extends React.Component {

  constructor() {
    super();
    this.state = {
      images: [],
      files: []
    }
  }

  async componentDidMount() {
    const res = await axios.get(`https://localhost:8000/accommodationImage/?accommodation=${this.props.id}`)
    console.log(res.data,'component will mount');
  }

  uploadPic(file) {
    console.log("upload parent",file);
    this.setState({
      images: [...this.state.images,file],
      files: [...this.state.files, URL.createObjectURL(file)]
    })
  }

  async submitPic() {

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    var i;
    for (i = 0; i < this.state.images.length; i++) {
      var formData = new FormData()
      formData.append('a_image',this.state.images[i]);
      formData.append('accommodation',this.props.id);
      await axios.post("https://localhost:8000/accommodationImage/",formData,config)
    }

  }

  deletePic(fileURL, file) {
    const newImages = this.state.images.filter((img) => {
      return img!==file
    })

    const newURL = this.state.files.filter((url) => {
      return url!==fileURL
    })
    console.log(newImages,newURL);
    this.setState({images: newImages, files: newURL })
  }

  render () {

    var rendering = [];
    let i = 0;
    for (i = 0; i < this.state.images.length + 1; i++) {
      rendering.push(<ImageInput url={this.state.files[i]} file={this.state.images[i]} key={uuid.v4()} onChange={this.uploadPic.bind(this)} onClick={this.deletePic.bind(this)}/>)
    }

    return (
      <div>
        <h1>Images</h1>
        {rendering}

        <button onClick={this.submitPic.bind(this)} type="submit">Submit pic</button>
      </div>
    );

  }
}

export default Images;
