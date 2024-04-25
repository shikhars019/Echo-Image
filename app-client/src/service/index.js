import axios from 'axios';
import config from '../config';


const getDescriptionFromVision = (payload, cb) => {
    axios.post(config.ENDPOINT_DESCRIBEAPI, payload)
      .then(response => {
        cb.success(response);
      })
      .catch(error => {
        cb.failure(error);
      });
}

const getImageFromDescription = (payload, cb) => {
    axios.post(config.ENDPOINT_GENERATEAPI, payload)
      .then(response => {
        cb.success(response);
      })
      .catch(error => {
        cb.failure(error);
      });
}

export {
    getDescriptionFromVision,
    getImageFromDescription
}