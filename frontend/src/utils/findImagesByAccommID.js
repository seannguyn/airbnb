// find this accomm's images
export default function findImagesByAccommID(images, accommID){
    const retImages = [];
    for( let i = 0; i < images.length; i++){
      if(accommID === images[i].accommodation){
        retImages.push(images[i]);
      }
    }
    return retImages;
  }